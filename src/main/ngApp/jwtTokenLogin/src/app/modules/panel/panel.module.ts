import { NgModule } from "@angular/core";
import { PanelComponent } from "./views/panel.component";
import { PanelRoutingModule } from "./panel-routing.module";

@NgModule({
    declarations: [
        PanelComponent
    ],
    imports: [
        PanelRoutingModule
    ],
    exports: [
        PanelComponent
    ]
})
export class PanelModule { }