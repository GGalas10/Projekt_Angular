using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations.DataDb
{
    /// <inheritdoc />
    public partial class ChangeLeagueRelation_AddMatches : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LeagueClubAccesses");

            migrationBuilder.CreateTable(
                name: "ClubStatistic",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClubId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SportsClubId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LeagueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GoalsFor = table.Column<int>(type: "int", nullable: false),
                    GoalsAganist = table.Column<int>(type: "int", nullable: false),
                    ClubAssist = table.Column<int>(type: "int", nullable: false),
                    Played = table.Column<int>(type: "int", nullable: false),
                    Won = table.Column<int>(type: "int", nullable: false),
                    Drawn = table.Column<int>(type: "int", nullable: false),
                    Lost = table.Column<int>(type: "int", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClubStatistic", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClubStatistic_Leagues_LeagueId",
                        column: x => x.LeagueId,
                        principalTable: "Leagues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ClubStatistic_SportsClubs_SportsClubId",
                        column: x => x.SportsClubId,
                        principalTable: "SportsClubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HomeClubId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AwayClubId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HomeClubGoals = table.Column<int>(type: "int", nullable: false),
                    AwayClubGoals = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    LeagueId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matches_Leagues_LeagueId",
                        column: x => x.LeagueId,
                        principalTable: "Leagues",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Matches_SportsClubs_AwayClubId",
                        column: x => x.AwayClubId,
                        principalTable: "SportsClubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Matches_SportsClubs_HomeClubId",
                        column: x => x.HomeClubId,
                        principalTable: "SportsClubs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClubStatistic_LeagueId",
                table: "ClubStatistic",
                column: "LeagueId");

            migrationBuilder.CreateIndex(
                name: "IX_ClubStatistic_SportsClubId",
                table: "ClubStatistic",
                column: "SportsClubId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_AwayClubId",
                table: "Matches",
                column: "AwayClubId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_HomeClubId",
                table: "Matches",
                column: "HomeClubId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_LeagueId",
                table: "Matches",
                column: "LeagueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClubStatistic");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.CreateTable(
                name: "LeagueClubAccesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClubId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LeagueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeagueClubAccesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeagueClubAccesses_Leagues_LeagueId",
                        column: x => x.LeagueId,
                        principalTable: "Leagues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LeagueClubAccesses_LeagueId",
                table: "LeagueClubAccesses",
                column: "LeagueId");
        }
    }
}
