import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletedprojectsPage } from './completedprojects.page';

describe('CompletedprojectsPage', () => {
  let component: CompletedprojectsPage;
  let fixture: ComponentFixture<CompletedprojectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedprojectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedprojectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
