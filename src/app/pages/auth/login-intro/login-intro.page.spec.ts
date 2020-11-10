import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginIntroPage } from './login-intro.page';

describe('LoginIntroPage', () => {
  let component: LoginIntroPage;
  let fixture: ComponentFixture<LoginIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginIntroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
