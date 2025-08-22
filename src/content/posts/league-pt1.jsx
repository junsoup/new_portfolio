// src/content/posts/league-pt1.jsx
// Auto-generated scaffold.
export default function _() {
  return (
    <>
      { /* <img src="/posts/.jpg" alt="" className="rounded-full my-4 w-64" /> */}
      <p>So this past month, I've been working on the <strong>league project</strong>. I haven't gone into the details before so I'll explain the purpose of the project.</p>
      <span><p>The idea is:</p></span>
      <h3 className="underline">I'm sick and tired of losing my league of legends games.</h3>
      <br />
      <p>While I can just get better, I feel like I had <strong>no influence in the vast majority of lost games</strong>. You could have put <strong>faker</strong> in my place and we still would have lost.</p>
      <p>This is where my project comes in. What my project aims to do is to <strong>assist the user in picking their champion</strong>; to maximize their chance of winning, even before the game starts.</p>
      <p>Some may ask, "Why not just play the strongest characters in the current game version and just play that?"</p>

      <p>Here's the issue: </p>
      <img src="/posts/riven.jpg" alt="Image showing Riven as highest winrate champion" className="rounded-xl rows-4 mx-auto" />
      <br />
      <p>You could always pick Riven, and assuming you play pick-ban well to avoid getting counter picked, it would be okay. However, there is most likely a better champion to play in that given scenario.</p>
      <p>If the rest of your comp is well-rounded, going a split push champion would be great. Or if your team needs a frontliner, going a durable tanking champion would also be better. This applies to all other lanes as well.</p>
      <p>I've worked on this project on and off for the past 8 years. When I first learned about neural networks in junior year of high school, I imagined a tool like this would be possible. However, the model never seems to train well. It's been about 2 years since my last attempt, so here I am to try again.</p>
      <p>I started off with getting some data. I fetched some games from riot's api and got started (I had roughly 7000 games at this point). Before I train the pick model, I wanted to test making a winrate model first.</p>
      <img src="/posts/simple_model.png" alt="Image showing the simple perceptron model" className="rounded-xl rows-10 mx-auto" />
      <br />
      <p>This model is simple. I input champions from team A and team B, and I output one node, which predicts the outcome of the match. Since champions are referenced with ids, I needed to encode the ids such that numerical closeness doesn't indicate champion closeness. For this, I used one-hot encodings. This expands one champion into the champions space with all zeros except the index of the champion id. So far simple stuff, and this is the same technique I used 8 years ago.</p>
      <img src="/posts/Figure_1.png" alt="Image showing the loss graph." className="rounded-xl rows-14 mx-auto" />
      <br />
      <p>Unsuprisingly, the model wasn't very good. I had a similar result to this in high school, except I didn't have a loss graph. Back then, my friend and I built the whole model in Java from scratch and we didn't have much knowledge of neural networks back then. When we tested this, all we got for the picks were A) the most common champions at the time and B) the strongest champions at the time. It was always like Sett, Jhin, Yasuo, Ashe. At the time, I didn't check for validation loss. So I thought lower loss = good, and was lost when the model didn't work. I now realize this approch tends to strongly overfit. Back then, I used models 5,000x3 or so. It simply found the strongest champions tended to win, so it only outputed those champions.</p>
      <p>At this point, I started thinking about how different champions are sometimes quite similar in how they play. For example, Jhin and Ashe are quite similar in that they play as utility carries. Jhin can follow up with roots, and Ashe can follow up with W slow + ult stuns. They can still provide utility to the team when behind.</p>
      <p>Then, I learned about embedding layers. I cannot believe we did not learn this in our machine learning class. For those who do not know what they are, it's an alternative approch for situations where you would need to one-hot encode. Rather than expanding the champion selection to a sparse layer with width = category size, you can instead convert the champion to a n-dimensional vector representation. You can think of this as forming n-word descriptors for champions rather than saying the champion itself. For example, a 4-dimensional vector embedding for champions (range of 0 to 1) for Ashe could be something like:</p>
      <p className="pl-4 font-semibold">
        "physical vs magic damage": 0.1,<br />
        "supportive vs carry": 0.7,<br />
        "damage vs utility", 0.5,<br />
        "melee vs ranged": 0.9<br />
      </p>
      <p>Note: we wouldn't have labels nor know the meaning of each dimension, as it is learned.</p>
      <p>With this approch, it won't be able to recognize the picks themselves, rather, their characteristics. (In theory.)</p>
      <p>Here were the inital results (I added stratified k-fold cross-validation):</p>
      <img src="/posts/Figure_7.png" alt="Image showing the loss graph after change" className="rounded-xl rows-22 mx-auto" />
      <br />
      <p>It seems like the results are worse! ahahahah.</p>
      <p>Got more data (250,000 total matches), added dropout, weight decay, label smoothing, and tuned the model for about a week straight. Here are my results:</p>
      <img src="/posts/Figure_c3.png" alt="Image showing the loss graph after change + more data" className="rounded-xl rows-22 mx-auto" />
      <br />
      <p>Awesome. I'll take that for now. Now for the pick model.</p>
      <p>I'm still a bit unsure about the correct method for this, but I opted for one-hot encodings. I do this because there are champion specific combinations that matter for picks, which would suffer if the champions are obscured with embedding layers. (I think)</p>
      <img src="/posts/pick_model.png" alt="Image showing the character-pick model" className="rounded-xl rows-10 mx-auto" />
      <br />
      <p>My idea is to train two models. One for maximizing for blue team, and the other for red team. I train each on only games that side won, and also augment games to also have variations where picks are incomplete. This way, the model will learn to identify the champion combinations that tend to win games.</p>
      <img src="/posts/pick_4.png" alt="Image showing the character-pick model training loss" className="rounded-xl rows-20 mx-auto" />
      <br />
      <p>The plot looks suspiciously smooth, which I assume is due to it guessing champions that are visible, but whatever. I don't think that matters too much. I might recreate this with a bit different logic later but it seems to work fine for now.</p>
      <p>"Tests" aka. playing league games with friends:</p>
      <img src="/posts/results.png" alt="Match results (won 5 of 7)" className="rounded-xl rows-20 mx-auto" />
      <img src="/posts/picker_tool.png" alt="Cruddy react webapp that lets user input character for model inference." className="rounded-xl rows-18 mx-auto" />
      <br />
      <p>A group of friends and I played a couple games with the model. We used it to pick the best champions (when we could). We also used the model to estimate our chances to win the game.</p>
      <p>Note: On the bottom lost game, the webapp I built broke so we picked whatever. For the other lost game, we didn't pick a recommended jungler because he didn't know how to play any of them. Regardless, we had fairly good picks, and won most of our games. The first two games we won despite the odds. For the other five games, our match outcome aligned with the prediction.</p>
      <p>Concluding thoughts:
        The front-end design can use some work. Currently, it takes too long to find and insert champions, leaving little time think about which ones to pick.
        Pick combinations are unaccounted for. For example, lucian + nami could have been a good pick in some games, but by themselves they are marked as bad picks. This is a missed opportunity. This would raise my output nodes to like 36,000 to uniquely identify each champion pair, which is rather large. Or, I could run simulations of combinations of top-n champions. This could work, but it would take longer for inference.</p>
      <p>All in all, I am happy with my results. If I think of better methods, I'll revisit the project.</p>
    </>
  );
}
