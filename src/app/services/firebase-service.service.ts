import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAutos(){
    return this.firestore.collection("autos").snapshotChanges();
  }
  createAuto(auto:any){
  return this.firestore.collection("autos").add(auto);

  }

  updateAuto(id:any, auto:any){
   return this.firestore.collection("autos").doc(id).update(auto);

  }

  deleteAuto(id:any){
   return this.firestore.collection("autos").doc(id).delete();

  }




}
