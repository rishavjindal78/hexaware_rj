import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { GridRow } from './myRow';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GridRowService 
{
  emitter  = new Subject<any>();
  rowsChanged = new Subject<GridRow[]>();
  private gridUrl = 'http://localhost:8080/MySlvProject/webapi/abc/2';  

  constructor(private http: Http) { }

  getMyRows() {
    return this.http.get(this.gridUrl);

  }

}


