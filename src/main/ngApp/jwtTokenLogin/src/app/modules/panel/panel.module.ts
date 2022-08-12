import { NgModule } from "@angular/core";
import { PanelComponent } from "./views/panel.component";
import { PanelRoutingModule } from "./panel-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        PanelComponent
    ],
    imports: [
        PanelRoutingModule,
        CommonModule
    ],
    exports: [
        PanelComponent
    ]
})
export class PanelModule { }