import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ShoppingItem } from './shopping-item';

/**
 * Damit die Requests erfolgreich sind, müssen im Backend die CrossOrigins auf die URL des Frontends angepasst werden
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080';

  getItems(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.baseUrl + '/items');
  }

  deleteItem(id: number): Observable<ShoppingItem> {
    let header = new HttpHeaders();
    header.set('content-type', 'application/json');
    return this.http.delete<ShoppingItem>(this.baseUrl + '/items/' + id, {headers: header});
  }

  addItemPost(item: Object): Observable<ShoppingItem> {
    let header = new HttpHeaders();
    header.set('content-type', 'application/json');
    return this.http.post<ShoppingItem>(this.baseUrl + '/items', item, {headers: header});
  }
}
