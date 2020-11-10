# Piscinadom

## Auth 
email: johndoe@mail.com mdp: superpass

## capacitor-firebase  install
npm install --save capacitor-firebase-auth

Android: 
1. app.component.ts 
initializeApp() {
    firebase.initializeApp(environment.firebase);
}

2. dans MainActivity
add =>  add(CapacitorFirebaseAuth.class);

// Initializes the Bridge
this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
  // Additional plugins you've installed go here
  // Ex: add(TotallyAwesomePlugin.class);
  add(CapacitorFirebaseAuth.class);
  
}});

## angular firebase 
npm install firebase @angular/fire

## apple capactiro signin
npm i https://github.com/rlfrahm/capacitor-apple-login


## debeug android device
use jetifier for patching plugins that have not been updated to AndroidX
npm install jetifier
npx jetify
npx cap sync android