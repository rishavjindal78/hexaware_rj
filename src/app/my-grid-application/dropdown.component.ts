import {Component, ViewChildren, ViewContainerRef, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import {ICellEditorAngularComp} from "ag-grid-angular/main";

@Component({
    selector: 'date-editor-cell',
    template: `
<div class="btn-group"  dropdown >
   <button dropdownToggle type="button" class="btn btn-primary ">
     <font class="dropStyle">Select Country</font><span class="caret"></span>
   </button>
  <ul *dropdownMenu class="dropdown-menu" role="menu">
  <font class="dropStyle">
    <li *ngFor="let fruit of fruits" >
        <a #option [attr.id]="fruit"  class="dropdown-item" href="#" (click)="onClick(fruit)">
        
        {{fruit}}
     
        </a>
    </li>
    </font>
  </ul>
</div>

    `,
    styleUrls: ['./my-grid-application.component.css']
})

export class BootstrapDropdownComponent implements ICellEditorAngularComp {
    private params: any;

    private fruits: string[];
    private vegetables: string[];


    private selectedIndex: number = 0;

    @ViewChildren('option', {read: ViewContainerRef}) public optionsQueryList;
    private allOptions: any[];

    private allItems: any[];

    agInit(params: any): void {
        this.params = params;

        this.fruits = this.params.fruits;
        
        this.vegetables = this.params.vegetables;

        this.allItems = this.fruits.concat(this.vegetables);

        if (this.params.value) {
            this.selectedIndex = this.allItems.findIndex((item) => {
                return item === this.params.value;
            });
        }
        //alert(this.selectedIndex);
    }

    ngAfterViewInit() {
       // this.optionsQueryList = ['India', 'Dubai', 'USA'];
        this.allOptions = this.optionsQueryList.toArray();
         this.allOptions = ['India', 'Dubai', 'USA'];

        this.focusOnSelectedIndex();
    }

    private focusOnSelectedIndex() {
                console.log(this.allOptions[this.selectedIndex]);
        //this.allOptions[this.selectedIndex].element.nativeElement.focus();
         this.allOptions[this.selectedIndex].focus();
    }

    getValue(): any {
        return this.allItems[this.selectedIndex];
    }

    isPopup(): boolean {
        return true;
    }

    onClick(selection: any) {
        this.selectedIndex = this.allItems.findIndex((item) => {
            return item === selection;
        });
        this.params.api.stopEditing();
    }

    // although ng2-bootstrap offers keyboard nav built in, if we don't manage it here then the grid will stop editing on
    // keypress even if stopPropagation due to the order of events and directives
    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if (key === 38 || key === 40) {
            event.preventDefault();
            event.stopPropagation();

            if (key == 38) {            // up
                this.selectedIndex = this.selectedIndex === 0 ? (this.allItems.length - 1) : this.selectedIndex - 1;
            } else if (key == 40) {     // down
                this.selectedIndex = (this.selectedIndex === this.allItems.length - 1) ? 0 : this.selectedIndex + 1;
            }
            this.focusOnSelectedIndex();
        }
    }
}