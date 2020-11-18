import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewrecordPage } from './newrecord.page';

describe('NewrecordPage', () => {
  let component: NewrecordPage;
  let fixture: ComponentFixture<NewrecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewrecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
