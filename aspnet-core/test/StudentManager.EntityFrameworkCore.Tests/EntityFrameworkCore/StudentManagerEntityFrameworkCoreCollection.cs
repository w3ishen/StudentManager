using Xunit;

namespace StudentManager.EntityFrameworkCore;

[CollectionDefinition(StudentManagerTestConsts.CollectionDefinitionName)]
public class StudentManagerEntityFrameworkCoreCollection : ICollectionFixture<StudentManagerEntityFrameworkCoreFixture>
{

}
