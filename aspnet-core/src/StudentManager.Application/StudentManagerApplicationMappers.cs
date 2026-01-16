using Riok.Mapperly.Abstractions;
using StudentManager.Students;

namespace StudentManager;

[Mapper]
public partial class StudentManagerApplicationMappers
{
    public partial StudentDto Map(Student source);

    public partial Student Map(CreateUpdateStudentDto source);

    [MapperIgnoreTarget(nameof(Student.Id))]
    public partial void Map(CreateUpdateStudentDto source, Student target);
}
