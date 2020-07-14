import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
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
    if (this.bookId){
      this.bookService.updateBook(this.bookform.value).subscribe(result => {
        this.isShowSuccess = true;
        this.message = 'Updated book infomation';
      });
    } else {
      this.isShowSuccess = false;
      this.message = 'Cant update book information!';
    }
  }
}
