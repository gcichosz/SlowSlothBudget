using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson.Serialization.Conventions;
using SlowSlothBudget.Web.Authentication;
using SlowSlothBudget.Web.Authorization;
using SlowSlothBudget.Web.DAL;
using SlowSlothBudget.Web.Mappers;
using SlowSlothBudget.Web.Options;

namespace SlowSlothBudget.Web
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;

        public Startup(IHostingEnvironment environment, IConfiguration configuration)
        {
            _environment = environment;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<MongoDbOptions>(Configuration.GetSection("MongoDB"));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            if (_environment.IsDevelopment())
            {
				//dupa
                services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = DevelopmentAuthDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = DevelopmentAuthDefaults.AuthenticationScheme;
                    })
                    .AddCustomAuth(options =>
                    {
                        options.NameIdentifier = Configuration["Authentication:DefaultNameIdentifier"];
                    });
            }
            else
            {
                var domain = $"https://{Configuration["Auth0:Domain"]}/";
                services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.Authority = domain;
                        options.Audience = Configuration["Auth0:ClientID"];
                    });
            }

            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
            services.AddTransient<IExpensesRepository, ExpensesRepository>();
            services.AddSingleton<IExpensesMapper, ExpensesMapper>();
            services.AddSingleton<IStatisticsRepository, StatisticsRepository>();
            services.AddSingleton<IStatisticsMapper, StatisticsMapper>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            var conventionPack = new ConventionPack {new CamelCaseElementNameConvention()};
            ConventionRegistry.Register("camelCase", conventionPack, t => true);
        }
    }
}