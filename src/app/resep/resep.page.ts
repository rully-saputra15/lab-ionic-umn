import { Component, OnInit } from '@angular/core';
import { ResepService } from './resep.service';
import { Resep } from './resep.model';
@Component({
  selector: 'app-resep',
  templateUrl: './resep.page.html',
  styleUrls: ['./resep.page.scss'],
})
export class ResepPage implements OnInit {
  resep: Resep[];
  constructor(private resepService:ResepService) { }

  ngOnInit() {
    this.resep = this.resepService.getAllResep();
  }
  detil(id){
    console.log(this.resepService.getResep(id));
  }
  ionViewWillEnter(){
    this.resep = this.resepService.getAllResep();
  }
  //automatically running
  remove(id){
    this.resep = this.resepService.deleteResep(id);
  }
}
