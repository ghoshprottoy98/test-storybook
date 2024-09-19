import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EasygridComponent } from "./easygrid.component";
import { CommonModule } from "@angular/common";
import { EasyGridModule } from "../shared/easy-grid/src/public-api";


@NgModule({
    declarations: [
     EasygridComponent
    ],
      imports: [
          CommonModule,
          RouterModule.forChild([{path: '', component: EasygridComponent}]),
          EasyGridModule,
      ],
      exports: []
  })
  export class EasygridModule {
  }
  