namespace Infrastructure.Interfaces
{
    public interface IMatchService
    {
        Task GenerateAllMatchesForLeague(Guid leagueId);
    }
}
