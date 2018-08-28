---
date: "2018-08-22"
title: "Attempting sane testing"
slug: "posts/attempting-sane-testing/"
description:
---
<!---
I remember writing first unit tests. Looked back and they were horrible. Looked back again recently and what I've
been doing is still horrible.

Unit vs integration testing? Does it matter? What is a unit anyway?
All you want is a suite of tests that you can run and be given confidence everything works as intended.

TDD is a bit of a buzz-term in industry. Every other company claims to do TDD. Some do and some don't. Be interesting to
see how they define it. Not hiring people because they don't do TDD is mad.

"Test behaviour not implementation meaning"

Mocking everything. Does TDD mean mocking? Kent Beck etc. try to avoid mocking, just mock IO boundaries.
Don't need to test everything. Some stuff is so simple it obviously won't break or be worth your time. 100% code coverage
might be an indicator of a problem with the approach rather than a good thing.

TDD is great. When writing things like APIs (lots of moving pieces), they might need writing differently.
No distinction between integration and unit testing: golden rule for TDD is write failing test, make it green and refactor.

TDD with class libraries different from APIs, for example.

ASP Core samples.

More robust, more maintainable. Not testing an implementation; I put X in and want Y out. Don't care what's going on
inside.

Just what works for me. New to trying it.
Whatever gives you confidence in your code and isn't so brittle as to break when you refactor internals.
--->
I remember writing my first ever unit tests at my old job. I had to add some basic CRUD endpoints to an ASP application.
It was the first bit of code I'd ever been paid to write and I was particularly keen to leave a good first impression.
Then I proceeded to write some of the most useless tests you've ever seen. Like, _ever_. I can't remember exactly what tests
I'd written but they were something hilariously pointless like asserting that a value I'd specified a mock to return
was in fact the value that the mock returned.

I spent at least a day writing similar tests -- tests that could never fail -- before I realised what I'd done.
Sheepishly, I deleted everything and wrote new tests that made an effort to actually verify some behaviours.
It's a funny memory I have of my first few weeks as a developer, and it makes me smile to reminisce about the silly things I did.

And yet, very recently I've come to the conclusion that most of the tests I've been writing since those first few weeks
have still been frail, ineffective baggage that could never be useful to anyone other than as typing-practice.

A lot of the programming I do is centred around writing web APIs. Mostly-straightforward CRUD stuff, and usually ASP Core.
There's a lot to be said about how to go about writing tests for an ASP application versus how to write tests for
something like a a class library. A lot of that discussion might revolve around how we ought to define a _unit_ to test,
and to what extent should tests involve mocking.

- TDD one possibility
= 'Unit' sort of sounds like it's measuring a unit of code so it's understandable to see why people interpret it that way
- Mocking is big with TDD depending on who you ask
- TDD defines behaviours
- What is behaviour when testing an API?