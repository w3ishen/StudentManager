using StudentManager.Samples;
using Xunit;

namespace StudentManager.EntityFrameworkCore.Domains;

[Collection(StudentManagerTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<StudentManagerEntityFrameworkCoreTestModule>
{

}
