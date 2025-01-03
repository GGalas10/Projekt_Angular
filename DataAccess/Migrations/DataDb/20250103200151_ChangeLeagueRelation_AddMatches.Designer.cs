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
    [Migration("20250103200151_ChangeLeagueRelation_AddMatches")]
    partial class ChangeLeagueRelation_AddMatches
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Core.Models.ClubStatistic", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ClubAssist")
                        .HasColumnType("int");

                    b.Property<Guid>("ClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Drawn")
                        .HasColumnType("int");

                    b.Property<int>("GoalsAganist")
                        .HasColumnType("int");

                    b.Property<int>("GoalsFor")
                        .HasColumnType("int");

                    b.Property<Guid>("LeagueId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Lost")
                        .HasColumnType("int");

                    b.Property<int>("Played")
                        .HasColumnType("int");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<Guid>("SportsClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Won")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LeagueId");

                    b.HasIndex("SportsClubId");

                    b.ToTable("ClubStatistic");
                });

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

            modelBuilder.Entity("Core.Models.ErrorModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ErrorMessage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ErrorModels");
                });

            modelBuilder.Entity("Core.Models.League", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SezonEndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("SezonStartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Leagues");
                });

            modelBuilder.Entity("Core.Models.Match", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AwayClubGoals")
                        .HasColumnType("int");

                    b.Property<Guid>("AwayClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("HomeClubGoals")
                        .HasColumnType("int");

                    b.Property<Guid>("HomeClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LeagueId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("StartAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AwayClubId");

                    b.HasIndex("HomeClubId");

                    b.HasIndex("LeagueId");

                    b.ToTable("Matches");
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

                    b.Property<int>("PlayerNumber")
                        .HasColumnType("int");

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

            modelBuilder.Entity("Core.Models.UserClubAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<Guid>("SportsClubId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("SportsClubId");

                    b.ToTable("UserClubAccesses");
                });

            modelBuilder.Entity("Core.Models.ClubStatistic", b =>
                {
                    b.HasOne("Core.Models.League", "League")
                        .WithMany("clubs")
                        .HasForeignKey("LeagueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Models.SportsClub", "SportsClub")
                        .WithMany()
                        .HasForeignKey("SportsClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("League");

                    b.Navigation("SportsClub");
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

            modelBuilder.Entity("Core.Models.Match", b =>
                {
                    b.HasOne("Core.Models.SportsClub", "AwayClub")
                        .WithMany()
                        .HasForeignKey("AwayClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Models.SportsClub", "HomeClub")
                        .WithMany()
                        .HasForeignKey("HomeClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Models.League", null)
                        .WithMany("matches")
                        .HasForeignKey("LeagueId");

                    b.Navigation("AwayClub");

                    b.Navigation("HomeClub");
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

            modelBuilder.Entity("Core.Models.UserClubAccess", b =>
                {
                    b.HasOne("Core.Models.SportsClub", "SportsClub")
                        .WithMany()
                        .HasForeignKey("SportsClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SportsClub");
                });

            modelBuilder.Entity("Core.Models.League", b =>
                {
                    b.Navigation("clubs");

                    b.Navigation("matches");
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
