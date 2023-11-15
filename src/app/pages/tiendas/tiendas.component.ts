import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  },
  title: string,
  info: string
};

interface Ubicacion {
  departamento: string;
  distrito: string;
  cantidad: number;
}

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})


export class TiendasComponent {
  ubicacion: any;
  
  mapa!: google.maps.Map;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 15,
    mapTypeControl: false
  };
 
  markers: MarkerProperties[] = [];

  ubicaciones: Ubicacion[] = [
    { departamento: 'Lima', distrito: 'Santa Anita', cantidad: 3 },
    { departamento: 'Lima', distrito: 'San Miguel', cantidad: 3 },
    { departamento: 'Lima', distrito: 'San Isidro', cantidad: 3 },
  ];

  constructor(private router: Router) {}

  handleMapInitialized(map: google.maps.Map) {
    this.mapa = map;
    this.actualizarMarcadores();
  }

  verUbicacionEnMapa(ubicacion: Ubicacion) {
    const marker: MarkerProperties = {
      position: { lat: -12.020396967956518, lng: -76.96286103068918},
      label: { color: 'black', text: 'Tienda', fontSize: '20px', fontWeight: 'bold' },
      title: ubicacion.departamento,
      info: ubicacion.distrito,
    };

    this.markers = [marker];
    this.mapOptions.center = marker.position;
  }

  eliminarUbicacion(ubicacion: Ubicacion) {
    const index = this.ubicaciones.indexOf(ubicacion);
    if (index !== -1) {
      this.ubicaciones.splice(index, 1);
      // Actualiza los marcadores en el mapa después de eliminar
      this.actualizarMarcadores();
    }
  }

  editarUbicacion(ubicacion: Ubicacion) {
    this.router.navigate(['/editar-ubicacion'], { state: { ubicacion } });
  }

  crearUbicacion() {
    const nuevaUbicacion: Ubicacion = {
      departamento: 'Nuevo Departamento',
      distrito: 'Nuevo Distrito',
      cantidad: 1,
    };

    this.ubicaciones.push(nuevaUbicacion);
    this.actualizarMarcadores();
  }

  private actualizarMarcadores() {
    // Actualiza los marcadores en el mapa después de cualquier cambio en las ubicaciones
    this.markers = this.ubicaciones.map((ubicacion) => ({
      position: { lat: -12.020229070459608, lng: -76.96268936931081 },
      label: { color: 'black', text: 'Tienda', fontSize: '20px', fontWeight: 'bold' },
      title: ubicacion.departamento,
      info: ubicacion.distrito,
    }));

    // Centra el mapa en el último marcador agregado (puedes ajustar esto según tus necesidades)
    const ultimoMarcador = this.markers[this.markers.length - 1];
    if (ultimoMarcador) {
      this.mapOptions.center = ultimoMarcador.position;
    }
  }

}
