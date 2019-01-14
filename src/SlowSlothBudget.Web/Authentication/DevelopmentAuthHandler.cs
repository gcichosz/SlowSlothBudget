using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace SlowSlothBudget.Web.Authentication
{
    public class DevelopmentAuthHandler : AuthenticationHandler<DevelopmentAuthOptions>
    {
        public DevelopmentAuthHandler(IOptionsMonitor<DevelopmentAuthOptions> options, ILoggerFactory logger,
            UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

        private ClaimsIdentity Identity => new ClaimsIdentity(new[]
        {
            new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
                Options.NameIdentifier)
        }, "development");

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            // build the claims and put them in "Context"; you need to import the Microsoft.AspNetCore.Authentication package
            return await Task.FromResult(AuthenticateResult.Success(
                new AuthenticationTicket(new ClaimsPrincipal(Identity), DevelopmentAuthDefaults.AuthenticationScheme)));
        }
    }
}