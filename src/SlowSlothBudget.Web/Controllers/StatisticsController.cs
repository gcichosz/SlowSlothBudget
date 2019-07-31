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
            // BART: would probably use extensions here to get claims that are used frequently.
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // BART: code duplicated a lot, would move to action filters, however all this is under authorization attribute, meaning that if userId is null there is something wrong with auth server or transform logic, probably cleaner to delete this check as it seems unnecessary.
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var userLastYearAverages = _statisticsRepository.CalculateUserLastYearAverages(userId);
            return Ok(_statisticsMapper.Map(userLastYearAverages));
        }
    }
}