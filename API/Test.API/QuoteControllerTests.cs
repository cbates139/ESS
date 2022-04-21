using API.Controllers;
using API.Helpers.Database;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Test.API.Helpers;
using Xunit;

namespace Test.API
{
    public class QuoteControllerTests
    {
        private readonly Mock<IStoredProcedureExecutor> _sprExecutorMock;
        private readonly ILogger<QuoteController> _logger;

        public QuoteControllerTests()
        {
            _sprExecutorMock = new Mock<IStoredProcedureExecutor>();
            _logger = new Mock<ILogger<QuoteController>>().Object;
        }

        [Fact]
        public async void WhenTheGetAllMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            IEnumerable<Quote> quotes = new List<Quote>();
            _sprExecutorMock
                .Setup(mock => mock.Query<Quote>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(quotes));

            var username = "testUsername";
            var userContextMock = new Mock<IUserContext>();
            userContextMock.SetupGet(mock => mock.Username).Returns(username);

            var controller = new QuoteController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = userContextMock.Object;

            // Action
            var result = await controller.Get();

            // Verify 
            var expectedParams = new { username };

            _sprExecutorMock.Verify(Mock =>
                Mock.Query<Quote>(
                    "sprGetQuotes",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<Quote>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(new Quote()));

            var controller = new QuoteController(_logger, _sprExecutorMock.Object);

            // Action
            var id = 1;

            var result = await controller.Get(id);

            // Verify 
            var expectedParams = new { quoteID = id };

            _sprExecutorMock.Verify(Mock =>
                Mock.QuerySingleOrDefault<Quote>(
                    "sprGetQuote",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_AndTheStoredProcedureReturnsNull_ThenStatus400IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<Quote>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<Quote>(null));

            var controller = new QuoteController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Get(1);

            // Verify 
            Assert.Equal(400, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_AndTheStoredProcedureReturnsAResult_ThenStatus200IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<Quote>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(new Quote()));

            var controller = new QuoteController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Get(1);

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenThePostMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            var quote = new Quote()
            {
                Id = 1,
                Description = "testDescription",
                TotalCost = 1200
            };

            _sprExecutorMock
                .Setup(mock => mock.Execute(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(quote.Id));

            var controller = new QuoteController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Post(quote);

            // Verify 
            var expectedParams = new 
            {
                quoteID = quote.Id,
                quoteDesc = quote.Description,
                quoteCost = quote.TotalCost
            };

            _sprExecutorMock.Verify(Mock =>
                Mock.Execute(
                    "sprInsertQuote",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenThePostMethodIsCalled_AndTheStoredProcedureThrowsAnException_ThenStatus400IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.Execute(It.IsAny<string>(), It.IsAny<object>()))
                .ThrowsAsync(new ArgumentException());

            var controller = new QuoteController(_logger, _sprExecutorMock.Object);

            var quote = new Quote()
            {
                Id = 1,
                Description = "testDescription",
                TotalCost = 1200
            };

            // Action
            var result = await controller.Post(quote);

            // Verify 
            Assert.Equal(400, (result as ObjectResult)?.StatusCode);
        }
    }
}
