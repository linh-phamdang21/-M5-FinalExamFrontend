import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {BookComponent} from "./views/book/book.component";
import {BookCreateComponent} from "./views/book-create/book-create.component";
import {BookDetailComponent} from "./views/book-detail/book-detail.component";
import {BookEditComponent} from "./views/book-edit/book-edit.component";



const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full'},
  { path: 'books', component: BookComponent},
  { path: 'books/create', component: BookCreateComponent},
  { path: 'books/detail/:id', component: BookDetailComponent},
  { path: 'books/edit/:id', component: BookEditComponent}
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, useHash: false
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
