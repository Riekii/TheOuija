import { ChangeDetectorRef, Component } from '@angular/core';
import { SpeechRecognition, SpeechRecognitionListeningOptions } from '@ionic-native/speech-recognition/ngx';
import { enviarDatos } from './editarCampos/enviarDatos';
import { Storage } from '@ionic/storage-angular';
import { database } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public reconociendo;
  public reconocido;
  public reconocidoString: string;
  public respuesta: any;
  
  public topstring: string;


  constructor(
    private speechRecognition: SpeechRecognition,
    private change: ChangeDetectorRef,
    private enviardatos: enviarDatos,
    private storage: Storage
  ) {}

  async ngOnInit(){
    this.reconociendo = false;
    this.animacionInicial();
    this.reconocimientoVoz(true);

    await this.storage.create();
    this.topstring = 'Pulsa para hablar';
  }

  // Animación del icono
  animacionInicial(){
    let glass = document.getElementById('glass');
    let top = document.getElementById('topText');
    let bottom = document.getElementById('bottomText');
    let fantext = document.getElementById('fantasmaText');
    setTimeout(() => {
      glass.style.marginTop = "30vh";
      glass.style.fontSize = "10em";
    }, 500);
    setTimeout(() => {
      top.style.opacity = "1";
      bottom.style.opacity = "1";
      fantext.style.opacity = "1";
    }, 1500);
  }

  // Reconocimiento de voz (Permisos)
  reconocimientoVoz(start){
    if(start){
      this.pedirVoz()
    }
  }
  comprobarVoz(){
    let permission = false
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => 
    {permission = hasPermission}
    )
    return permission;
  }
  pedirVoz(){
    this.speechRecognition.requestPermission()
  }

  // Comienza el reconocimiento de voz
  cambiarReconociendo(){
    if(this.reconociendo === true){
      this.cambiaColor('grey')
      this.stop()
    }
    else{ 
      this.reconocidoString = undefined;
      this.reconociendo = true; 
      this.reconocer()
      this.cambiaColor('red')
    }
  }
  // Parar de escuchar
  async stop(){
    this.reconociendo = false;
    // let frase = ["envia", "manu", "hombre"];
    await this.enviarFrase(this.reconocido);
    this.reconocidoString = this.reconocido.toString();
    this.change.detectChanges();
  }
  // Reconocimiento de voz en sí
  reconocer(){
    let options = {
      showPopup: false
    }
    return this.speechRecognition.startListening(options)
      .subscribe(
        (matches: Array<string>) => {
          this.reconocido = matches[0];
          this.cambiarReconociendo()
        }
      )
  }

  // Envia la palabra para su reconocimiento
  async enviarFrase(frase){
    let fraseArray = frase.split(" ")
    this.enviardatos.recogerFrase(fraseArray).then(data => {
      this.respuesta = data;
      this.desarrollo(this.respuesta);
      this.change.detectChanges();
    });
    return this.respuesta;
  }

  // Animacion desarrollo
  desarrollo(inter){
    console.log(inter)
    if(inter === true){
      this.topstring = 'Modo desarrollador activado';
      // Animaciones
      document.getElementById('topText').classList.add('desarrollo');
      document.getElementById('glass').classList.add('enviado');
      setTimeout(() => {
        document.getElementById('glass').classList.remove('enviado');
      }, 800);
      this.respuesta = 'Dato enviado';
    }
    else if(inter === false){
      document.getElementById('topText').classList.add('desarrollo');
      this.topstring = 'Modo desarrollador activado';
      this.respuesta = 'Dato fallido';
    }
    else{
      document.getElementById('topText').classList.remove('desarrollo');
      this.topstring = 'Pulsa para hablar';
    }
  }
  

  // Cambia el color de la señal
  cambiaColor(color){
    let glass = document.getElementById('glass');
    glass.style.color = color;
  }

}