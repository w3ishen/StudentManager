using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace StudentManager.Books
{
    public class Book : AuditedAggregateRoot<int>
    {
        public string Title { get; set; }

        public string Author { get; set; }
    }
}
