﻿// <auto-generated />
using System;
using LADP_EFC.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LADP_EFC.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LADP__EFC.Models.BusinessHours", b =>
                {
                    b.Property<int>("BusinessHourId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("BusinessHourID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BusinessHourId"));

                    b.Property<string>("CloseTime")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasColumnName("CloseTime");

                    b.Property<int>("DayId")
                        .HasColumnType("int");

                    b.Property<int>("FoodResourceId")
                        .HasColumnType("int")
                        .HasColumnName("FoodResourceID");

                    b.Property<string>("OpenTime")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasColumnName("OpenTime");

                    b.HasKey("BusinessHourId")
                        .HasName("PK_BusinessHours");

                    b.HasIndex("DayId");

                    b.HasIndex("FoodResourceId");

                    b.ToTable("BusinessHours", (string)null);
                });

            modelBuilder.Entity("LADP__EFC.Models.Day", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .HasColumnName("Name");

                    b.HasKey("Id")
                        .HasName("PK_Days");

                    b.ToTable("Days", (string)null);
                });

            modelBuilder.Entity("LADP__EFC.Models.FoodResource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Area")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Area");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("City");

                    b.Property<string>("Country")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Country");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(MAX)")
                        .HasColumnName("Description");

                    b.Property<decimal?>("Latitude")
                        .IsRequired()
                        .HasColumnType("decimal(9, 6)")
                        .HasColumnName("Latitude");

                    b.Property<decimal?>("Longitude")
                        .IsRequired()
                        .HasColumnType("decimal(9, 6)")
                        .HasColumnName("Longitude");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Name");

                    b.Property<string>("Phone")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Phone");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)")
                        .HasColumnName("State");

                    b.Property<string>("StreetAddress")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("StreetAddress");

                    b.Property<string>("Website")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Website");

                    b.Property<string>("Zipcode")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("Zipcode");

                    b.HasKey("Id")
                        .HasName("PK_FoodResource");

                    b.ToTable("FoodResource", (string)null);
                });

            modelBuilder.Entity("LADP__EFC.Models.ResourceTags", b =>
                {
                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.Property<int>("FoodResourceId")
                        .HasColumnType("int");

                    b.HasKey("TagId", "FoodResourceId");

                    b.HasIndex("FoodResourceId");

                    b.ToTable("ResourceTags", (string)null);
                });

            modelBuilder.Entity("LADP__EFC.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Name");

                    b.HasKey("Id")
                        .HasName("PK_Tag");

                    b.ToTable("Tag", (string)null);
                });

            modelBuilder.Entity("LADP__EFC.Models.TodoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SensitiveInfo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TodoItems");
                });

            modelBuilder.Entity("LADP__EFC.Models.BusinessHours", b =>
                {
                    b.HasOne("LADP__EFC.Models.Day", "Day")
                        .WithMany("BusinessHours")
                        .HasForeignKey("DayId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_BusinessHours_Days");

                    b.HasOne("LADP__EFC.Models.FoodResource", "FoodResource")
                        .WithMany("BusinessHours")
                        .HasForeignKey("FoodResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_BusinessHours_FoodResource");

                    b.Navigation("Day");

                    b.Navigation("FoodResource");
                });

            modelBuilder.Entity("LADP__EFC.Models.ResourceTags", b =>
                {
                    b.HasOne("LADP__EFC.Models.FoodResource", null)
                        .WithMany()
                        .HasForeignKey("FoodResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_ResourceTags_FoodResource");

                    b.HasOne("LADP__EFC.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_ResourceTags_Tags");
                });

            modelBuilder.Entity("LADP__EFC.Models.Day", b =>
                {
                    b.Navigation("BusinessHours");
                });

            modelBuilder.Entity("LADP__EFC.Models.FoodResource", b =>
                {
                    b.Navigation("BusinessHours");
                });
#pragma warning restore 612, 618
        }
    }
}
