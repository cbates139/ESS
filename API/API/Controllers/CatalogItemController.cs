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
    public class CatalogItemController : ControllerBase
    {
        private readonly ILogger<CatalogItemController> _logger;
        private readonly IStoredProcedureExecutor _sprExecutor;

        public CatalogItemController(ILogger<CatalogItemController> logger, IStoredProcedureExecutor sprExecutor)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _sprExecutor = sprExecutor ?? throw new ArgumentNullException(nameof(sprExecutor));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Catalog Items");

            // Execute stored procedure
            var items = await _sprExecutor.Query<CatalogItem>("sprGetItems");

            // Return items with status 200
            return Ok(items);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            _logger.LogInformation($"Get Catalog Item: {id}");

            // Build query parameters
            var param = new { itemID = id };

            // Execute stored procedure
            var item = await _sprExecutor.QuerySingleOrDefault<CatalogItem>("sprGetItem", param);

            if (item is null)
            {
                // Return error with status 400
                return BadRequest(new { error = "Invalid Item ID" });
            }
            // Return item with status 200
            return Ok(item);
        }
    }
}
