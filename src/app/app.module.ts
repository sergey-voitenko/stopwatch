import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimerFormatterPipe } from './timer/timer-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerFormatterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
