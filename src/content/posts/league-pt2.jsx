// src/content/posts/league-pt2.jsx
// Auto-generated scaffold.
export default function _() {
  return (
    <>
      { /* <img src="/posts/megu_cropped.jpg" alt="megumin" className="rounded-full my-4 w-64" /> */}
      <p>If you haven't seen the first League blog post, please check that out first!
        <br />
        <strong>Note:</strong> I'm going to be more in-depth about champion select. If you aren't well-versed in league, sorry.
        I'll try to explain the best I can.
      </p>
      <p>Okay. So <strong>TLDR</strong> from last time, I made a webapp where you can <strong>insert champions</strong> from champion select, and it will
        show you the <strong>best champions</strong> to pick using ML inference.</p>
      <p>Sounds great? No. It was absolutely terrible.</p>
      <p>There were many, many issues with this, and hindsight hit like a truck on this one.</p>
      <ul>
        <strong>Issues:</strong>
        <li>I made the <strong>embedding size</strong> (aka vocabulary of champions) a <strong>subset</strong> of all champions. I had
          the cutoff at <strong>0.15%</strong> pickrate. At the
          time, I thought I was being smart by shaving off on the model size (Makes embedding layers 50% to 80%
          smaller!). However, if a rare champion is
          picked, you literally cannot run the model. (Which I thought wouldn't happen, but it actually did in the
          test games with the enemy picking Zoe jungle!)</li>
        <li>The user has to manually input the champions with lane assignments into the app. <strong>Manually inputting the
          champion takes too long, is difficult, and is likely to get wrong.</strong> <br /> For example, lets say the enemy
          first picked Yorick. Unfortunately, we have to assume it's a top-lane pick. But there's still a good (albeit smaller) chance
          they are jungle. But we have to lock in the Yorick pick top for the ML model. This would make the app to
          suggest a top-yorick counter, which could then in-turn be counterpicked by the actual enemy top. <br />
          This makes us have to meta-game and figure out their bluff, and pick it for jungle instead. By the time
          the player figures this out, the player already used up their 20 seconds and can't even use the app. :(
        </li>
        <li>The partial winrate model has a massive bias issue. It's hard to explain so I'll use an example. Let's say there's a champion like <strong>Dr. Mundo</strong>. He's <strong>super</strong> tanky. So tanky infact, he has a 80% winrate. OMG!! With this, in our ML model, it shows Dr. Mundo as the top suggestion. The model learned that all games with Dr. Mundo is practically always winning... <strong>UH OH! DO YOU HEAR THAT??? *SNIP SNIP* OH NO!!! </strong>The enemy picked Gwen!!! <strong>A CHAMPION THAT DOES PERCENT MAX HEALTH TRUE DAMAGE AND ABSOLUTELY DESTROYS TANKS!!!</strong> and the game is lost. In situations with champions like Dr. Mundo, you would only pick him IF the enemy already picked a non-Gwen toplaner. <br />Imagine we are playing a food fighting simulator. You pick to play as a giant block of cheese. This is an easy pick because big cheese = super smelly = wrecks every other food but then the enemy suddenly picks the stainless-steel-cheese-grater character.<br />
          Um, okay I'll stop it there with the analogies. Basically, the model learns to assume Gwen will never be picked since most games with Mundo do not have a Gwen on the enemy side.
        </li>
      </ul>
      <p>Anyways, okay. So first, let's start with the manual picking issue. So we can hookup to the query the <strong>rest api</strong> of the local league client. This is not endorsed by Riot but whatever. I used a neat table showing all the <a href="https://lcu.kebs.dev/">endpoints</a>. To make the actual query, you need the <strong>auth token</strong> and the <strong>port</strong> of the league client process. However, I quickly learned this is not allowed from browsers due to security reasons.</p>
      <h3>Plan B: I decided to learn Electron because I thought that would be easy. I was wrong, but that's okay.</h3><br />
      <div className="px-4">
        <h3>So here's the layout:</h3>
        <ul>
          <li>Electron App</li>
          <li>Poll for league client</li>
          <li>Poll for league client's champion select data</li>
          <li>Use the data to compute the best picks and render.</li>
        </ul>
      </div>
      <p>Now that we have an auto-input setup, let's fix the algorithm. The question is, "What if we could somehow <strong>simulate variations</strong> of future picks, and just <strong>assume the worst-case scenario</strong>?"</p>
      <p>And the answer is: <strong>A Monte Carlo Tree Search!</strong> Specifically, a <strong>MCTS</strong> but with a ML inferencing for the <strong>simulation</strong> step. (The same algorithm used for AlphaGo!)</p>
      <p>I also retrained the models with a <strong>full vocabulary embedding size</strong>. It took like an hour to train but the acc. was pretty much the same as before at <strong>55%ish</strong>. I also trained it on missing picks as it would be found in champ-select. For the Monte Carlo, I also made the simulations simulate according to a single or double pick accordingly, which was another issue mentioned in the last blog post. I had a really hard time hooking everything up because it was hard to test but I managed. I created the <strong>ONNX model</strong> and set that up. Then, I finally tried it out.</p>
      <p>Here's a rough-draft of the app:</p>
      <img src="/posts/Electron.jpg" alt="current state of brain model." className="mx-auto rows-24" />
      <p><strong>Note:</strong> We don't actually have the data to know what lanes the enemies are. I trained the model with shuffled enemy lane positions so we could use it as is. I just forgot to delete the placeholder text.</p>
      <p>I also forgot to reorder the suggestions on change.</p>
      <p>And this brings us to present time.</p>
      <p><strong>Concluding thoughts:</strong> the suggestions are not good. This is likely due to uniform randomly picking the expansion node. There is a lot of benefit to be had from simulating the more likely picks since we are running out of time in the simuation. I'll make those updates and make another post.</p>
    </>
  );
}
