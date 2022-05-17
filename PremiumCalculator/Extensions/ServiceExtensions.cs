using Microsoft.Extensions.DependencyInjection;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PremiumCalculator.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureUserCreatedServices(this IServiceCollection services)
        {
            services.AddScoped<IPremiumCalculatorService, PremiumCalculatorService>();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader());
            });
        }
    }
}
