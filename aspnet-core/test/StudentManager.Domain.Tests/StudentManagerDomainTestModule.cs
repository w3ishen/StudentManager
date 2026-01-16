using Volo.Abp.Modularity;

namespace StudentManager;

[DependsOn(
    typeof(StudentManagerDomainModule),
    typeof(StudentManagerTestBaseModule)
)]
public class StudentManagerDomainTestModule : AbpModule
{

}
