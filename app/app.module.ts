import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import { VoteComponent } from './vote.component';
import { CriteriaComponent } from './criteria.component';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    VoteComponent,
    CriteriaComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
