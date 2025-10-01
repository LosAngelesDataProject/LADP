using Microsoft.EntityFrameworkCore;
using LADP_EFC.Data;
using LADP_EFC.Repository;
using LADP_EFC.Repository.Interfaces;
using System.Text.Json.Serialization;
using LADP_EFC.Data.Enitities;
using LADP_EFC.Services;

namespace LADP_EFC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<BrevoApi>(builder.Configuration.GetSection("BrevoApi"));
            builder.Services.AddScoped< FoodResourceService>();

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
                options.AddPolicy("AllowSpecificOrigin",
                    policy => policy
                        .WithOrigins("http://localhost:5173", "https://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    sqlOptions => sqlOptions.EnableRetryOnFailure());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowSpecificOrigin");
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
