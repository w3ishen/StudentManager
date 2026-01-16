using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StudentManager.EntityFrameworkCore;

namespace StudentManager.Data;

public sealed class StudentsIdentityReseedHostedService : IHostedService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public StudentsIdentityReseedHostedService(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = _serviceScopeFactory.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<StudentManagerDbContext>();

        if (!dbContext.Database.IsSqlServer())
        {
            return;
        }

        var hasAnyStudents = await dbContext.Students.AsNoTracking().AnyAsync(cancellationToken);
        if (!hasAnyStudents)
        {
            // Reseed an EMPTY table so the next inserted Id starts from 1.
            await dbContext.Database.ExecuteSqlRawAsync(
                "DBCC CHECKIDENT ('[dbo].[Students]', RESEED, 0);",
                cancellationToken
            );
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
