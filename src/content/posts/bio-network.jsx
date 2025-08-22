// src/content/posts/bio-network.jsx
// Auto-generated scaffold.
export default function _() {
  return (
    <>
      <p><strong>For a long-time now</strong>, I have been deeply unsatisfied with the current state of neural networks and specifically LLMs. The thing that bothers me the most are people saying things like, "OMG these chatbots like ChatGPT are so good at thinking!!!", stating how human-like they are. However, they do not think like humans do.</p>

      <div className="px-4">
        <h3>Here's my issue with neural networks:</h3>
        <ul>
          <li>They are trained then run. They cannot perform both at the same time, thus they cannot learn in the traditional sense through experiences.</li>
          <li>They need an unreasonable amount of data.</li>
          <li>They are not time-dependent. Unlike LLMs, biological brains never stop thinking, even when sleeping.</li>
        </ul>
      </div>
      <p>I'm not saying LLMs are bad. In fact, I use ChatGPT all the time for coding. It just bothers me they are branded as assistants when they are more like tools.</p>
      <p>Recently, I came across a paper released by Sakana AI called the Continuous Thought Machine. It's an incredible paper and rethinks the traditional methods of neural networks.</p>
      <p>Putting it really really simply, they basically made a classical feed-forward network but the main difference is that it loops the output nodes back into the input nodes. The output nodes are redirected back into the input to continue "thinking". This process repeats until a specific node is high enough. This serves as the model's confidence level with their answer. This makes the runtime indeterminant, but their paper shows incredible results.</p>
      <p>If this could be combinded with some method of dynamic learning, to replace backpropagation, it could be a massive breakthrough where we could have true human-like AI.</p>
      <div className="px-4">
        <h3>Thus, I came up with my own bio-inspired network:</h3>
        <ul>
          <li>Looping MLP. This will serve a similar role as the frontal cortex.</li>
          <li>Biological neuron simulation instead of linear function with activation. Specifically the FitzHugh-Nagumo Model, which is a simplified version of the Hodgkin-Huxley model.</li>
          <li>Duel-channel input stimuli outputting to both a predictive coding and a dense network. The predictive coding network will serve as the ventral stream stemming from the visual cortex. This acts as the "What" pathway. The dense network will serve as the dorsal stream. This acts as the "Where/How" pathway. Traditionally, this should be hooked up to eye movements, but I'll have to do some testing for that later.</li>
          <li>Dynamically training predictive coding network using output nodes. This would serve to train the "What" pathway to learn to predict.</li>
          <li>Dynamic neuron weight updates via systems to act as forms of neuroplasticity. This would serve to train the "How" pathway.</li>
        </ul>
      </div>
      <p>So here's my take. The primary goal of the biological brain is to predict the future. The better you can predict the future, the better you can plan. The better you can plan, the more energy you can save / energy you can earn. If you see bear footprints, you need to predict there could be a bear nearby, otherwise, you may be in danger. If you end up seeing the bear too late, you would have to enter your flight or fight reflex which wastes valuable energy when all of this could have been avoided if you had predicted it from the start.</p>
      <p>There's a lot here and honestly it seems pretty unlikely to be fruitful but I'll keep trying. I've implemented all parts except the PC model and the last bullet point. Here is a teaser image:</p>
      <img src="/posts/CTM.png" alt="visualizer for brain model" className="rounded-xl rows-18 mx-auto" />
    </>
  );
}
