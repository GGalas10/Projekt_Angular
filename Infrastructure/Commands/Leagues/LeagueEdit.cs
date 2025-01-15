using Core.Models;

namespace Infrastructure.Commands.Leagues
{
    public class LeagueEdit
    {
        public Guid leagueId {  get; set; }
        public string? name { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public League GetFromModelCommand()
        {
            var commandName = string.IsNullOrEmpty(this.name) ? null : this.name;
            var commandStartAt = this.startDate == null ? DateTime.MinValue : this.startDate.Value;
            var commandEndAt = this.endDate == null ? DateTime.MinValue : this.endDate.Value;
            return League.GetLeagueForEdit(leagueId,commandName, commandStartAt, commandEndAt);
        }
    }
}
