import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <main class="min-vh-100 bg-light">
    <router-outlet></router-outlet>
  </main>
  `,
  styles: [``]
})
export class AppComponent {

}
