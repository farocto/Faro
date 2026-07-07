using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Faro.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AccountEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OwnerBusinessId",
                table: "Venues",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "HostBusinessId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserAccounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    BusinessType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    VenueRelationship = table.Column<int>(type: "int", nullable: false),
                    OwnerUserAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Businesses_UserAccounts_OwnerUserAccountId",
                        column: x => x.OwnerUserAccountId,
                        principalTable: "UserAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Venues_OwnerBusinessId",
                table: "Venues",
                column: "OwnerBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_HostBusinessId",
                table: "Events",
                column: "HostBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_OwnerUserAccountId",
                table: "Businesses",
                column: "OwnerUserAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Businesses_HostBusinessId",
                table: "Events",
                column: "HostBusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Venues_Businesses_OwnerBusinessId",
                table: "Venues",
                column: "OwnerBusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Businesses_HostBusinessId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Venues_Businesses_OwnerBusinessId",
                table: "Venues");

            migrationBuilder.DropTable(
                name: "Businesses");

            migrationBuilder.DropTable(
                name: "UserAccounts");

            migrationBuilder.DropIndex(
                name: "IX_Venues_OwnerBusinessId",
                table: "Venues");

            migrationBuilder.DropIndex(
                name: "IX_Events_HostBusinessId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "OwnerBusinessId",
                table: "Venues");

            migrationBuilder.DropColumn(
                name: "HostBusinessId",
                table: "Events");
        }
    }
}
