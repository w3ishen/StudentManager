using Volo.Abp.Application.Dtos;

namespace StudentManager.Books;

public class BookDto : EntityDto<int>
{
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
}
