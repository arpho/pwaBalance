

import { FirebaseObject } from './firebaseObject';
import { ItemModelInterface, Genere } from '../modules/item/models/itemModelInterface';
import { Value } from '../modules/item/models/value';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { ItemFilterOPtions } from '../modules/item/models/ItemFIlterOptions';
import { Item } from '@ionic/angular';
import { GeneratedFile } from '@angular/compiler';
export class CategoryModel implements FirebaseObject, ItemModelInterface {
    key: string;
    title: string;
    service: any;
    note: string;
    constructor() {
    }
    load(key, service) {
        service.getItem(key).on('value', cat => {
            this.title = cat.val().title;
            this.key = key;
        });
    }

    getFilterParams() {
        const out: ItemFilterOPtions = new ItemFilterOPtions('categoria', 'text');
        return [out];
    }

    getElement() {
        const genere: Genere = 'a';
        return { element: 'categoria', genere: genere };
    }
    getTitle() {
        const value = new Value();
        value.label = 'categoria';
        value.value = this.title;
        return value;
    }

    getEditPopup(item: ItemModelInterface, service: ItemServiceInterface) {

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'categoria',
                    value: item.title,
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        item.title = data.title;
                        service.updateItem(item);
                    },
                },
            ],
        };
    }

    getCreatePopup(service: ItemServiceInterface) {
        const item = new CategoryModel();

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'categoria',
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        item.title = data.title;
                        service.updateItem(item);
                    },
                },
            ],
        };
    }

    getFilterPopup(next) {

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'cerca categoria',
                    value: 'test filter',
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        console.log('popup');
                        const filterFunction = (item: ItemModelInterface) => {
                            return this.title.toLowerCase().indexOf(data[0]) > -1;
                        };
                        next(filterFunction);
                    },
                },
            ],
        };
    }


    getNote() {
        const value = new Value();
        value.label = 'occorrenze';
        value.value = '';
        return value;
    }

    aggregateAction() { }

    getValue2() {
        const value = new Value();
        return value;
    }

    getValue3() {
        const value = new Value();
        return value;
    }

    showDetail() {

    }

    getValue4() {
        const value = new Value();
        return value;
    }

    getAggregate() {
        const value = new Value();
        value.label = 'spesa complessiva';
        value.value = ' to be implented';
        return value;
    }


    serialize() {
        return { key: this.key, title: this.title };
    }

}
