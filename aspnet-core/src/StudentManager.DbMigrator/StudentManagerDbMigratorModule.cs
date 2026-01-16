using StudentManager.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace StudentManager.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(StudentManagerEntityFrameworkCoreModule),
    typeof(StudentManagerApplicationContractsModule)
    )]
public class StudentManagerDbMigratorModule : AbpModule
{
}
