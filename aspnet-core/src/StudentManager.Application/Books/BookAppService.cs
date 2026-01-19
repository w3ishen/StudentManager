using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace StudentManager.Books;
// BookAppService is inheriting from ABP built-in CRUD service
// ABP automatically generate the API endpoints
public class BookAppService
    : CrudAppService<Book, BookDto, int, PagedAndSortedResultRequestDto, CreateUpdateBookDto>
{
    // Tells the ABP to give me the repository that manages the Book entities
    public BookAppService(IRepository<Book, int> repository)
        : base(repository)
    {
    }

    protected override Book MapToEntity(CreateUpdateBookDto input)
    {
        return new Book
        {
            Title = input.Title,
            Author = input.Author
        };
    }

    protected override void MapToEntity(CreateUpdateBookDto input, Book entity)
    {
        entity.Title = input.Title;
        entity.Author = input.Author;
    }

    protected override BookDto MapToGetOutputDto(Book entity)
    {
        return new BookDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Author = entity.Author
        };
    }

    protected override BookDto MapToGetListOutputDto(Book entity)
    {
        return new BookDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Author = entity.Author
        };
    }
}