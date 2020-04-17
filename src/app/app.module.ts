import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoCommentComponent } from './no-comment/no-comment.component';
import { InputTextComponent } from './input-text/input-text.component';
import { HeaderComponent } from './header/header.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { ButtonComponent } from './input-textarea/button/button.component';
import { CommentConfirmationComponent } from './comment-confirmation/comment-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NoCommentComponent,
    InputTextComponent,
    HeaderComponent,
    InputTextareaComponent,
    ButtonComponent,
    CommentConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
