using API.Controllers;
using API.Helpers;
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
    public class QuoteRequestControllerTests
    {
        private readonly Mock<IStoredProcedureExecutor> _sprExecutorMock;
        private readonly Mock<IUserContext> _userContextMock;
        private readonly ILogger<QuoteRequestController> _logger;

        public QuoteRequestControllerTests()
        {
            _sprExecutorMock = new Mock<IStoredProcedureExecutor>();
            _userContextMock = new Mock<IUserContext>();
            _logger = new Mock<ILogger<QuoteRequestController>>().Object;
        }

        [Fact]
        public async void WhenTheGetAllMethodIsCalledByAUser_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            IEnumerable<QuoteRequest> quotes = new List<QuoteRequest>();
            _sprExecutorMock
                .Setup(mock => mock.Query<QuoteRequest>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(quotes));

            _userContextMock.SetupGet(mock => mock.AccountType).Returns("U");
            _userContextMock.SetupGet(mock => mock.Username).Returns("testUsername");

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = _userContextMock.Object;

            // Action
            var result = await controller.Get();

            // Verify 
            var expectedParams = new { username = _userContextMock.Object.Username };

            _sprExecutorMock.Verify(Mock =>
                Mock.Query<QuoteRequest>(
                    "sprGetQuoteRequestsForUser",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenTheGetAllMethodIsCalledByAnEmployee_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            IEnumerable<QuoteRequest> quotes = new List<QuoteRequest>();
            _sprExecutorMock
                .Setup(mock => mock.Query<QuoteRequest>(It.IsAny<string>(), null))
                .Returns(Task.FromResult(quotes));

            _userContextMock.SetupGet(mock => mock.AccountType).Returns("E");

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = _userContextMock.Object;

            // Action
            var result = await controller.Get();

            // Verify 
            _sprExecutorMock.Verify(Mock => Mock.Query<QuoteRequest>("sprGetQuoteRequests", null), Times.Once);
        }

        [Theory]
        [InlineData("U")]
        [InlineData("E")]
        public async void WhenTheGetAllMethodIsCalled_AndTheUserAccountTypeIsValid_ThenStatus200IsReturned(string accountType)
        {
            // Setup
            _userContextMock.SetupGet(mock => mock.AccountType).Returns(accountType);

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = _userContextMock.Object;

            // Action
            var result = await controller.Get();

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }

        [Theory]
        [InlineData("S")]
        [InlineData("invalidAccountType")]
        [InlineData("")]
        [InlineData(null)]
        public async void WhenTheGetAllMethodIsCalled_AndTheUserAccountTypeIsInvalid_ThenStatus401IsReturned(string accountType)
        {
            // Setup
            _userContextMock.SetupGet(mock => mock.AccountType).Returns(accountType);

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = _userContextMock.Object;

            // Action
            var result = await controller.Get();

            // Verify 
            Assert.Equal(401, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<QuoteRequest>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(new QuoteRequest()));

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            // Action
            var id = 1;

            var result = await controller.Get(id);

            // Verify 
            var expectedParams = new { quoteRequestID = id };

            _sprExecutorMock.Verify(Mock =>
                Mock.QuerySingleOrDefault<QuoteRequest>(
                    "sprGetQuoteRequest",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_AndTheStoredProcedureReturnsNull_ThenStatus400IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<QuoteRequest>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<QuoteRequest>(null));

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

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
                .Setup(mock => mock.QuerySingleOrDefault<QuoteRequest>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(new QuoteRequest()));

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Get(1);

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenThePostMethodIsCalled_AndUsernameIsProvided_ThenTheExpectedStoredProcedureIsCalledWithTheUsernameParameterFromTheQuoteRequest()
        {
            // Setup
            var id = 1;
            _sprExecutorMock
                .Setup(mock => mock.Execute(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(id));

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();

            var quoteRequest = new QuoteRequest()
            {
                ItemId = "testId",
                Username = "testUsername"
            };

            // Action
            var result = await controller.Post(quoteRequest);

            // Verify 
            var expectedParams = new 
            {
                creationDate = DateTime.UtcNow.TrimMilliseconds(),
                preferredDate = DateTime.UtcNow.TrimMilliseconds(),
                userUN = quoteRequest.Username, 
                itemID = quoteRequest.ItemId 
            };

            _sprExecutorMock.Verify(Mock =>
                Mock.Execute(
                    "sprInsertQuoteRequest",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenThePostMethodIsCalled_AndUsernameIsNotProvided_ThenTheExpectedStoredProcedureIsCalledWithTheUsernameParameterFromTheUserContext()
        {
            // Setup
            var id = 1;
            _sprExecutorMock
                .Setup(mock => mock.Execute(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(id));

            var username = "testUsername";
            _userContextMock.SetupGet(mock => mock.Username).Returns(username);

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = _userContextMock.Object;

            var quoteRequest = new QuoteRequest() { ItemId = "testId" };

            // Action
            var result = await controller.Post(quoteRequest);

            // Verify 
            var expectedParams = new 
            {
                creationDate = DateTime.UtcNow.TrimMilliseconds(),
                preferredDate = DateTime.UtcNow.TrimMilliseconds(),
                userUN = username, 
                itemID = quoteRequest.ItemId 
            };

            _sprExecutorMock.Verify(Mock =>
                Mock.Execute(
                    "sprInsertQuoteRequest",
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

            var controller = new QuoteRequestController(_logger, _sprExecutorMock.Object);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();

            var quoteRequest = new QuoteRequest()
            {
                ItemId = "testId",
                Username = "testUsername"
            };

            // Action
            var result = await controller.Post(quoteRequest);

            // Verify 
            Assert.Equal(400, (result as ObjectResult)?.StatusCode);
        }
    }
}
