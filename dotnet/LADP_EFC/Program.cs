using Microsoft.EntityFrameworkCore;
using LADP_EFC.Data;
using LADP_EFC.Repository;
using LADP_EFC.Repository.Interfaces;
using System.Text.Json.Serialization;
using LADP_EFC.Data.Enitities;
using LADP_EFC.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace LADP_EFC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new Exception("JWT Key missing");
            var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                                 ?? new[] { "http://localhost:5173" }; // Fallback for local dev

            // Add services to the container.
            builder.Services.Configure<BrevoApi>(builder.Configuration.GetSection("BrevoApi"));
            builder.Services.AddScoped<FoodResourceService>();

            // Add Repositories to the container.
            builder.Services.AddScoped<IRepositoryEmail, RepositoryEmail>();
            builder.Services.AddScoped<IRepositoryFoodResource, RepositoryFoodResource>();
            builder.Services.AddScoped<IRepositoryDeveloper, RepositoryDeveloper>();
            builder.Services.AddScoped<IRepositoryUser, RepositoryUser>();
            
            // Add Controllers
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            // CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials()); // Required for Cookies
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection"));
                    
            });

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = ctx =>
                    {
                        ctx.Token = ctx.Request.Cookies["access_token"];
                        return Task.CompletedTask;
                    }
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowSpecificOrigin");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
