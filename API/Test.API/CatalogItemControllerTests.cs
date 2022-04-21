using API.Controllers;
using API.Helpers.Database;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Test.API.Helpers;
using Xunit;

namespace Test.API
{
    public class CatalogItemControllerTests
    {
        private readonly Mock<IStoredProcedureExecutor> _sprExecutorMock;
        private readonly ILogger<CatalogItemController> _logger;

        public CatalogItemControllerTests()
        {
            _sprExecutorMock = new Mock<IStoredProcedureExecutor>();
            _logger = new Mock<ILogger<CatalogItemController>>().Object;
        }

        [Fact]
        public async void WhenTheGetAllMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            IEnumerable<CatalogItem> items = new List<CatalogItem>();
            _sprExecutorMock
                .Setup(mock => mock.Query<CatalogItem>(It.IsAny<string>(), null))
                .Returns(Task.FromResult(items));

            var controller = new CatalogItemController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Get();

            // Verify 
            _sprExecutorMock.Verify(Mock => Mock.Query<CatalogItem>("sprGetItems", null), Times.Once);
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<CatalogItem>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(new CatalogItem()));

            var controller = new CatalogItemController(_logger, _sprExecutorMock.Object);

            // Action
            var id = "testId";

            var result = await controller.Get(id);

            // Verify 
            var expectedParams = new { itemID = id };

            _sprExecutorMock.Verify(Mock => 
                Mock.QuerySingleOrDefault<CatalogItem>(
                    "sprGetItem",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_AndTheStoredProcedureReturnsNull_ThenStatus400IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<CatalogItem>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<CatalogItem>(null));

            var controller = new CatalogItemController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Get("testId");

            // Verify 
            Assert.Equal(400, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenTheGetOneMethodIsCalled_AndTheStoredProcedureReturnsAResult_ThenStatus200IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<CatalogItem>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(new CatalogItem()));

            var controller = new CatalogItemController(_logger, _sprExecutorMock.Object);

            // Action
            var result = await controller.Get("testId");

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }
    }
}
