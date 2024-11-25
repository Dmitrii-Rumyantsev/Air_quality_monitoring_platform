import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,  // Make this component standalone
  imports: [HttpClientModule], // Include HttpClientModule here
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  // Your component logic here
  private map: any;
  private apiKey = '324cbdb1-6611-4c36-9503-2a5ca14982db'; // Замените на свой ключ API от IQAir

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      this.initMap(L);
    }
  }

  private initMap(L: any): void {
    this.map = L.map('air-quality-map').setView([51.505, -0.09], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;
      this.getAirQuality(lat, lon, L);
    });
  }

  private getAirQuality(lat: number, lon: number, L: any): void {
    // Измените URL на соответствующий IQAir API
    const url = `https://api.iqair.com/v1/airquality?lat=${lat}&lon=${lon}&key=${this.apiKey}`;

    this.http.get(url).subscribe(
      (response: any) => {
        // Проверим, существует ли данные о качестве воздуха
        if (response.data && response.data.aqi) {
          const aqi = response.data.aqi;
          const description = this.getAQIDescription(aqi);
          const popupContent = `
            <h4>Air Quality Info</h4>
            <p>AQI: ${aqi}</p>
            <p>Description: ${description}</p>
          `;

          L.marker([lat, lon]).addTo(this.map).bindPopup(popupContent).openPopup();
        } else {
          console.error('Данные о качестве воздуха не найдены.');
        }
      },
      (error) => {
        console.error('Ошибка при получении данных о качестве воздуха:', error);
      }
    );
  }

  private getAQIDescription(aqi: number): string {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  }
}
