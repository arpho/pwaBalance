import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentsModel } from '../../models/paymentModel';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';

@Component({
  selector: 'app-pagamenti',
  templateUrl: './pagamenti.page.html',
  styleUrls: ['./pagamenti.page.scss'],
})
export class PagamentiPage implements OnInit {
  public filterLabel0: String = 'filtra nome';
  public filterLabel1: String = ' filtra nota';
  public paymentsList = Array<PaymentsModel>();
  public filterFields: any;


  public filterFunction: (item: ItemModelInterface) => Boolean;
  constructor(public payments: PaymentsService) {
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Filtra per agamento',
        // value: 'Bombasto',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'filtra per note',
        // value: 'Bombasto',
        order: 2
      })
    ];
  }



  filter(event) {
    const filterTitle = event.title ?
      (item: ItemModelInterface) => item.title.toLowerCase().indexOf(event.title.toLowerCase()) !== -1 :
      (item: ItemModelInterface) => true; // se non filtro il campo title prendo tutto
    const filterNote = event.note ? (item: ItemModelInterface) => item.note.toLowerCase().indexOf(event.note.toLowerCase()) !== -1 :
      (item: ItemModelInterface) => true;
    const out = (item: ItemModelInterface) => filterNote(item) && filterTitle(item);
    return out;
  }

  ngOnInit() {
    if (this.payments.getEntitiesList()) {
      this.payments.getEntitiesList().on('value', eventCategoriesListSnapshot => {

        this.paymentsList = [];
        eventCategoriesListSnapshot.forEach(snap => {
          const payment = new PaymentsModel();
          payment.load(snap.key, this.payments);
          this.paymentsList.push(payment);
        });
      });
    }
  }

}
