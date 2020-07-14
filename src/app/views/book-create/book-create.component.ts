import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  bookId: number;
  isShowSuccess = false;
  message: string;

  bookform: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.id;
      this.bookService.getById(this.bookId).subscribe(result => {
        this.bookform.setValue(result);
      });
    });
  }
  onSubmit(): void{
    if (!this.bookId){
      this.bookService.createBook(this.bookform.value).subscribe(result => {
        this.isShowSuccess = true;
        this.message = 'Created new book!';
        this.bookService.shouldRefresh.next('Do sth');
      });
    } else {
      this.isShowSuccess = false;
      this.message = 'Cant create new book!';
    }
  }
}
