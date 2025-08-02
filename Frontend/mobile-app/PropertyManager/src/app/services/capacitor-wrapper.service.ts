import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class CapacitorWrapperService {
  getPlatform(): string {
    return Capacitor.getPlatform();
  }
}