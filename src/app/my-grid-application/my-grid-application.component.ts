import { Component, OnInit, EventEmitter } from "@angular/core";
import { Response } from "@angular/http";
import { RedComponentComponent } from "../red-component/red-component.component";

import { GridOptions } from "ag-grid/main";
import { GridRowService } from '../myservice.service';
import { GridRow } from '../myRow';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import "ag-grid-enterprise";
import 'xlsx';
import * as XLSX from 'ts-xlsx';
import { AgEditorComponent } from "ag-grid-angular";
import {BootstrapDatePickerComponent} from "./date-picker.component";
import {BootstrapDropdownComponent} from "./dropdown.component";

//import * as $ from "jquery";
//import {jquery} from '../../jquery-typings-custom/index.d';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs: any[];
  defaultColumnDefs: any;
  //columnDefs1: GridRow[] = [];
  rowData: any[];
  counter: number = 0;

  private subscription: Subscription;
  private gridApi;
  private gridColumnApi;
  private headerHeight;

  private rowBuffer;
  private rowSelection;
  private rowModelType;
  private paginationPageSize;
  private cacheOverflowSize;
  private maxConcurrentDatasourceRequests;
  private infiniteInitialRowCount;
  private maxBlocksInCache;
  private cacheBlockSize;

  private pinnedTopRowData;
  private pinnedBottomRowData;
  private excelStyles;
  private floatingFiltersHeight;
  timeoutMy;
  backupGrid;

  constructor(private gridRowService: GridRowService, private http: Http) {
    this.gridOptions = {
     
      defaultExportParams: {
        onlySelected: true
      },
      enableFilter: true,
      onRowValueChanged: this.abc1

    };

    this.columnDefs = [
      {
        headerName: "Make", field: "make", filter: "text", defaultwidth: 400, headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true, "checkboxSelection": true,  pinned: "left"

      },
      { headerName: "Model", field: "model", pinned: "left", cellRendererFramework: RedComponentComponent },
      { headerName: "Price", field: "price", enableCellChangeFlash: true, editable: true , filter: "number"},
      {
        headerName: "Date", field: "date", filter: 'date', 
       
         cellEditorFramework: BootstrapDatePickerComponent,
         editable:true, comparator: dateComparator
      },

      {
        headerName: "landmark", field: "landmark", enableCellChangeFlash: true, 

        filter: "number",
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="../assets/images/loading.gif">';
          }
        }
      },
      { headerName: "country", field: "country",enableCellChangeFlash: true, filter: "text",
    
                cellEditorFramework: BootstrapDropdownComponent,
                cellEditorParams: {
                    fruits: ['India', 'Dubai', 'USA'],
                    vegetables: ['Apple', 'Orange', 'Banana']
  
                },
       },
      { headerName: "state", field: "state" },
      { headerName: "pin code",  field: "pin_code" },
      { headerName: "Price1",  field: "price" , editable: true, 'keypress': this.getNumericCellEditedValue()},
      { headerName: "landmark1",field: "landmark" },
      { headerName: "country1", field: "country" },
      { headerName: "state1", field: "state" },
      { headerName: "Price1", field: "price" }
    

    ];
 
    this.defaultColumnDefs = {
        // set the default column width
        width: 100,
        // make every column editable
        editable: true,
        // make every column use 'text' filter by default
        enableCellChangeFlash: true
    };
    this.gridOptions.enableColResize = true;
    let i = 0;
    for (i = 0; i < 193; i++) {
      // if (i % 8 == 0) {
      //   this.columnDefs.push({
      //     headerName: "Col " + i, field: "price",
      //     cellRenderer: function (params) {
      //       if (params.value !== undefined) {
      //         return params.value;
      //       } else {
      //         return '<img src="../assets/images/loading.gif">';
      //       }
      //     }
      //   });
      // }
      // else 
    //  {
          this.columnDefs.push({ headerName: "Col " + i, field: "price" });
      }
    }

    // this.columnDefs.headerCheckboxSelectionFilteredOnly=true; 
    this.rowBuffer = 0;
    this.rowSelection = "multiple";
    this.rowModelType = "infinite";
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 0;
    this.maxBlocksInCache = 1;
    this.cacheBlockSize= 30;
    this.headerHeight = "15px";
    this.floatingFiltersHeight = 35;

    this.excelStyles = [
      {
        make: "greenBackground",
        interior: {
          color: "#90ee90",
          pattern: "Solid"
        }
      },
      {
        id: "redFont",
        font: {
          underline: "Single",
          italic: true,
          color: "#ff0000"
        }
      },
      {
        id: "darkGreyBackground",
        interior: {
          color: "#888888",
          pattern: "Solid"
        }
      },
      {
        id: "boldBorders",
        borders: {
          borderBottom: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3
          },
          borderLeft: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3
          },
          borderRight: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3
          },
          borderTop: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3
          }
        }
      },
      {
        id: "header",
        interior: {
          color: "#CCCCCC",
          pattern: "Solid"
        }
      },
      {
        id: "twoDecimalPlaces",
        numberFormat: { format: "#,##0.00" }
      },
      {
        id: "textFormat",
        dataType: "string"
      },
      {
        id: "bigHeader",
        font: { size: 25 }
      }
    ];
  }

  ngOnInit() {


  }

  onGridReady(params) {
   // params.api.sizeColumnsToFit();
    this.gridOptions.api = params.api;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    let columnSizeApi = params.columnApi;
    console.log(this.gridOptions.columnApi.getAllColumns());
    let allColumnIds = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.getColId());
    });
    this.http
      .get("http://localhost:8080/mySlvProject/webapi/abc/2?myvar="+this.gridApi.getSortModel().getColId)
      .subscribe(data => {
        console.log('loading data from url');
        this.backupGrid = params;
        let myVar;

        var dataSource = {
          rowCount: null,
          
          getRows: function (params) {
            clearTimeout(this.timeoutMy);
            console.log(data.json().length+' '+params.startRow+'  '+params.endRow);

            this.timeoutMy = setTimeout(function () { 

                    var dataAfterSortingAndFiltering = sortAndFilter(data.json(), params.sortModel, params.filterModel);
              var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          }
        };
        
        params.api.setDatasource(dataSource);
        this.gridApi.refreshInfiniteCache();
        
      });
      
  }

    // getValue(): string {
    //     return this.value;
    // }
  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
  
  exportExcel() {
    var params = {
      // fileName: "myexcel",
      // sheetName: "mysheet"
    };

    var content = this.gridApi.getDataAsExcel(params);
    var workbook = XLSX.read(content, { type: "binary" });
    var xlsxContent = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64"
    });
    this.download(params, xlsxContent);
  }

  autoSizeAllColumns()
  {
      let allColumnIds = [];
      this.gridOptions.columnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.getColId());
       });
      this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
  }

  sizeToFitToColumns()
  {
     this.gridOptions.api.sizeColumnsToFit();
  }

  restGridColumns()
  {
      this.gridOptions.columnApi.resetColumnState();       
  }

  b64toBlob(b64Data, contentType) {
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  download(params, content) {
    var fileNamePresent = params && params.fileName && params.fileName.length !== 0;
    var fileName = fileNamePresent ? params.fileName : "exportedRecords.xlsx";
    var blobObject = this.b64toBlob(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    // if (window.navigator.msSaveOrOpenBlob) {
    // window.navigator.msSaveOrOpenBlob(blobObject, fileName);
    // } else {
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blobObject);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    //  }
  }

  abc1() {

     //alert('abc1');

  }

  getNumericCellEditedValue()
  {
    //this.gridApi.NumericCellEditor(); 
    //alert('getNumericCellEditor');
  }

  getCharCodeFromEvent(event) {
    event = event || window.event;
    return typeof event.which === 'undefined' ? event.keyCode : event.which;
  }

   isKeyPressedNumeric(event) {
    var charCode = this.getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return this.isCharNumeric(charStr);
  }
   isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }

   onBtLast() {
     //alert('1');
    this.gridApi.paginationGoToLastPage(3);
     //alert('2');
  }


    sortByAthleteAsc() {
    var sort = [
      {
        colId: "price",
        sort: "asc"
      }
    ];
    this.gridApi.setSortModel(sort);
    this.gridApi.refreshInfiniteCache();
    //alert(sort);
    console.log(sort);
    console.log( this.gridApi.getSortModel());
  }

  refreshGrid()
  {
    //alert('1');
    this.http
      .get("http://localhost:8080/mySlvProject/webapi/abc/2")
      .subscribe(data => {
        console.log('loading data from url1');
        let myVar;

        var dataSource = {
          rowCount: null,
          
          getRows: function (params) {
            clearTimeout(this.timeoutMy);
            console.log(data.json().length+' '+params.startRow+'  '+params.endRow);

            this.timeoutMy = setTimeout(function () { 

                    var dataAfterSortingAndFiltering = sortAndFilter(data.json(), params.sortModel, params.filterModel);
              var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          }
        };
        
        this.backupGrid.api.setDatasource(dataSource);
        this.gridApi.refreshInfiniteCache();
        
      });
  }
}

function sortAndFilter(allOfTheData, sortModel, filterModel) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel, data) {
  var sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  
  var resultOfSort = data.slice();
  resultOfSort.sort(function(a, b) {
    for (var k = 0; k < sortModel.length; k++) {
      var sortColModel = sortModel[k];
      var valueA = a[sortColModel.colId];
      var valueB = b[sortColModel.colId];
      
      if (valueA == valueB) {
        continue;
      }
      var sortDirection = sortColModel.sort === "asc" ? 1 : -1;

      console.log('date sort '+sortColModel);
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  
  return resultOfSort;
}
function filterData(filterModel, data) {
  var filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  var resultOfFilter = [];

 //alert(filterModel.date);
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (filterModel.price) {
      var price = item.price;
      var allowedAge = parseInt(filterModel.price.filter);
      var allowedAgeTo = parseInt(filterModel.price.filter);

      if (filterModel.price.type == "equals") {
        
        if (price !== allowedAge) {
          
          continue;
        }
      } else if (filterModel.price.type == "notEqual") {       
        if (price == allowedAge) {
          continue;
        }
      }else if (filterModel.price.type == "lessThan") {
        if (price >= allowedAge) {
          continue;
        }
      } else if (filterModel.price.type == "greaterThan") {
        if (price <= allowedAge) {
          continue;
        }     
      } else if (filterModel.price.type == "lessThanOrEqual") {
        
        if (price > allowedAge) {
          continue;
        }     
      }else if (filterModel.price.type == "greaterThanOrEqual") {
        
        if (price < allowedAge) {
          continue;
        }     
      }else if (filterModel.price.type == "inRange") {
        allowedAgeTo = parseInt(filterModel.price.filterTo);
        
        if (price < allowedAge || price > allowedAgeTo) {
          continue;
        }     
      }else {
         if (price >= allowedAge) {
          continue;
        }
      }
    }
    if (filterModel.year) {
      if (filterModel.year.indexOf(item.year.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.country) 
    {
    if(filterModel.country.filterType == "text")
    {
      var tempVar = filterModel.country.filter;
      if (filterModel.country.type == "contains") 
      {
        if(item.country.toString().toUpperCase().indexOf(tempVar.toUpperCase()) === -1)
        {
           continue;
        }     
      }
      else if (filterModel.country.type == "notContains") 
      {
        if(item.country.toString().toUpperCase().indexOf(tempVar.toUpperCase()) !== -1)
        {
           continue;
        }     
      }
      else if (filterModel.country.type == "equals") 
      {
        if(item.country.toString().toUpperCase() !== tempVar.toUpperCase())
        {
           continue;
        }     
      }
      else if (filterModel.country.type == "notEqual") 
      {
        if(item.country.toString().toUpperCase() === tempVar.toUpperCase())
        {
           continue;
        }     
      }
      else if (filterModel.country.type == "startsWith") 
      {
        if(!item.country.toString().toUpperCase().startsWith(tempVar.toUpperCase()))
        {
           continue;
        }     
      }
      else if (filterModel.country.type == "endsWith") 
      {
        if(!item.country.toString().toUpperCase().endsWith(tempVar.toUpperCase()))
        {
           continue;
        }        
      }
    } //country ends

    if (filterModel.date) 
    {
      //alert('in date');
    }
  }
    
    // if (filterModel.country) {
    //   if (filterModel.country.indexOf(item.country) < 0) {
    //     continue;
    //   }
    // }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
}
function dateComparator(date1, date2) {
  //alert('1');
  var date1Number = monthToComparableNumber(date1);
  var date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}
function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);
  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return result;
}