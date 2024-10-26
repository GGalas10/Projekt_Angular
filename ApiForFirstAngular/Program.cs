using ApiForFirstAngular.Middlewares;
using DataAccess.Contexts;
using Infrastructure;
using Infrastructure.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

#region DbContexts
builder.Services.AddDbContext<DataDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DataConnection")
    , x => x.MigrationsAssembly("DataAccess"));
});
builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("UserConnection")
    , x => x.MigrationsAssembly("DataAccess"));
});
#endregion
builder.Services.AddInfrastructureLayer();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyHeader());
});

#region JWT Config
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddCookie().AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateLifetime = true,
        ValidateIssuer = true,
        ValidateAudience = false
    };
    opt.Events = new JwtBearerEvents()
    {
        OnMessageReceived = async context =>
        {
            context.Token = context.Request.Cookies["Bearer"];
            await Task.CompletedTask;
        }
    };
});
#endregion
var app = builder.Build();

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

#region Middlewares
app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<HeaderCheckMiddleware>();
#endregion

app.Run();
