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
  styles: ``
})
export class AddressMapComponent  implements AfterViewInit, OnDestroy {

  @Input() control!: FormControl;
  
  private map!: L.Map;
  private marker!: L.Marker;
  private liveMarker?: L.Marker;
  private watchId?: number;

  query = '';

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
    console.log(search);
    if (!search) return;

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
    .catch(err => console.error(err));
  }

  enableLiveLocation()
  {
    if(!navigator.geolocation)
    {
      console.error("Geolocation not supported")
      return;
    }

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
    },
    (err) => {
      console.error("Geolocation error:", err);
    },
    { enableHighAccuracy: true}
    );
  }
}
