// src/content/posts/april-2025.jsx
// Auto-generated scaffold.
export default function _() {
  return (
    <>
      <h3>Time for another blog post!</h3>
      <br />
      <p>I've finished two more projects and actually put it up on github so I can show it off. They're the

        {" "}
        <strong>koi fish</strong>
        {" "}and{" "}
        <strong>apple projects</strong>.

        I showed the fish project to some of my friends, and one of them told me it gave him motion sickness. Cool. I also tried going on the page on a old phone, and it was super laggy. I honestly don't know how or why this happens. I thought it was due to the <strong>shader code</strong> being forced to run on non-applicable hardware but even with an empty scene, if I have <strong>hardware acceleration</strong> disabled, the page becomes unresponsive. Actually, me typing this made me realize that a page not being responsive means it's CPU limited, but whatever.</p>
      <p>You know what, if your device so slow it can't even run an empty scene, you don't deserve to see my code. There I said it!</p>
      <p>All jokes aside, this project really makes me want to see how far I can push the <strong>THREE.js</strong> renderer. I didn't really make this with performance in mind, although I did use mesh instancing to reduce the fish and lilypads to single draw calls. Browsing the
        {" "}<a href="https://threejs.org/examples/">THREE.js examples</a>{" "}
        was honestly inspiring, and I thought it was so cool how it could do all that in the browser.</p>
    </>
  );
}
