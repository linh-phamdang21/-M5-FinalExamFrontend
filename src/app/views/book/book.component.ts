import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/Book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService) { }
  books: Book[] = [];
  bookQuantity: number;
  ngOnInit(): void {
    this.getAll();
    this.bookService.shouldRefresh.subscribe(result => {
      this.getAll();
      console.log(result);
    });
  }
  getAll(): void{
    this.bookService.getAll().subscribe((result) => {
      this.books = result;
      this.bookQuantity= this.books.length;
    }, error => {
    });
  }

  onDelete(id: number): void{
    if (confirm("Are you sure you want to delete this book?")){
      this.bookService.deleteBook(id).subscribe(() => {
        this.bookService.shouldRefresh.next();
      });
    }
  }
}
