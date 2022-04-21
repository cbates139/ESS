using API.Controllers;
using API.Helpers.Database;
using API.Models;
using API.OAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Threading.Tasks;
using Test.API.Helpers;
using Xunit;
using System.Text;
using System.Security;
using System.Security.Cryptography;
namespace Test.API
{
    public class UserControllerTests
    {
        private readonly Mock<IStoredProcedureExecutor> _sprExecutorMock;
        private readonly ILogger<UserController> _logger;
        private readonly IJwtTokenBuilder _jwtTokenBuilder;

        public UserControllerTests()
        {
            _sprExecutorMock = new Mock<IStoredProcedureExecutor>();
            _logger = new Mock<ILogger<UserController>>().Object;
            _jwtTokenBuilder = new Mock<IJwtTokenBuilder>().Object;
        }
        //Hashes a users password input to check against the database 
        static string Hash(string input)
        {
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder(hash.Length * 2);
                string final;

                foreach (byte b in hash)
                {
                    // can be "x2" if you want lowercase
                    sb.Append(b.ToString("X2"));
                }
                final = "0x" + sb.ToString();
                return final.Substring(0, 20);
            }
        }
        [Fact]
        public async void WhenTheLoginMethodIsCalled_ThenTheExpectedStoredProcedureIsCalledWithTheExpectedParameters()
        {
            // Setup
            var user = new User()
            {
                Username = "username",
                AccountType = 'U'
            };
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(user));

            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            // Action
            var loginRequest = new LoginRequest()
            {
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(loginRequest);

            // Verify 
            var expectedParams = new
            {
                username = loginRequest.Username,
                password = Hash(loginRequest.Password),
            };

            _sprExecutorMock.Verify(Mock => 
                Mock.QuerySingleOrDefault<User>(
                    "sprGetUser",
                    It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                ), Times.Once
            );
        }

        [Fact]
        public async void WhenTheLoginMethodIsCalled_AndTheStoredProcedureReturnsNull_ThenStatus401IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<User>(null));

            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            // Action
            var loginRequest = new LoginRequest()
            {
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(loginRequest);

            // Verify 
            Assert.Equal(401, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenTheLoginMethodIsCalled_AndTheStoredProcedureReturnsAResult_ThenStatus200IsReturned()
        {
            // Setup
            var user = new User()
            {
                Username = "username",
                AccountType = 'U'
            };
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<User>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(user));

            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            // Action
            var loginRequest = new LoginRequest()
            {
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(loginRequest);

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public void WhenTheGetMethodIsCalled_AndUserContextIsNotNull_ThenStatus200IsReturned()
        {
            // Setup
            var userContextMock = new Mock<IUserContext>();

            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["user"] = userContextMock.Object;

            // Action
            var result = controller.Get();

            // Verify 
            Assert.Equal(200, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public void WhenTheGetMethodIsCalled_AndUserContextIsNull_ThenStatus401IsReturned()
        {
            // Setup
            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            controller.ControllerContext.HttpContext ??= new DefaultHttpContext();

            // Action
            var result = controller.Get();

            // Verify 
            Assert.Equal(401, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public async void WhenTheSignupMethodIsCalled_ThenTheExpectedStoredProceduresAreCalledWithTheExpectedParameters()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<string>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<string>(null));
            _sprExecutorMock
                .Setup(mock => mock.Execute(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult(default(int)));

            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            var optionsMock = new Mock<IOptions<ApiBehaviorOptions>>();

            // Action
            var signUpRequest = new SignUpRequest()
            {
                FirstName = "firstName",
                LastName = "lastName",
                Email = "email@email.email",
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(signUpRequest, optionsMock.Object);

            // Verify 
            // Verify sprGetUsername 
            {
                var expectedParams = new
                {
                    signUpRequest.Username
                };

                _sprExecutorMock.Verify(Mock => 
                    Mock.QuerySingleOrDefault<string>(
                        "sprGetUsername",
                        It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                    ), Times.Once
                );
            }
            // Verify sprGetEmail 
            {
                var expectedParams = new
                {
                    signUpRequest.Email
                };

                _sprExecutorMock.Verify(Mock => 
                    Mock.QuerySingleOrDefault<string>(
                        "sprGetEmail",
                        It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                    ), Times.Once
                );
            }
            // Verify sprInsertUser 
            {
                var expectedParams = signUpRequest;

                _sprExecutorMock.Verify(Mock => 
                    Mock.Execute(
                        "sprInsertUser",
                        It.Is<object>(actual => VerifyHelper.AreEqualObjects(expectedParams, actual))
                    ), Times.Once
                );
            }
        }

        [Fact]
        public async void WhenTheSignupMethodIsCalled_AndTheStoredProcedureThrowsAnException_ThenStatus400IsReturned()
        {
            // Setup
            _sprExecutorMock
                .Setup(mock => mock.QuerySingleOrDefault<string>(It.IsAny<string>(), It.IsAny<object>()))
                .Returns(Task.FromResult<string>(null));
            _sprExecutorMock
                .Setup(mock => mock.Execute(It.IsAny<string>(), It.IsAny<object>()))
                .ThrowsAsync(new ArgumentNullException());

            var controller = new UserController(_logger, _sprExecutorMock.Object, _jwtTokenBuilder);

            var optionsMock = new Mock<IOptions<ApiBehaviorOptions>>();

            // Action
            var signUpRequest = new SignUpRequest()
            {
                FirstName = "firstName",
                LastName = "lastName",
                Email = "email@email.email",
                Username = "username",
                Password = "password"
            };
            var result = await controller.Post(signUpRequest, optionsMock.Object);

            // Verify 
            Assert.Equal(400, (result as ObjectResult)?.StatusCode);
        }
    }
}
