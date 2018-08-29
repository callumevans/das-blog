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
was, in fact, the value that the mock returned.

I spent at least a day writing similar tests -- tests that could never fail -- before I realised what I'd done.
Sheepishly, I deleted everything and wrote new tests that made an effort to actually verify some behaviours.
It's a funny memory I have of my first few weeks as a developer, and it makes me smile to reminisce about the silly things I did.

And yet, very recently I've come to the conclusion that most of the tests I've been writing since those first few weeks
have still been frail, ineffective baggage that could never be useful to anyone other than as typing-practice.

I'm a relatively new convert to Test Driven Development. At about the time I left my old place and my hauntingly shitty
tests behind, I've taken a TDD approach to most things I've written. Not religiously, but just where I thought it made sense
to. A lot of the programming I do is centred around writing web APIs. Mostly-straightforward CRUD stuff, and usually ASP Core.
I had found that trying to take a TDD approach when writing anything with multiple moving parts and layers didn't really help
much. I always ended up with a set of tests that were more or less just verifying plumbing and implementation; the aforementioned
brittle and pointless types. Interestingly, these are the sorts of tests that most people I've worked with over
the years tend to write when it comes to testing ASP.

These are pretty horrible. Let's imagine we have an API with two layers, and for sanity's sake I'll use ASP Core as
the example framework. We'll have a _Controller Layer_ and a _Service Layer_. Our controller will take a request, and return
the result of adding two numbers, the mathematical part of which will be computed by a service.

Keeping to the TDD spirit, we would write some tests first. Let's start with some for a controller.

```csharp
public class ControllerTests
{
    private readonly Mock<IAddService> addServiceMock;
    private readonly MathsController controller;

    public ControllerTests()
    {
        addServiceMock = new Mock<IAddService>();
        controller = new MathsController(addServiceMock.Object);
    }

    [Fact]
    public void Add_ShouldCallAddService()
    {
        // Act
        controller.Get(10, 15);

        // Assert
        addServiceMock
            .Verify(x => x.Add(10, 15));
    }

    [Fact]
    public void Add_ReturnsResultFromService()
    {
        // Arrange
        addServiceMock
            .Setup(x => x.Add(10, 15))
            .Returns(999);

        // Act
        int result = controller.Get(10, 15);

        // Assert
        Assert.Equal(999, result);
    }
}
```

And some tests for `AddService`:

```csharp
public class AddServiceTests
{
    private readonly AddService service = new AddService();

    [Theory]
    [InlineData(10, 20, 30)]
    [InlineData(1, 2, 3)]
    public void Add_AddsTwoNumbers(int a, int b, int expected)
    {
        // Act
        int result = service.Add(a, b);

        // Assert
        Assert.Equal(expected, result);
    }
}
```

It's a pretty typical setup, though this approach to testing needs more compromises and can produce more problems and
overheads than make it worthwhile. There's a lot to be said about how to go about writing tests for an ASP
Web API versus how to write tests for something like a a class library. A lot of that discussion might revolve around
how we ought to define a _unit_ to test, and to what extent should tests involve mocking. I'm not entirely sure why ASP
developers test this way. Maybe I'm missing something, but these sorts of tests rarely catch anything worthwhile, and they
require a lot more maintenance than the code they actually test.

We've had to stick an `IAddService` interface in there to "make it testable" (a common justification for extracting an
interface wherever it's possible to do so), and our tests are heavily dependent on the implementation rather than the behaviour.
So much so that if we decide that our Service Layer is pointless and we want to just have the controller calculate and return
the result, our two `MathsController` tests will need rewriting and our `AddService` tests will be thrown out entirely. That
might not be surprising since we're deleting `AddService`, but it could be a suggestion that we're not testing the right things.

Much better would be to simply write tests for the behaviours we want from the get-go. But isn't this is what we've already
done? We've isolated the behaviours of some units  -- our controllers and services -- and written test fixtures for them.
The problem seems to be one of definition; at least in this scenario, we've defined _unit_ in a counterproductive way.

What if our application's _units_ were its behaviours? A lot of our problems go away if we take this definition for
the purposes of our little-API-that-could. We can summarise its one behaviour: "Calling the GET route should return the result
of two numeric arguments added together". To write something to test this behaviour we're getting into the territory
of integration testing, for which ASP Core has excellent [tooling](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-2.1).

- TDD one possibility
- 'Unit' sort of sounds like it's measuring a unit of code so it's understandable to see why people interpret it that way
- Mocking is big with TDD depending on who you ask
- TDD defines behaviours
- What is behaviour when testing an API?
- Possible issues. Might be slower. Best to mix and match, maybe? Just don't write those stupid plumbing tests.
- Goal is a suite of tests that give you confidence you've not fucked it. It's deterministic and reproducible. Call it what you want.