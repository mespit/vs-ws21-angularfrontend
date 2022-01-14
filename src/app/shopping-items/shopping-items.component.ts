import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../shopping-item/shopping-item';
import { ShoppingItemService } from '../shopping-item/shopping-item.service';


@Component({
  selector: 'app-shopping-items',
  templateUrl: './shopping-items.component.html',
  styleUrls: ['./shopping-items.component.css']
})
export class ShoppingItemsComponent implements OnInit {

  shoppingList: ShoppingItem[] = [];
  selectedItem?: ShoppingItem;

  constructor(private shoppingItemService: ShoppingItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  onSelect(item: ShoppingItem): void {
    this.selectedItem = item;
  }

  getItems(): void {
    this.shoppingItemService.getItems()
        .subscribe(shoppingList => this.shoppingList = shoppingList);
  }

  deleteItem(id: number): void {
    var response: ShoppingItem;
    this.shoppingItemService.deleteItem(id).subscribe(shoppingItem => {
      response = shoppingItem;
      this.getItems();
    });
  }

  addItem(itemName: string, quantity: string): void {
    var response: ShoppingItem;
    const item = {
      name: itemName,
      quantity: quantity,
      complete: false,
    }
    this.shoppingItemService.addItemPost(item).subscribe(shoppingItem => {
      response = shoppingItem;
      this.getItems();
    });

    (<HTMLInputElement>document.getElementById("item")).value = '';
    (<HTMLInputElement>document.getElementById("quantity")).value = '';
  }
}
