import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { GeoLocalizeComponent } from './components/geo-localize/geo-localize.component';
import { AgmComponent } from './components/agm/agm.component';
import { DistanceSorterPipe } from './pipes/distance-sorter.pipe';
import { GeoService } from './services/geo-service';
import {configs} from '../../configs/configs';

@NgModule({
  declarations: [
    GeoLocalizeComponent,
    AgmComponent,
    DistanceSorterPipe],
  imports: [
    CommonModule,


    IonicModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: configs.google.api_key
    })
  ],
  exports: [GeoLocalizeComponent, AgmComponent, DistanceSorterPipe],

})
export class GeoLocationModule { }
