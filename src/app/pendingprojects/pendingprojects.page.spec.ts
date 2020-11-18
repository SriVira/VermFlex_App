import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingprojectsPage } from './pendingprojects.page';

describe('PendingprojectsPage', () => {
  let component: PendingprojectsPage;
  let fixture: ComponentFixture<PendingprojectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingprojectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingprojectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
