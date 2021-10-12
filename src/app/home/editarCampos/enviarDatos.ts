import { Injectable } from '@angular/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { apellido, desarollo, envio, nombre, usuario } from '../../../environments/listas/listaEnvios';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { enviarPregunta } from '../enviarPregunta/enviarPregunta';

@Injectable({
    providedIn: 'root'
  })
export class enviarDatos {
    constructor(
        public firebase: FirebaseService,
        private store: Storage,
        private enviarpregunta: enviarPregunta
    ){}

    // Recoger frase enviada
    public async recogerFrase(palabra){
      // Almacenamiento
      await this.store.create();
      // Respuesta
      let respuesta: boolean= false;
      // Si activa desarrollo
      if(desarollo.includes(palabra[0])){
        await this.store.set('desarrollador', 'true');
        respuesta = true;
      }
      // Si no activa desarrollo
      if(usuario.includes(palabra[0])){
        await this.store.set('desarrollador', 'false');
        respuesta = false;
      }
      // Si tiene el modo desarrollo activado
      if(await this.store.get('desarrollador') && await this.store.get('desarrollador') === 'true'){
        // Si la palabra es enviar
        if(envio.includes(palabra[0].toLowerCase())){
          // Si envia un nombre
          if(nombre.includes(palabra[1].toLowerCase())){
            this.enviarNombre(palabra[2], palabra[3]);
            respuesta = true;
          }
          // Si envia un apellido
          if(apellido.includes(palabra[1].toLowerCase())){
            this.enviarApellido(palabra[2]);
            respuesta = true;
          }
        }
        console.log('Desarrollador: ',palabra)
        return respuesta;
      }
      else{
        console.log('Usuario: ',palabra);
        return this.enviarPregunta(palabra);
      }
    }

    // Envia la pregunta del usuario
    enviarPregunta(palabra){
      return this.enviarpregunta.analizarPregunta(palabra);
    }

    // ========================================================== //
    //                                                            //
    //                CONEXIÓN CON LA BASE DE DATOS               //
    //                                                            //
    // ========================================================== //


    // Enviar nuevo nombre
    public enviarNombre(nombre, sexo){
        this.firebase.crearNombre(nombre, sexo).then(() => {
        }, (error) => {
          console.error('Error al enviar el nombre', error);
        });
    }
    // Enviar nuevo apellido
    public enviarApellido(apellido){
      this.firebase.crearApellido(apellido).then(() => {
      }, (error) => {
        console.error('Error al enviar el apellido', error);
      });
  }
}