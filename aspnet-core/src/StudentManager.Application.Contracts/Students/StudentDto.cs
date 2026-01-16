using Volo.Abp.Application.Dtos;

namespace StudentManager.Students;

public class StudentDto : AuditedEntityDto<int>
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;
    public StudyMode StudyMode { get; set; }
    public string CountryOfOrigin { get; set; } = string.Empty;
}
