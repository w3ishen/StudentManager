using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace StudentManager.Data;

/* This is used if database provider does't define
 * IStudentManagerDbSchemaMigrator implementation.
 */
public class NullStudentManagerDbSchemaMigrator : IStudentManagerDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
