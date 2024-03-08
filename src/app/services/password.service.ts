import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private _fireStore:Firestore) { }

  addSite(data: object){
    const dbInstance = collection(this._fireStore,"sites");
    return addDoc(dbInstance, data)
  }

  loadSites(){
    const dbInstance = collection(this._fireStore,"sites");
    return collectionData(dbInstance, { idField : 'id'})
  }

  updateSite(id:string, data: object){
    const docInstance = doc(this._fireStore,"sites", id);
    return updateDoc(docInstance, data)
  }

  deleteSite(id: string){
    const docInstance = doc(this._fireStore, 'sites', id);
    return deleteDoc(docInstance)
  }

  addPasswords(data: object,siteId:string){
    const dbInstance = collection(this._fireStore,`sites/${siteId}/passwords`);
    return addDoc(dbInstance, data)
  }

  loadPassword(siteId:string){
    const dbInstance = collection(this._fireStore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' })
  }

  updatePassword(siteId:string, passwordId:string, data: object){
    const docInstance = doc(this._fireStore, `sites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance, data)
  }

  deletePassword(siteId: string, passwordId:string){
    const docInstance = doc(this._fireStore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance)
  }
}
