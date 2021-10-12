import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment} from '../environments/environment';

// Base de datos
import { AngularFireModule } from '@angular/fire';
import { FirebaseService } from './services/firebase.service';
import { AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';

// Storage
import { IonicStorageModule } from '@ionic/storage-angular';

// Datos
import { enviarPregunta } from './home/enviarPregunta/enviarPregunta';
import { enviarDatos } from './home/editarCampos/enviarDatos';

// Speech
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseNV)
  ],
  providers: [
    FirebaseService,
    SpeechRecognition,
    enviarDatos,
    enviarPregunta,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
