using Volo.Abp.Modularity;

namespace StudentManager;

[DependsOn(
    typeof(StudentManagerApplicationModule),
    typeof(StudentManagerDomainTestModule)
)]
public class StudentManagerApplicationTestModule : AbpModule
{

}
