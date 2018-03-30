using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alexa.NET.Security.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace JellenWeddingSkill
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddScoped<Interfaces.ISkillLogic, Core.SkillLogic>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // requests on all controllers will be validated, so no non-Amazon-Alexa-requests will get past this
            app.UseAlexaRequestValidation();

            app.UseWhen( context => context.Request.Path.StartsWithSegments("/api/alexa"), appBuilder =>
            {
                /* requests on only the /api/alexa controllers will be validated, 
                so no non-Amazon-Alexa-requests will get past this */
                appBuilder.UseAlexaRequestValidation();
            });

            app.UseMvc();
        }
    }
}
