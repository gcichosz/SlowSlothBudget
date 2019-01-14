using Microsoft.AspNetCore.Authentication;

namespace SlowSlothBudget.Web.Authentication
{
    public class DevelopmentAuthOptions : AuthenticationSchemeOptions
    {
        public string NameIdentifier { get; set; }
    }
}