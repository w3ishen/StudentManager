using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace StudentManager.Students;

public interface IStudentAppService :
    ICrudAppService<
        StudentDto,
        int,
        PagedAndSortedResultRequestDto,
        CreateUpdateStudentDto>
{
}
