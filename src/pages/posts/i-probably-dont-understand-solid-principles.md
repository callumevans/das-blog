---
date: "2017-11-07"
title: "I probably don't understand SOLID principles"
slug: "posts/i-probably-dont-understand-solid-principles/"
---
I've been a professional programmer for about three years. At least every other month since starting, I've confused, misremembered,
reinterpreted, revised or otherwise changed my understanding of SOLID principles. I get the impression that this isn't entirely my fault.

Upon scouring the internet, you'll find that someone's blog will explain the Dependency Inversion Principle and then some Reddit thread will contradict it.
Internal coding standards documentation I've seen has conveniently summarised Dependency Inversion to mean
"_depend on abstractions, not concrete implementations_," and then link to a Wikipedia article which defines it completely
differently. The same documentation mandates that "All code should follow SOLID practices." I'd discuss SOLID with my
old boss and we'd end up getting drunk and forgetting what we said. Everybody has a different understanding, and
everybody thinks theirs is the right one.

These observations are neatly compiled for the cynicisian's reading pleasure in the pertinent and perfectly simple StackOverflow question:
[_What is the dependency inversion principle and why is it important?_](https://stackoverflow.com/questions/62539/what-is-the-dependency-inversion-principle-and-why-is-it-important)
Evidently, a harder question to answer than ask. The top reply is that of a highly rated (read: knowledgeable) user talking about the need to use interfaces, with an even-higher
rated user disagreeing in the comments. Other answers conflate Dependency Inversion with Inversion of Control. One of them has a crazy hexagon diagram stuck
in there. One seems to agree with my current interpretation, but ask me again in six months.

Meanwhile, I've spent the last three years trying to actually apply these principles like an asshole.

In the real-world, a lot of this stuff seems to go out of the window pretty quickly. There are some bad habits that persist, like sticking interfaces
on every class because it's "inverting the dependency so it's SOLID," or "to make it testable." But otherwise, developers
seem to be aware, consciously or not, that applying SOLID dogmatically wherever and whenever you can is a bad idea.
Developers don't invert the dependency on the .NET Framework. We don't religiously segregate every interface from every client.
We don't create entire plugin systems where simple switch or if statements suffice, though it was once explained to me
that such an approach would be preferable.

My best guess is that SOLID is a vogue conversation piece. A technique thought essential for every programmer to master,
lest they be unable to write maintainable software. A fun topic to argue about. It's a good way for us to swing
our dicks about and compare who's more, er, SOLID.

During my interview at my current place of employment, my interviewers asked me to explain SOLID principles.
I rattled off some gibberish definitions, I think lifted from Wikipedia and then mangled by memory and pressure. It was something I would now
not likely believe to be correct; I didn't really believe it at the time. I still got the job. And I don't think I was—or am—a horrible
developer for my lack of clarity and changeability on the matter, not a _completely_ horrible developer.
Given its universality as an acronym and conversation material, it might be more useful for interviewers to confirm that the
interviewee is just aware of the principles, and bothers to spend time reading about them online. Flawed understanding or
not, it demonstrates some initiative and ability to self-learn. Even if it is just recycled Reddit crap.

My own experience with SOLID is mixed. I've overcomplicated things before, applied interfaces to everything
(which stemmed from a bad interpretation of DIP) and simply worried about things I didn't need to worry about because
I thought my code absolutely _had_ to be SOLID through-and-through. I can only speak to my own reasons for falling into
these traps, but I suspect many will empathise; for me, it was a case of insecurity and lack of certainty that what I
was writing was maintainable and workable. All the talk of SOLID, which other people seem so confident and assured about, makes
you overcompensate for gaps in your knowledge. That isn't helped by much of the prominent Google material on the subject
being contradictory or nonsensical.

All that having been said, I like SOLID. At least, I like what I think SOLID is right now. It's a collection of sensible ideas that usually
apply, in principle, to languages and systems that aren't just C++, Java or C#, which some people don't notice. In hindsight, I wish I'd had
the understanding I have now. Some of the mistakes I've made when creating software could have been mitigated by sensible
application of the principles as I see them now. I'm a fan of SOLID. But it's useful to remember that the
word _fan_ comes from the term _fanatic_.

Developers tend to have a certain level of pride in their knowledge and expertise. It's good to be
be passionate about one's craft and respect the time you've invested into yourself to learn it. However, when confronted with
hack-bullshit it's easy to think less, professionally, of the person spouting it. I've been there with regards to SOLID,
and I'm sure others experience similar thoughts about me. But you might be surprised to find out how many people have a different understanding
of the principles to your own. To the extent that it's almost completely useless to gauge someone's ability based on their
knowledge of the topic.

Most recently, I've learned to have more confidence in myself and my work. That's not to say I'm not skeptical or
critical of what I write, I absolutely try to be, but only that I now feel less like I need to be on rails. SOLID principles make for great guidelines,
but it doesn't seem useful to let them become more than that. When you find yourself zealously combing through code
trying to "make it as SOLID as possible", it could be time to temper your fervour and reach a compromise with imperfection,
which usually turns out to be simplicity.

For others having difficulty grasping the ironically gaseous ideas of SOLID as explained by much of the internet, I would highly recommend
checking out the original Uncle Bob papers that introduced the acronym [here](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod).