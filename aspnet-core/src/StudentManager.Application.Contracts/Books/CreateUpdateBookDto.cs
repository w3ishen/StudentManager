namespace StudentManager.Books;
// Used when creating a new book (POST /api/app/book)
// Used when updating a book (PUT /api/app/book/{id})
public class CreateUpdateBookDto
{
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
}