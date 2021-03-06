import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SuppliersService } from '../../services/suplliers/suppliers.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { SupplierModel } from 'src/app/models/supplierModel';
import { Router } from '@angular/router';
import { GeoService } from '../../modules/geo-location/services/geo-service';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';


@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori.page.html',
  styleUrls: ['./fornitori.page.scss'],
})
export class FornitoriPage implements OnInit, OnChanges {
  public SuppliersList: Array<SupplierModel>;
  public filterLabel: String = 'Categorie';
  public filterString: string;
  public filterFields: any;
  public filterFunction: (item: SupplierModel) => boolean;
  public position = {};

  constructor(
    public suppliers: SuppliersService,
    public geo: GeoService,
    public router: Router,

  ) {
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Nome del Fornitore',
        // value: 'Bombasto',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        // value: 'Bombasto',
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'venditore online',
        labelTrue: 'venditore fa ecommerce',
        labelFalse: ' venditore tradizionale',
        required: false,
        order: 4
      })
    ];

  }
  filter(filterParams) {
    console.log(filterParams);
    const filterTitle: (item: ItemModelInterface) => boolean = (!filterParams.title) ? (item: ItemModelInterface) => true :
      (item: ItemModelInterface) => item.title.toLocaleLowerCase().indexOf(filterParams.title.toLowerCase()) > -1;
    const filterNote = (!filterParams.note) ? (item: ItemModelInterface) => true :
      (item: ItemModelInterface) => item.note.toLocaleLowerCase().indexOf(filterParams.note.toLowerCase()) > -1;
    this.filterFunction = (item: ItemModelInterface) => filterNote(item) && filterTitle(item);
    const filterEcommerce = (!filterParams.ecommerce) ? (item: ItemModelInterface) => true :
      (item: SupplierModel) => item.ecommerce;
    this.filterFunction = (item: ItemModelInterface) => filterEcommerce(item) && filterNote(item) && filterTitle(item);

  }

  async ngOnInit() {
    this.geo.getPosition().then(coords => {
      this.position = { latitude: coords.coords.latitude, longitude: coords.coords.longitude };
    });
    this.suppliers.getEntitiesList().on('value', eventSuppliersListSnapshot => {
      this.SuppliersList = [];
      eventSuppliersListSnapshot.forEach(snap => {
        const supplier = new SupplierModel();
        supplier.load(snap.key, this.suppliers);
        this.SuppliersList.push(supplier);
      });
    });
  }


  createItem() {
    this.router.navigateByUrl(`${this.suppliers.getDummyItem().getCreatePopup()}`);
    console.log('to do ');


  }

  ngOnChanges(changes: SimpleChanges) {
    this.geo.getPosition().then(coords => {
      this.position = { latitude: coords.coords.latitude, longitude: coords.coords.longitude };
    });

  }

}
