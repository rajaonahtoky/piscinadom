import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntretienPage } from './entretien.page';

describe('EntretienPage', () => {
  let component: EntretienPage;
  let fixture: ComponentFixture<EntretienPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntretienPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntretienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
