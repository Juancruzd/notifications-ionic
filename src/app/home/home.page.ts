import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private plt:Platform,private LocalNotification:LocalNotifications,private alertCtrl:AlertController) {
    this.plt.ready().then(()=>{

      ///eventos q toman o cachan las notificaciones lanzadas

      //toma de la notificacion los datos
        //titulo,texto y la data
      this.LocalNotification.on('click').subscribe(res=>{ 
        ///muestra los datos en una notificacion
        this.showalert(res.title,res.text,res.data.mydata);
      });
      //toma de la notificacion los datos
        //titulo,texto y la data
      this.LocalNotification.on('trigger').subscribe(res=>{  
        ///muestra los datos en una notificacion
        this.showalert(res.title,res.text,res.data.mydata);
      });
    });
  }
  
  //funcion notificacion programada a los 5 s
  notificacionprogramada(){
    this.LocalNotification.schedule({
            id: 1,  
            title: "Notificacion programada",
            text: "Notificacion a los 5s de ejecutarse",
            data: { mydata:"Notification1" },
            ///a los 5s se muestra
            trigger:{in:5,unit:ELocalNotificationTriggerUnit.SECOND}
    });
  }
  //funcion notificacion recurrente cada min
  notificacionrecurrente(){
    this.LocalNotification.schedule({
            id: 2,  
            title: "Notificacion recurrente",
            text: "This is a message",
            data: { mydata:"Notification2" },
            ///cada minuto
            trigger:{every:ELocalNotificationTriggerUnit.MINUTE}
    });
  }
  //funcion notificacion se mostrara cada 11 hrs con 59 mins
  notificaciondiaria(){
    this.LocalNotification.schedule({
            id: 3,  
            title: "notificacion diaria",
            text: "This is a message",
            data: { mydata:"Notification3" },
            ///se mostrara cada 11 hrs con 59 mins
            trigger:{every:{hour:11,minute:59}}
    });
  }

  ///funcion para mostrar alerta
  async  showalert(title,message,subHeader){
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
