using Volo.Abp.Modularity;

namespace StudentManager;

public abstract class StudentManagerApplicationTestBase<TStartupModule> : StudentManagerTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
