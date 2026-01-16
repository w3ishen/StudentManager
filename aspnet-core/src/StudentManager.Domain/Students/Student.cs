using Volo.Abp.Domain.Entities.Auditing;

namespace StudentManager.Students;

public class Student : AuditedAggregateRoot<int>
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;

    public StudyMode StudyMode { get; set; }

    public string CountryOfOrigin { get; set; } = string.Empty;
}
