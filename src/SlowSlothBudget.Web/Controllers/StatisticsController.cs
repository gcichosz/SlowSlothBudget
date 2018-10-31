using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Mappers;

namespace SlowSlothBudget.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsRepository _statisticsRepository;
        private readonly IStatisticsMapper _statisticsMapper;

        public StatisticsController(IStatisticsRepository statisticsRepository, IStatisticsMapper statisticsMapper)
        {
            _statisticsRepository = statisticsRepository;
            _statisticsMapper = statisticsMapper;
        }

        [HttpGet("lastYearAverages")]
        public IActionResult LastYearAverages()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var userLastYearAverages = _statisticsRepository.CalculateUserLastYearAverages(userId);
            return Ok(_statisticsMapper.Map(userLastYearAverages));
        }
    }
}