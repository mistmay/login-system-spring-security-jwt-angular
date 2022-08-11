import { Component } from "@angular/core";

@Component({
    selector: 'app-panel',
    template: `
    <section class="p-5">
        <div class="container p-5 bg-white rounded border border-secondary">
            <p>Benvenuto</p>
        </div>
    </section>
    `,
    styles: [`
    `]
})
export class PanelComponent {
    constructor() { }

}