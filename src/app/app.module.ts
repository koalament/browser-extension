import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoCommentComponent } from './no-comment/no-comment.component';
import { InputTextComponent } from './input-text/input-text.component';
import { HeaderComponent } from './header/header.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    NoCommentComponent,
    InputTextComponent,
    HeaderComponent,
    InputTextareaComponent
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