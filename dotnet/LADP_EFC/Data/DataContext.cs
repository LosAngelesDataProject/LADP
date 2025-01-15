using LADP_EFC.Models;
using LADP_EFC.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace LADP_EFC.Data
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
        public DbSet<Developers> Developers { get; set; }
        public DbSet<DevelopersRole> DevelopersRole { get; set; }
        public DbSet<User> Users { get; set; }

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
                entity.Property(e => e.Name).IsRequired().HasMaxLength(10).HasColumnName("Name").HasColumnType("nvarchar(10)");
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
                entity.Property(e => e.County).HasMaxLength(100).HasColumnName("County").HasColumnType("nvarchar(100)");
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

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(e => e.Id).HasName("PK_Users");
                entity.Property(e => e.Id).HasColumnName("Id").HasColumnType("int");
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255).HasColumnName("Email").HasColumnType("nvarchar(255)");
                entity.Property(e => e.Password).IsRequired().HasMaxLength(128).HasColumnName("Password").HasColumnType("varchar(128");
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100).HasColumnName("FirstName").HasColumnType("nvarchar(100)");
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100).HasColumnName("LastName").HasColumnType("nvarchar(100)");
                entity.Property(e => e.Mi).HasMaxLength(2).HasColumnName("Mi").HasColumnType("varchar(2)");
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50).HasColumnName("Status").HasColumnType("nvarchar(50)");
                entity.Property(e => e.DateCreated).IsRequired().HasColumnName("DateCreated").HasColumnType("datetime2(7)");
                entity.Property(e => e.DateModified).IsRequired().HasColumnName("DateModified").HasColumnType("datetime2(7)");
                entity.Property(e => e.Phone).HasMaxLength(50).HasColumnName("Phone").HasColumnType("nvarchar(50)");

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

            modelBuilder.Entity<Developers>(entity =>
            {
                entity.ToTable("DevelopersInfo");
                entity.HasKey(e => e.DeveloperID).HasName("PK_DeveloperID");
                entity.Property(e => e.DeveloperID).HasColumnName("DeveloperID").HasColumnType("int");
                entity.Property(e => e.Name).HasColumnName("Name").HasColumnType("nvarchar(100)");
                entity.Property(e => e.PictureUrl).HasColumnName("PictureUrl").HasColumnType("nvarchar(100)");
                entity.Property(e => e.LinkedInUrl).HasColumnName("LinkedInUrl").HasColumnType("nvarchar(100)");
                entity.Property(e => e.GithubUrl).HasColumnName("GithubUrl").HasColumnType("nvarchar(100)");
                entity.Property(e => e.RoleID).HasColumnName("RoleID").HasColumnType("int");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Developers)
                    .HasForeignKey(e => e.RoleID)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_DevelopersInfo_Role");
            });

            modelBuilder.Entity<DevelopersRole>(entity =>
            {
                entity.ToTable("DevelopersRole");
                entity.HasKey(e => e.RoleID).HasName("PK_RoleID");
                entity.Property(e => e.RoleID).HasColumnName("RoleID").HasColumnType("int");
                entity.Property(e => e.Title).IsRequired().HasMaxLength(10).HasColumnName("Title").HasColumnType("nvarchar(100)");
            });
        }
    }
}