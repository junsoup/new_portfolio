// src/content/posts/koi-app.jsx
// Auto-generated scaffold.
export default function _() {
  return (
    <>
      { /* <img src="/posts/megu_cropped.jpg" alt="megumin" className="rounded-full my-4 w-64" /> */}
      <p>Last week, I focused on building this site and getting it running. This week, I decided to recreate the koi banner on my previous portfolio site which I built about half a year ago.</p>
      <img src="/posts/fish.jpg" alt="old fish project" className="mx-auto rows-8" />
      <i className="flex justify-center"><a target="_blank" href="https://junsoup.github.io/koi-app">Old Koi Project</a></i><br />
      <p>I went slightly into it on an older <a href='#/blog/april-2025'>blog post</a>, but as a quick <b>tl;dr</b>, I had some issues with the old one.</p>
      <h3>Issues:</h3>
      <ul>
        <li>It wasn't standalone. I only served it on my portfolio. While I could have served a copy of it, I unfortunately didn't like the final result enough to do that.</li>
        <li>It was not performant enough. I used <b>instance meshing</b> which is a way to efficiently render multiples of the same object with only one <b>draw call</b> on the <b>GPU</b>. At the time, I couldn't find a way to make the instanced fish look different efficiently. I opted to <b>computing</b> the <b>3-dim perlin noise</b> value <b>per vertex, per fish, per frame.</b> This led to <b>massive</b> performance issues, where my rtx 4060 would hover at around <b>40%</b> usage.</li>
        <li>It looked bad. I mean I'm no 3D designer, but like honestly the fish looked more like submarines than koi fish. And the polygon sizes were all over the place, the lighting didn't feel uniform, and it just generally didn't feel like a single homogeneous package.</li>
      </ul>

      <img src="/posts/new_fish.png" alt="new fish project" className="mx-auto rows-12" />
      <i className="flex justify-center"><a target="_blank" href="https://junsoup.github.io/koi-app">New Koi Project</a></i><br />

      <h3>New Approach</h3>
      <p>To optimize the shaders, I decided to use lookup tables, also known as <b>LUTs</b>. I tried this approach before, but I (wrongly) assumed there would be too high of a <b>memory overhead</b>. Having to supply every fish's unique texture as one texture to all fish's vertices just didn't feel right. However, the fish are low-poly enough for it to be negligible.</p>
      <p>I also decided to full-commit to the <b>pixel-art</b> style. I also dabbled with this before (The code for it is still in the repo), but this time, I went through with a <a target='_blank' href='https://eriksachse.medium.com/three-js-pixelated-lo-fi-energy-look-298b8dc3eaad'>method</a> that actually works. This approach saves the <b>camera's render</b> to a <b>texture</b>, which then can be <b>projected</b> onto a flat <b>quad</b>, for it to be then again captured by another <b>orthographic camera</b> (crazy, I know). This allows for grid-aligned pixels that are crisp.</p>
      <p>For the <b>boids</b> implementation, I mostly reused my old logic, but I decided to not allow the user to feed the fish. This was a <b>UI/UX</b> sort of decision. It's not intuitive that clicking = feeding so people might not do it, and without dynamic fish movements, the project doesn't feel alive (might as well be a video). Instead, I made the fish chase the user's mouse around.</p>
      <p>There's a small bug with the fish that causes them to get stuck going up and down. This is due to the <b>separation clause</b> of boids occuring when two fish are vertically aligned. Their <b>delta vectors</b> shoot up and down and can't recover due to bounce logic when hitting the shallow world boundary. You can do this by circling the fish into a single point, then quickly moving your mouse off-screen. I started calling them <b>"special"</b> fish except I replace the word special with another word I can't write here.</p>
      <p>Currently, I'm debating whether or not to put the koi-app as the background on this site. It could look pretty cool but I'm still thinking about how to design it.</p>
      <p>That's it for this blog post! Feel free to check out the project <a target="_blank" href="https://junsoup.github.io/koi-app">here!</a></p>

    </>
  );
}
