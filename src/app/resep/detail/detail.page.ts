import { Component, OnInit } from '@angular/core';
import { Resep } from '../resep.model';
import { ResepService } from '../resep.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadedResep: Resep;
  constructor(private activatedRoute: ActivatedRoute,
    private resepSvc:ResepService,
    private router:Router,
    public alertController:AlertController,
    public toastController: ToastController) {

   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap =>{
        if(!paramMap.has('resepId')){return;}
        this.loadedResep = this.resepSvc.getResep(paramMap.get('resepId'));
      }
    );
  }
  deleteResep(){
    this.resepSvc.deleteResep(this.loadedResep.id);
    this.router.navigate(['/resep']);
    this.presentToast();
  }
  async presentAlert(){
    const alert = await this.alertController.create({
        header:'Delete Resep',
        message:'Are you sure want to delete this resep?',
        buttons:[
          {
            text:'Delete',
            handler:() =>this.deleteResep()
          },
          {
            text:'Cancel',
            role:'cancel'
          }
        ]
    });
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Recipe has been deleted!',
      duration: 2000
    });
    toast.present();
  }
}
