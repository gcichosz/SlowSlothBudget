using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Mappers;

namespace SlowSlothBudget.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly ICategoriesMapper _categoriesMapper;

        public CategoriesController(ICategoriesRepository categoriesRepository, ICategoriesMapper categoriesMapper)
        {
            _categoriesRepository = categoriesRepository;
            _categoriesMapper = categoriesMapper;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var userCategories = _categoriesRepository.FindUserCategories(userId);
            return Ok(_categoriesMapper.Map(userCategories));
        }
    }
}