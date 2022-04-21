using API.Helpers;
using API.Helpers.Database;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Authorize(policy: "User")]
    [Route("[controller]")]
    public class QuoteRequestController : ControllerBase
    {
        private readonly ILogger<QuoteRequestController> _logger;
        private readonly IStoredProcedureExecutor _sprExecutor;

        public QuoteRequestController(ILogger<QuoteRequestController> logger, IStoredProcedureExecutor sprExecutor)
        {
            _logger = logger;
            _sprExecutor = sprExecutor;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Quote Requests");

            // Get user context
            var userContext = HttpContext.Items["user"] as IUserContext;

            // Define stored procedure and params
            (string storedProcedure, object param) = userContext.AccountType switch
            {
                "U" => ("sprGetQuoteRequestsForUser", new { username = userContext.Username }),
                "E" => ("sprGetQuoteRequests", null),
                _ => (null, null)
            };

            if (storedProcedure is null)
            {
                // Return error with status 401
                return Unauthorized(new { error = "Invalid Account Type" });
            }

            // Execute stored procedure
            var quoteRequests = await _sprExecutor.Query<QuoteRequest>(storedProcedure, param);

            // Return quote requests with status 200
            return Ok(quoteRequests);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _logger.LogInformation($"Get Quote Request: {id}");

            // Build query parameters
            var param = new { quoteRequestID = id };

            // Execute stored procedure
            var quoteRequest = await _sprExecutor.QuerySingleOrDefault<QuoteRequest>("sprGetQuoteRequest", param);

            if (quoteRequest is null)
            {
                // Return error with status 400
                return BadRequest(new { error = "Invalid Quote Request ID" });
            }

            // Return quote request with status 200
            return Ok(quoteRequest);
        }

        [HttpPost]
        public async Task<IActionResult> Post(QuoteRequest quoteRequest)
        {
            _logger.LogInformation($"Create Quote Request: {quoteRequest}");

            // Get user context
            var userContext = HttpContext.Items["user"] as IUserContext;

            // If username is null get username from user context
            quoteRequest.Username ??= userContext?.Username;

            // Build query parameters
            var param = new
            {
                creationDate = DateTime.UtcNow.TrimMilliseconds(),
                preferredDate = DateTime.UtcNow.TrimMilliseconds(),
                userUN = quoteRequest.Username,
                itemID = quoteRequest.ItemId
            };
            try
            {
                // Execute stored procedure
                quoteRequest.Id = await _sprExecutor.Execute("sprInsertQuoteRequest", param);

                // Get quote request by id and return
                return await Get(quoteRequest.Id);
            }
            catch (Exception)
            {
                // Return error with status 400
                return BadRequest(new { error = "Invalid Quote Request" });
            }
        }
    }
}
