using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace StudentManager.Books
{
    public class BookAppService : ApplicationService
    {
        private IRepository<Book, int> _bookRepository;

        public BookAppService(IRepository<Book, int> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<GetAllBookOutput> GetAllBookAsync(GetAllBookInput input)
        {
            var books = await _bookRepository.GetListAsync();

            var bookDtos = new List<BookDto>();

            foreach (var book in books)
            {
                var b = new BookDto
                {
                    Title = book.Title,
                    Author = book.Author,
                };

                bookDtos.Add(b);
            }

            return new GetAllBookOutput() 
            {
                Books = bookDtos
            };
        }   
    }
}
