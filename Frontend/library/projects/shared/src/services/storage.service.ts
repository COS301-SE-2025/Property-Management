import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private storage = inject(Storage);
  private readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: string): Promise<void> {
    await this.readyPromise;
    return this._storage?.set(key, value);
  }

  async get(key: string): Promise<string>{
    await this.readyPromise;
    return this._storage?.get(key);
  }

  async remove(key: string): Promise<void>{
    await this.readyPromise;
    await this._storage?.remove(key);
  }

  async clear(): Promise<void>{
    await this.readyPromise;
    await this._storage?.clear();
  }
}