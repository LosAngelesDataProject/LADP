using LADP__EFC.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace LADP__EFC.Data
{
    public partial class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; } = null!;
        public DbSet<FoodResource> FoodResources { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ResourceTags> ResourceTags { get; set; }
        public DbSet<BusinessHours> BusinessHours { get; set; }
        public DbSet<Day> Days { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessHours>(entity =>
            {
                entity.ToTable("BusinessHours");
                entity.HasKey(e => e.BusinessHourId).HasName("PK_BusinessHours");
                entity.Property(e => e.BusinessHourId).HasColumnName("BusinessHourID").HasColumnType("int");
                entity.Property(e => e.FoodResourceId).HasColumnName("FoodResourceID").HasColumnType("int");
                entity.Property(e => e.OpenTime).HasMaxLength(10).HasColumnName("OpenTime").HasColumnType("nvarchar(10)");
                entity.Property(e => e.CloseTime).HasMaxLength(10).HasColumnName("CloseTime").HasColumnType("nvarchar(10)");

                entity.HasOne(d => d.Day)
                    .WithMany(p => p.BusinessHours)
                    .HasForeignKey(e => e.DayId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_BusinessHours_Days");
            });

            modelBuilder.Entity<Day>(entity =>
            {
                entity.ToTable("Days");
                entity.HasKey(e => e.Id).HasName("PK_Days");
                entity.Property(e => e.Id).HasColumnName("Id").HasColumnType("int");
                entity.Property(e => e.Name).IsRequired().HasMaxLength(10).HasColumnName("Name").HasColumnType("nchar(10)");
            });

            modelBuilder.Entity<FoodResource>(entity =>
            {
                entity.ToTable("FoodResource");
                entity.HasKey(e => e.Id).HasName("PK_FoodResource");
                entity.Property(e => e.Id).HasColumnName("Id").HasColumnType("int");
                entity.Property(e => e.Name).IsRequired().HasMaxLength(255).HasColumnName("Name").HasColumnType("nvarchar(255)");
                entity.Property(e => e.Area).HasMaxLength(100).HasColumnName("Area").HasColumnType("nvarchar(100)");
                entity.Property(e => e.StreetAddress).IsRequired().HasMaxLength(255).HasColumnName("StreetAddress").HasColumnType("nvarchar(255)");
                entity.Property(e => e.City).IsRequired().HasMaxLength(100).HasColumnName("City").HasColumnType("nvarchar(100)");
                entity.Property(e => e.State).IsRequired().HasMaxLength(2).HasColumnName("State").HasColumnType("nvarchar(2)");
                entity.Property(e => e.Zipcode).IsRequired().HasMaxLength(50).HasColumnName("Zipcode").HasColumnType("varchar(50)");
                entity.Property(e => e.Country).HasMaxLength(100).HasColumnName("Country").HasColumnType("nvarchar(100)");
                entity.Property(e => e.Latitude).IsRequired().HasColumnName("Latitude").HasColumnType("decimal(9, 6)");
                entity.Property(e => e.Longitude).IsRequired().HasColumnName("Longitude").HasColumnType("decimal(9, 6)");
                entity.Property(e => e.Phone).HasMaxLength(20).HasColumnName("Phone").HasColumnType("nvarchar(20)");
                entity.Property(e => e.Website).HasMaxLength(255).HasColumnName("Website").HasColumnType("nvarchar(255)");
                entity.Property(e => e.Description).HasColumnName("Description").HasColumnType("nvarchar(MAX)");

                entity.HasMany(e => e.BusinessHours)
                    .WithOne(e => e.FoodResource)
                    .HasForeignKey(e => e.FoodResourceId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_BusinessHours_FoodResource");

                entity.HasMany(e => e.Tags)
                    .WithMany(e => e.FoodResources)
                    .UsingEntity<ResourceTags>(
                        l => l.HasOne<Tag>().WithMany().HasForeignKey(e => e.TagId).HasConstraintName("FK_ResourceTags_Tags"),
                        r => r.HasOne<FoodResource>().WithMany().HasForeignKey(e => e.FoodResourceId).HasConstraintName("FK_ResourceTags_FoodResource"));
            });

            modelBuilder.Entity<ResourceTags>(entity =>
            {
                entity.ToTable("ResourceTags");
                entity.HasKey(e => new { e.TagId, e.FoodResourceId });
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("Tag");
                entity.HasKey(e => e.Id).HasName("PK_Tag");
                entity.Property(e => e.Id).HasColumnName("Id").HasColumnType("int");
                entity.Property(e => e.Name).HasMaxLength(100).HasColumnName("Name").HasColumnType("nvarchar(100)");
            });
        }
    }
}
