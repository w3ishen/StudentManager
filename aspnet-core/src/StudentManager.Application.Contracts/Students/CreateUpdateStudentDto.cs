using System.ComponentModel.DataAnnotations;

namespace StudentManager.Students;

public class CreateUpdateStudentDto
{
    [Required]
    [StringLength(128)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(128)]
    public string Course { get; set; } = string.Empty;

    [Required]
    public StudyMode StudyMode { get; set; }

    [Required]
    [StringLength(128)]
    public string CountryOfOrigin { get; set; } = string.Empty;
}
