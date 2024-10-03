﻿// <auto-generated />
using System;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataAccess.Migrations.DataDb
{
    [DbContext(typeof(DataDbContext))]
    [Migration("20241003134240_FirstMigration")]
    partial class FirstMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Core.Models.Coach", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CoachClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ContractFrom")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ContractTo")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("WhatTrains")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CoachClubId");

                    b.ToTable("Coaches");
                });

            modelBuilder.Entity("Core.Models.Player", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Assists")
                        .HasColumnType("int");

                    b.Property<DateTime>("ContractFrom")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ContractTo")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Goals")
                        .HasColumnType("int");

                    b.Property<bool>("HasInjury")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PlayedMatches")
                        .HasColumnType("int");

                    b.Property<int>("PlayedMinutes")
                        .HasColumnType("int");

                    b.Property<Guid>("PlayerClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.Property<int>("RedCards")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("YellowCards")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlayerClubId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Core.Models.SportsClub", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Rising")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("SportsClubs");
                });

            modelBuilder.Entity("Core.Models.Staff", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ContractFrom")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ContractTo")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobPosition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("StaffClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("StaffClubId");

                    b.ToTable("Staffs");
                });

            modelBuilder.Entity("Core.Models.Coach", b =>
                {
                    b.HasOne("Core.Models.SportsClub", "CoachClub")
                        .WithMany("CoachList")
                        .HasForeignKey("CoachClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CoachClub");
                });

            modelBuilder.Entity("Core.Models.Player", b =>
                {
                    b.HasOne("Core.Models.SportsClub", "PlayerClub")
                        .WithMany("PlayerList")
                        .HasForeignKey("PlayerClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PlayerClub");
                });

            modelBuilder.Entity("Core.Models.Staff", b =>
                {
                    b.HasOne("Core.Models.SportsClub", "StaffClub")
                        .WithMany("StaffList")
                        .HasForeignKey("StaffClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StaffClub");
                });

            modelBuilder.Entity("Core.Models.SportsClub", b =>
                {
                    b.Navigation("CoachList");

                    b.Navigation("PlayerList");

                    b.Navigation("StaffList");
                });
#pragma warning restore 612, 618
        }
    }
}
