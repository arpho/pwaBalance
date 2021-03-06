import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { CategoryModel } from '../../models/CategoryModel';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements ItemServiceInterface {
  public categoriesListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.categoriesListRef = firebase.database().ref(`/categorie/${user.uid}/`);
      }
    });

  }

  getDummyItem() {

    return new CategoryModel();
  }

  createCategory(
    eventName: string,
    eventDate: Date,
    eventPrice: number,
    eventCost: number
  ): firebase.database.ThenableReference {
    return this.categoriesListRef.push({
      name: eventName,
      date: eventDate.toDateString(),
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1,
    });
  }
  createItem(item: ItemModelInterface) {
    return this.categoriesListRef.push(item);

  }

  getEntitiesList(): firebase.database.Reference {
    return this.categoriesListRef;
  }


  getItem(prId: string): firebase.database.Reference {
    return this.categoriesListRef.child(prId);
  }

  updateItem(item: ItemModelInterface) {
    return this.categoriesListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.categoriesListRef.child(key).remove();
  }

}
