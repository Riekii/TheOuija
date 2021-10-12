import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore
    ) {}

  // private database = 'https://ouija-c202e-default-rtdb.europe-west1.firebasedatabase.app/ouija-c202e.json?';
  private nombres = 'nombres';
  private apellidos = 'apellidos';

  public crearNombre(nombre, sexo) {
    let data = {nombre: nombre,sexo: sexo};
    return this.firestore.collection(this.nombres).add(data);
  }
  public crearApellido(apellido) {
    let data = {apellido: apellido};
    return this.firestore.collection(this.apellidos).add(data);
  }
}
