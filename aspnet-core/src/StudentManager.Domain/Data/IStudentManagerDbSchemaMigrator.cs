using System.Threading.Tasks;

namespace StudentManager.Data;

public interface IStudentManagerDbSchemaMigrator
{
    Task MigrateAsync();
}
