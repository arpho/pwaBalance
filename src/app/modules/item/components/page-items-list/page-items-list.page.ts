import { Component, OnInit, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-page-items-list',
  templateUrl: './page-items-list.page.html',
  styleUrls: ['./page-items-list.page.scss'],
})
export class PageItemsListComponent implements OnInit, OnChanges {
  @Input() items_list: ItemModelInterface[];
  @Input() service: ItemServiceInterface;
  public dummyItem: ItemModelInterface;
  @Input() filterFunction: (item: ItemModelInterface) => boolean;
  public showSpinner = true;

  constructor(public alertCtrl: AlertController) {
    this.filterFunction = (v) => true;
  }

  ngOnInit() {
  }

  async deleteItem(item: ItemModelInterface, slide) {
    slide.close();
    const element = this.service.getDummyItem().getElement();
    const alert = await this.alertCtrl.create({
      message: ` vuoi deavero cancellare quest${element.genere} ${element.element}?(${item.title})`,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Cancella',
          handler: () => {
            this.service.deleteItem(item.key);
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items_list && changes.items_list.currentValue) {
      this.items_list = changes.items_list.currentValue;
      this.showSpinner = false;
    }
    if (changes.filterFunction) {
      this.filterFunction = changes.filterFunction.currentValue;
    }

  }

  countItems() {
    return (this.items_list) ? this.items_list.filter(this.filterFunction).length : 'loading';
  }

  do(item: ItemModelInterface) {
    console.log('to do ');


  }

}
