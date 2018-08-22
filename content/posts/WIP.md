---
date: "2018-08-22"
title: "Attempting sane testing"
slug: "posts/attempting-sane-testing/"
description:
---

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

---

I remember writing my first ever unit tests at my old job. I'd been there for a couple of weeks and then I was finally
allowed near the codebase. I had to add some basic CRUD endpoints to an ASP application.
I think I did a pretty good job for a first-try.
Then I proceeded to write some of the worst tests you've ever seen.
Like, _ever_. I can't remember exactly what tests I'd written but they were something hilariously pointless like:

```csharp
// Arrange
var service = new Mock<IService>();

service
  .Setup(x => x.TestMethod())
  .Returns(123);

// Act
var result = service.Object.TestMethod();

// Assert
Assert.Equal(123, result);
```

I spent at least a day writing similar tests that could never fail no matter what before I realised what I'd done.
Sheepishly, I deleted them all and wrote new tests that