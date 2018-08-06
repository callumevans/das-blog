---
date: "2017-11-07"
title: "I still don't think I understand SOLID principles"
slug: "posts/my-first-blog-post/"
---
I've been a professional programmer for about three years. At least every other month since I started, I've confused, misremembered,
reinterpreted or otherwise changed my understanding of SOLID principles. I get the impression this isn't entirely my fault.

Upon scouring the internet, someone's blog will explain the Dependency Inversion is and then some Reddit thread will contradict it.
Internal developer documentation would conveniently summarise Dependency Inversion to mean "_depend on abstractions, not concrete implementations_," and then
link to a Wikipedia article which defines it completely differently and then mandate that "All code should follow SOLID practices."
I'd discuss with my old boss about it and we'd end up getting drunk and forgetting what we said.

These observations are neatly compiled for the cynicisian's reading pleasure in the pertinent and perfectly simple StackOverflow question:
[What is the dependency inversion principle and why is it important?](https://stackoverflow.com/questions/62539/what-is-the-dependency-inversion-principle-and-why-is-it-important).
The top answer has a highly rated (read: knowledgeable) user talking about interfaces, with an even-higher rated user disagreeing entirely in the comments.
Other answers conflate Dependency Inversion with Inversion of Control. One of them has a mad hexagon diagram stuck
in there. One seems to agree with my current interpretation, but ask me again in six months.

Meanwhile, I've spent the last three years trying to actually apply these principles like an asshole.

In the real-world most of this stuff goes out of the window pretty quickly.
People seem to be aware, consciously or otherwise, that applying SOLID religiously wherever and whenever you can is a bad idea.
Developers don't invert dependencies on the .NET Framework. We don't segregate every interface from every client.
We don't create plugin systems where simple switch or if statements suffice.

My best guess is that SOLID is a vogue conversation piece. A technique thought essential for every good programmer to master.
A fun topic to argue about. It's a good way for us to swing our dicks about and compare who's more, er, SOLID.

During the interview at my present place of employment, they asked me to talk about SOLID principles.
I rattled off some gibberish definitions, I think lifted from Wikipedia and then mangled by memory. It was something I would
now consider to have nothing to do with SOLID. I still got the job. And I don't think I was—or am—a horrible
developer for my lack of clarity and changeability on the matter. At least not _completely_ horrible developer.
Given its universality as an acronym and conversation topic, it might be more useful for interviewers to confirm that the
interviewee is just aware of the principles, and bothers to spend time reading about them online. Even if it is just from some dodgy Reddit crap.

My own experience with SOLID is mixed. I've overcomplicated things before, applied interfaces to everything
(which stemmed from a bad interpretation of DIP) and simply worried about things I didn't need to worry about because
I thought my code absolutely _had_ to be SOLID through-and-through. I can only speak to my own reasons for falling into
these traps, but I suspect many will empathise; for me, it was a case of insecurity and lack of certainty that what I
was writing was maintainable and workable. All the talk of SOLID, which other people seem so confident about, makes
you overcompensate for gaps in your knowledge. That isn't helped by much of the prominent Google material on the subject
being contradictory or nonsensical.

All that having been said, I like SOLID. At least, I like what I think SOLID is right now. It's a collection of sensible ideas that usually
apply, in principle, to languages and systems that aren't just C++, Java or C#, which some people don't notice. I'm a fan.
But it's useful to remember, after all, that the word _fan_ is the shorthand for _fanatic_.

Most recently, I've learned to have more confidence in myself and my work. That's not to say I'm not skeptical or
critical of what I write, but only that I feel less like I need to be on rails. SOLID principles make for great guidelines,
but perhaps it's not useful to let them become more than that.

For others having difficulty grasping the ironically gaseous ideas of SOLID as explained by much of the internet, I would highly recommend
checking out the original Uncle Bob papers that introduced the acronym [here](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod).