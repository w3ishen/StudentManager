using Volo.Abp.Modularity;

namespace StudentManager;

/* Inherit from this class for your domain layer tests. */
public abstract class StudentManagerDomainTestBase<TStartupModule> : StudentManagerTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
