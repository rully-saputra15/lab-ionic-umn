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
  remove(id){
    var index = this.resepService.deleteResep(id);
    this.resep.splice(index-1,1);
  }
}
