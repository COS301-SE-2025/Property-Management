import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private storage = inject(Storage);

  constructor() {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: string) {
    this._storage?.set(key, value);
  }

  public get(key: string){
    return this._storage?.get(key);
  }

  public remove(key: string){
    this._storage?.remove(key);
  }

  public clear(){
    this._storage?.clear();
  }
}