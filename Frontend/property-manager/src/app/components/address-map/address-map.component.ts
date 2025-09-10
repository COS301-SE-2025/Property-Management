import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as L from 'leaflet';

interface result {
  display_name: string;
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-address-map',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './address-map.component.html',
  styles: `
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      border-radius: 0.5rem;
    }
    
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #f59e0b;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
})
export class AddressMapComponent  implements AfterViewInit, OnDestroy {

  @Input() control!: FormControl;
  
  private map!: L.Map;
  private marker!: L.Marker;
  private liveMarker?: L.Marker;
  private watchId?: number;

  query = '';
  isLoading = false;

  ngAfterViewInit()
  {
    this.map = L.map('map').setView([-25.7461, 28.1881], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngOnDestroy()
  {
    if(this.watchId)
    {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  selectAddress(suggestion: result)
  {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);

    this.map.setView([lat, lon], 16);

    if(this.marker)
    {
      this.marker.remove();
    }

    this.marker = L.marker([lat, lon]).addTo(this.map).bindPopup(`<b>${suggestion.display_name}</b>`).openPopup();

    this.control.setValue(suggestion.display_name);
  }
  findAddress()
  {
    const search = this.control.value;
    if (!search) return;

    this.isLoading = true;

    fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(search)}`)
    .then(res => res.json())
    .then((results) => {
      if(results.features && results.features.length > 0)
      {
        const first = results.features[0];

        const [lon, lat] = first.geometry.coordinates;
        this.map.setView([lat, lon], 16);

        if(this.marker)
        {
          this.marker.remove();
        }
        if(this.liveMarker)
        {
          this.liveMarker.remove();
        }

        this.marker = L.marker([lat, lon]).addTo(this.map).bindPopup(`<b>${first.properties.name || search}</b>`).openPopup();

        this.control.setValue(first.properties.name || search);
      }
    })
    .catch(err => console.error(err))
    .finally(() => this.isLoading = false);
  }

  enableLiveLocation()
  {
    if(!navigator.geolocation)
    {
      console.error("Geolocation not supported")
      return;
    }

    this.isLoading = true;

    this.watchId = navigator.geolocation.watchPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      this.map.setView([lat, lon], 16);

      if(this.liveMarker)
      {
        this.liveMarker.remove();
      }

      this.liveMarker = L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })
      }).addTo(this.map).bindPopup('You are here').openPopup();

      this.isLoading = false;
    },
    (err) => {
      console.error("Geolocation error:", err);
      this.isLoading = false;
    },
    { enableHighAccuracy: true}
    );
  }
}
