Learning Clojure and/or Haskell will make you a better programmer. Even if you don’t use it day to day, there are a ton of prescient lessons to be taken back to your language of choice.

Functional programming is infectious. I find it beautiful & elegant in much the same way as a [Braun watch](http://dieterrams.tumblr.com/) or Karl Gerstner’s grid system for [Capital magazine](https://www.flickr.com/photos/watz/2382027037/sizes/l/). Good design (my preferred school of good design, at least) is mathsy, rational and pure—and CSS is design—so it follows that there are a bunch of lessons we can bring back from FP land into design.

I’ve been meaning to write this post for months but technical blogging takes me ages — excuse the brain dump.

These ideas have been swirling around for a few years; shout out to [Brent Jackson](https://twitter.com/jxnblk) and [Adam Morse](https://twitter.com/mrmrs_) for shipping something incredible in [Basscss](http://www.basscss.com/) & [Tachyons](http://tachyons.io/) respectively, whilst I've been sitting and thinking about it.

# f(css) is:
- **Functional**. Small, clear, easy to read classes that are easy to apply and do one thing. You might have called them ‘utility classes’ with some snark, but they rock. A random example from Basscss would be the margin & padding classes - `mb1`, `px2` (margin-bottom-1, padding-x-2) etc. The super short naming conventions are optional (I just love Brent’s implementation) — I guess you could write a library with less terse class names if you’re a masochist, but FP seems to tend toward short variable names. When you consolidate all of your sizing & spacing into reusable classes you *force* a beautiful type scale & rhythm on your design. Neat!
- **Composable**. In FP it’s fun to compose a bunch of small functions together to create larger actions. The parallel in f(css) is building up big ol' chains of tiny classes. Think declarative composition � `<a class="mb2 bg-green white px2 rounded">` rather than OO-derived objects & modifiers — `<a class="btn btn--primary">`. Scared of writing lots of classes? No shit, everyone hates typing. Wrap them up in React components to your heart’s content. [classnames](https://github.com/JedWatson/classnames) is a fun module for dynamically composing groups of classes, so you don't end up with massive strings all over the shop. **The point isn’t to get away from component-based _design_** (which rocks and should be a cornerstone of your design ethos); rather you should get away from component-based CSS, which is crappy and repetitive.
- **Immutable**. On to the fun stuff. Declare a property once and you should be damn sure it's never going to get overwritten. Fuck specificity. Apply the class you want — margin-bottom, say — and rest assured that no one else’s CSS is going to override it. The problem here is that CSS isn’t immutable (has anyone made an actually-immutable CSS preprocessor? If not I’m going to write one), but be clever in your implementation and it’s _kind of like immutability_. 
- **Referentially transparent**. This is a fancy way of saying ‘it should be guaranteed to do the thing you want it to do’. The cascade and ems are two of the worst things about CSS. I’m tired of playing guesswork because some framework author decided that using multipliers was a good idea.
- **Side-effect free**. not only should a class do the same thing every time, but it should never, ever change anything other than what you're targeting.


I’m aware that this is almost the polar opposite of both OOCSS/SMACSS, and everything that some semantic web bore told you off for doing once upon a time, but I think this is the future of CSS. It’s easy to reason about, quick to write, lightning fast for browsers to parse, and gets rid of the clusterfuck that is the ‘C’ in CSS.

Tweet me if you massively disagree, I’ve fudged an FP metaphor, you’ve built an immutable CSS processor, or you think CSS class names should be machine-readable (lol).

edit: [John Otander](https://twitter.com/4lpine) is working on a linter for immutable CSS. This makes me happy. [johnotander/immutable-css](https://github.com/johnotander/immutable-css)

Further reading:
- [Immutable CSS](http://csswizardry.com/2015/03/immutable-css/) by Harry Roberts
- [Functional CSS](http://eng.wealthfront.com/2013/08/functional-css-fcss.html) by Wealthfront

Thanks to [Paulo Pereira](https://twitter.com/paulozoom), [cms](https://twitter.com/colinstrickland), [Sébastian Cevey](https://twitter.com/theefer), [Brent Jackson](https://twitter.com/jxnblk) for feedback on this post :)
