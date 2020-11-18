import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateprojectPage } from './createproject.page';

describe('CreateprojectPage', () => {
  let component: CreateprojectPage;
  let fixture: ComponentFixture<CreateprojectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateprojectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateprojectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
