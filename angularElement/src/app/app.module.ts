import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { FrameworkPollComponent } from './framework-poll/framework-poll.component';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

@NgModule({
  declarations: [
    AppComponent,
    FrameworkPollComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    FrameworkPollComponent
  ],
  // bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {
     //const el = createCustomElement(FrameworkPollComponent, { injector: this.injector});
     //if (!customElements.get('framework-poll')) {
      //customElements.define('framework-poll', el);
    //}

    const strategyFactory = new ElementZoneStrategyFactory(FrameworkPollComponent, this.injector);
      const element = createCustomElement(FrameworkPollComponent, { injector: this.injector, strategyFactory });
      customElements.define('framework-poll', element);
  }
}
