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

Keeping to the TDD spirit, we would write some tests first. Typically, we'd introduce the separation of layers once we've
written the initial tests à la _Red / Green / Refactor_, but we'll skip ahead to the end result. We're likely to end up with
something like a `MathsController` and a `MathsService`, with the following tests:

```csharp
public class MathsControllerTests
{
    private readonly Mock<IMathsService> mathsServiceMock;
    private readonly MathsController controller;

    public MathsControllerTests()
    {
        mathsServiceMock = new Mock<IMathsService>();
        controller = new MathsController(mathsServiceMock.Object);
    }

    [Fact]
    public void Add_ShouldCallAddService()
    {
        // Act
        controller.Get(10, 15);

        // Assert
        mathsServiceMock
            .Verify(x => x.Add(10, 15));
    }

    [Fact]
    public void Add_ReturnsResultFromService()
    {
        // Arrange
        mathsServiceMock
            .Setup(x => x.Add(10, 15))
            .Returns(999);

        // Act
        int result = controller.Get(10, 15);

        // Assert
        Assert.Equal(999, result);
    }
}
```

And some tests for `MathsService`:

```csharp
public class MathsServiceTests
{
    private readonly MathsService service = new MathsService();

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

It's a pretty typical setup, though this approach to testing requires compromises and can introduce more problems and overheads
than make it worthwhile. There's a lot to be said about how to go about writing tests for an ASP
Web API versus how to write tests for something like a a class library. A lot of that discussion might revolve around
how we ought to define a _unit_ to test, and to what extent should tests involve mocking. I'm not entirely sure why ASP
developers test this way. Maybe I'm missing something, but these sorts of tests rarely catch anything worthwhile, and they
require a lot more maintenance than the code they actually test.

We've had to stick an `IMathsService` interface in there to "make it testable" (a common justification for extracting an
interface wherever it's possible to do so), and our tests are heavily dependent on the implementation rather than the behaviour.
So much so that if we decide that our service layer is pointless and we want to just have the controller calculate and return
the result, our two `MathsController` tests will need rewriting and our `MathsService` tests will be thrown out entirely. That
might not be surprising since we're deleting `MathsService`, but it could be a suggestion that we're not testing the right things.

Much better would be to simply write tests for the behaviours we want from the get-go. But isn't this is what we've already
done? We've isolated the behaviours of some units  -- our controllers and services -- and written test fixtures for them.
The problem seems to be one of definition; at least in this scenario, we've defined _unit_ in a counterproductive way.

What if our application's units were its behaviours? A lot of our problems go away when we use this definition for
the purposes of our little-API-that-could. We can summarise its one behaviour: "Calling the GET route should return the result
of two numeric arguments added together". If we want to write tests for this behaviour in ASP Core, we might want to
use its excellent integration test [tooling](https://docs.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-2.1).

So what am I actually talking about at this point? It's not a bad question. As far as I can tell, I've decided
to expunge mock-based unit tests where the unit is a class or a method, and replace them with
behaviour tests written as part of a BDD/TDD workflow, but using ASP Core's integration testing framework as the backbone
for provisioning the tests. Maybe somebody spiked my coffee.

Let's see what one of these mythical tests looks like:

```csharp
// IClassFixture is an xUnit construct
public class AddBehaviourTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly WebApplicationFactory<Startup> _factory;

    public AddBehaviourTests(WebApplicationFactory<Startup> factory)
    {
        _factory = factory;
    }

    [Theory]
    [InlineData(1, 2, 3)]
    [InlineData(0, 5, 5)]
    [InlineData(12, 11, 23)]
    public async Task Get_AddTwoNumbers_ReturnsResultOfAddingTwoNumbers(
        int a, int b, int expected)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync($"/maths/add?a={a}&b={b}");

        // Assert
        var result = await response.Content.ReadAsStringAsync();

        Assert.Equal(expected, int.Parse(result));
    }
}
```

This is so simple and I absolutely love it. In a single, less-brittle test we've covered the same functionality
that our other three tests have. We didn't need a single mock. We've written less code that needs less maintenance to do the
same thing. We also get the added benefit of being able to test that the API can actually handle the request; if model bindings for
our route weren't configured or some dependencies weren't registered with the ASP service provider correctly our previous
tests wouldn't have flagged anything. These tests are still fast enough to allow for continuous re-running, and you can step into
and debug them without any extra effort.

We're also decoupled from our implementation. If we want to remove `MathsService` and bring the logic to the controller, we can.
If the tests don't break, we know we haven't broken anything! Since we've largely removed the need to mock things, we can cut
out a lot of middling boilerplate work that requires us to add stupid interfaces to everything -- goodbye `IMathsService`;
note that there exist alternative mocking approaches, even without this whacked-out testing methodology.
[Pose](https://github.com/tonerdo/pose) and [Virtuosity](https://github.com/Fody/Virtuosity) or simply using `virtual`
modifiers might all be better ideas than creating one-to-one interfaces for everything. Where it could make sense to mock,
such as at IO boundaries or anything non-deterministic like the current time, we can override service injections
configured in `Startup` just for our test-suite. It's a really, really awesome way of testing.

The goal for a test suite is to give us confidence in the code

- TDD one possibility
- Classicist vs mockist
- 'Unit' sort of sounds like it's measuring a unit of code so it's understandable to see why people interpret it that way
- Mocking is big with TDD depending on who you ask
- TDD defines behaviours
- What is behaviour when testing an API?
- Possible issues. Might be slower. Best to mix and match, maybe? Harder to isolate exactly where it's going wrong. Just don't write those stupid plumbing tests.
- Goal is a suite of tests that give you confidence you've not fucked it. It's deterministic and reproducible. Call it what you want.