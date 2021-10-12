import { Injectable } from '@angular/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { apellido, desarollo, envio, nombre } from '../../../environments/listas/listaEnvios';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
  })

export class enviarPregunta {
    constructor(
        public firebase: FirebaseService,
        private store: Storage
    ){}

    analizarPregunta(frase){
        return frase;
    }
}
