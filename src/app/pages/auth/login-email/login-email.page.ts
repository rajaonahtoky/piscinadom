import { Component, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage {
  formGroup: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  credentials = {
    email: '',
    password: ''
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'L\'adresse email est requise.' },
      { type: 'pattern', message: 'email invalide' }
    ],
    'password': [
      { type: 'required', message: 'Le mot de passe est requis.' },
      { type: 'minlength', message: 'au moins 6 caractères' }
    ]
  };

  submit_errors = [
    {
      enUS: 'There is no user record corresponding to this identifier. The user may have been deleted.',
      frFR: 'Utilisateur non identifié'
    },
    {
      enUS: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
      frFR: 'Problème de réseau'
    },
    {
      enUS: 'The password is invalid or the user does not have a password.',
      frFR: 'Mot de passe invalide'
    }
  ];

  unknownError = {
    frFR: 'Une erreur inattendue s\'est produite. Veuillez recommencer.'
  }

  constructor(
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService,
    public menu: MenuController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
  ) {
    this.authRedirectResult = this.authService.getRedirectResult()
    .subscribe(result => {
      if (result.user)
        this.redirectAuthenticatedUser();
      else if (result.error)
        this.treatError(result.error);
    });
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  treatError(error) {
    let findError = false;

    for (let i = 0; i < this.submit_errors.length; ++i) {
      if (error.message === this.submit_errors[i]['enUS']) {
        this.submitError = this.submit_errors[i]['frFR'];
        findError = true;
        break;
      }
    }

    if (!findError) {
      this.submitError = this.unknownError['frFR'];
    }
  }

  redirectAuthenticatedUser() {
    this.ngZone.run(() => {
      this.submitError = '';
      this.credentials.password = '';
      this.authService.isAuthenticated.next(true);
      this.router.navigateByUrl('/tabs/home');
    });
  }

  async signInWithEmail() {
    const loading = await this.loadingController.create({ cssClass: 'loading' });
    await loading.present();

    this.authService.signInWithEmail(this.formGroup.value)
    .then(async (user) => {
      await loading.dismiss();
      this.redirectAuthenticatedUser();
    })
    .catch(async (error) => {
      await loading.dismiss();
      this.treatError(error);
    });
  }

  redirectLoggedUserToHomePage() {
    this.ngZone.run(() => {
      this.router.navigate(['/tabs/home']);
    });
  }

}
