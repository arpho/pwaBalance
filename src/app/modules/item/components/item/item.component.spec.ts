import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { FilterItemsPipe } from '../../pipes/filter-items.pipe';
import { MyItemModule } from './item.component';
import { ItemModule } from '../../item.module';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

describe('MyItemModule', () => {
  let component: MyItemModule;
  let fixture: ComponentFixture<MyItemModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [IonicModule.forRoot(), ItemModule],
      providers: [NavController, Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/my/app' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyItemModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
