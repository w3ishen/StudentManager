using Volo.Abp.Domain.Repositories;
using Volo.Abp.Application.Services;

namespace StudentManager.Students;

public class StudentAppService
    : CrudAppService<Student, StudentDto, int, Volo.Abp.Application.Dtos.PagedAndSortedResultRequestDto, CreateUpdateStudentDto>,
        IStudentAppService
{
    private readonly StudentManagerApplicationMappers _mappers;

    public StudentAppService(
        IRepository<Student, int> repository,
        StudentManagerApplicationMappers mappers)
        : base(repository)
    {
        _mappers = mappers;
    }

    protected override Student MapToEntity(CreateUpdateStudentDto createInput)
    {
        return _mappers.Map(createInput);
    }

    protected override void MapToEntity(CreateUpdateStudentDto updateInput, Student entity)
    {
        _mappers.Map(updateInput, entity);
    }

    protected override StudentDto MapToGetOutputDto(Student entity)
    {
        return _mappers.Map(entity);
    }

    protected override StudentDto MapToGetListOutputDto(Student entity)
    {
        return _mappers.Map(entity);
    }
}
