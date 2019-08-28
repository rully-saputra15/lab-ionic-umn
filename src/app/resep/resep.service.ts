import { Injectable } from '@angular/core';
import { Resep } from './resep.model';

@Injectable({
  providedIn: 'root'
})
export class ResepService {
  private resep : Resep[] = [
    {
      id:'r1',
      title:'Gado-Gado',
      imageUrl:'https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/12/Resep-Gado-Gado.jpg?fit=2461%2C2359&ssl=1',
      ingredients:['Lontong','Tauge','Bayam','Jagung','Kangkung','Jengkok','Daun Kunyit']
    },
    {
      id:'r2',
      title:'Ayam Goreng',
      imageUrl:'https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/12/Resep-Gado-Gado.jpg?fit=2461%2C2359&ssl=1',
      ingredients:['Ayam','Goreng']
    },
    {
      id:'r3',
      title:'Pizza magareta',
      imageUrl:'https://i1.wp.com/resepkoki.id/wp-content/uploads/2016/12/Resep-Gado-Gado.jpg?fit=2461%2C2359&ssl=1',
      ingredients:['Ayam','Goreng']
    },
  ];
  constructor() { }
  getAllResep(){
    return [...this.resep];
  }
  getResep(resepId:string){
    return{
      ...this.resep.find(resep =>{
        return resep.id === resepId;
      })
    };
  }
  deleteResep(resepId:string){
    var filtered= this.resep.filter(resep=>{
      return resep.id !== resepId
    })
    this.resep = filtered;
    return this.resep;
  };
}
