import { Injectable } from '@angular/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

import  '../../../environments/listas/listaEnvios';
import  '../../../environments/listas/listaPreguntas';
import { como, cuando, donde, porque, que } from '../../../environments/listas/listaPreguntas';


@Injectable({
    providedIn: 'root'
  })

export class enviarPregunta {
    constructor(
        public firebase: FirebaseService,
        private store: Storage
    ){}

    analizarPregunta(frase){
        let respuesta = "Error";
        if(que.includes(frase[0])){respuesta = "que cosa"};
        if(cuando.includes(frase[0])){respuesta = "cuando cosa"};
        if(donde.includes(frase[0])){respuesta = "donde cosa"};
        if(como.includes(frase[0])){respuesta = "como cosa"};
        if(porque.includes(frase[0])){respuesta = "porque cosa"};
        return respuesta.split(" ");
    }
}
