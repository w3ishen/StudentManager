using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentManager.Data;
using Volo.Abp.DependencyInjection;

namespace StudentManager.EntityFrameworkCore;

public class EntityFrameworkCoreStudentManagerDbSchemaMigrator
    : IStudentManagerDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreStudentManagerDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the StudentManagerDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        var dbContext = _serviceProvider.GetRequiredService<StudentManagerDbContext>();

        await dbContext.Database.MigrateAsync();

        await TryReseedStudentsIdentityAsync(dbContext);
    }

    private static async Task TryReseedStudentsIdentityAsync(StudentManagerDbContext dbContext)
    {
        if (!dbContext.Database.IsSqlServer())
        {
            return;
        }

        // If you've been inserting test data then deleting it, SQL Server will keep the identity value.
        // Reseeding an EMPTY table makes the next inserted Id start from 1 again.
        var hasAnyStudents = await dbContext.Students.AsNoTracking().AnyAsync();
        if (!hasAnyStudents)
        {
            await dbContext.Database.ExecuteSqlRawAsync(
                "DBCC CHECKIDENT ('[dbo].[Students]', RESEED, 0);"
            );
        }
    }
}
