using System;
using Microsoft.AspNetCore.Authentication;

namespace SlowSlothBudget.Web.Authentication
{
    public static class DevelopmentAuthExtensions
    {
        public static AuthenticationBuilder AddCustomAuth(this AuthenticationBuilder builder,
            Action<DevelopmentAuthOptions> configureOptions)
        {
            return builder.AddScheme<DevelopmentAuthOptions, DevelopmentAuthHandler>(
                DevelopmentAuthDefaults.AuthenticationScheme, DevelopmentAuthDefaults.AuthenticationScheme,
                configureOptions);
        }
    }
}