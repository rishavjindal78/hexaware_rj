import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
// import {AgGridModule} from "ag-grid-angular/main";
import {AgGridModule} from "ag-grid-angular";
import {AppComponent} from "./app.component";
import {MyGridApplicationComponent} from "./my-grid-application/my-grid-application.component";
import {RedComponentComponent} from "./red-component/red-component.component";
import { HttpModule }    from '@angular/http';
import {DatepickerModule} from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import {BootstrapDatePickerComponent} from "./my-grid-application/date-picker.component";
import {BootstrapDropdownComponent} from "./my-grid-application/dropdown.component";
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
 //import {HttpClientModule} from '@angular/common/http';
//import { InMemoryDataService }  from './my-grid-application/in-memory-data.service';
import {GridRowService} from './myservice.service';
//import { Datasource } from './my-grid-application/datasource';
//import {ClickStopPropagation} from "./my-grid-application/mydirective";
declare var $: any;
@NgModule({
    declarations: [
        AppComponent,
        MyGridApplicationComponent,
        RedComponentComponent,
        //ClickStopPropagation,
        BootstrapDatePickerComponent,
        BootstrapDropdownComponent
    ],
    imports: [
        BrowserModule,
         HttpModule,
        //  InMemoryWebApiModule.forRoot(InMemoryDataService),
        AgGridModule.withComponents(
            [RedComponentComponent,
            BootstrapDatePickerComponent,
            BootstrapDropdownComponent],          
        ),
        DatepickerModule.forRoot(),
        BsDropdownModule.forRoot()
       
       // HttpClientModule
    ],
    providers: [GridRowService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
