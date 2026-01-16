import { Component } from '@angular/core';
import { RestService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent {
    books: any[] = [];

    constructor(private readonly restService: RestService) {
        this.getBooks();
    }

    getBooks(){
        this.restService.request<any, any>(
            {
                method: 'GET',
                url: '/api/app/book/book',
            },
            { apiName: 'Default' }
        ).subscribe((response) => {
            console.log(response);
            this.books = response.books;
        });
    }
}