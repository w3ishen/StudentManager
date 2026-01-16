using StudentManager.Samples;
using Xunit;

namespace StudentManager.EntityFrameworkCore.Applications;

[Collection(StudentManagerTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<StudentManagerEntityFrameworkCoreTestModule>
{

}
