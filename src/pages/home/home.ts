import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Component } from "@angular/core";
import { Platform, NavController } from 'ionic-angular';
import {NgZone} from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public infoWindowFlag = false;
  public currentMarker = {
    name: '',
    phone: '',
    address: '',
    id: '',
    destination: ''
  }
  map: GoogleMap;
  constructor(public platform: Platform, public ngZone: NgZone, public launchNavigator: LaunchNavigator, public navCtrl: NavController) {
    let self = this;
   }

  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      this.loadMap();
    })

  }

  loadMap() {
    const self = this;

    let POINTS = [
      {
        position: {lat:34.022284, lng:-118.291808},
        name: "Gyro's Food Cart",
        phone: '424-309-2410',
        address: '1117 w 99th St',
        id: 'taco-bell',
        destination: [34.022284,-118.291808]

      },
      {
        position: {lat:34.033136, lng: -118.249739},
        name: 'State Bell',
        phone: '121330009188',
        address: '1117 w 99th St',
        id: 'state-bell',
        destination: [34.033136,-118.249739]

      }
    ];

    let mapOptions: GoogleMapOptions = {
      gestures: {
        zoom: true,
        title: false
      },
      camera: {
         target: {
           
           lat: 34.021488,
           lng: -118.286822
         },
         zoom: 15,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    POINTS.forEach((data: any) => {
      console.log(data);
      data.disableAutoPan = true;
      let marker: Marker = this.map.addMarkerSync(data);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((() => { 
        console.log('hello')
        this.ngZone.run(() => {
          this.currentMarker = {
            name: data.name,
            phone: data.phone,
            address: data.address,
            id: data.id,
            destination: data.destination
          }
          this.infoWindowFlag = true;
        })

      }));

    });
  }

  close(){
    this.infoWindowFlag =false;
  }

  navigate(dest){
    let options: LaunchNavigatorOptions = {
      start: [34.021488, -118.286822],
      app: this.launchNavigator.APP.APPLE_MAPS
    };
    
    this.launchNavigator.navigate(dest, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  order(id) {
    console.log(id);
    this.navCtrl.push(OrderPage, {id: id});
  }
}



//   showMap() {
//     //List of multiple markers
//     var markers = [
// //      ['MyHomeAdress', 33.924052, -118.260817],
// //      ['SimonTech', 33.938624, -118.238717],
// //      ['Carbon5', 34.015120, -118.490616],
// //      ['Library', 33.916630, -118.069376],
// //      ['USC', 34.022352, -118.285117],
//       ['TacoBell', 34.022284, -118.291808],
//       ['TheAlleyDog', 34.033136, -118.249739],
//       ['ChurrosMexicanos', 34.017321, -118.268696],
//       ['WahlBurgers', 34.024519, -118.284774]
//     ];

//     //Location - lat long
// //    const location = new google.maps.LatLng(33.924052, -118.260817);
// //    const USC = new google.maps.LatLng(34.022352, -118.285117);
// //    const Library = new google.maps.LatLng(33.916630, -118.069376);
// //    const SimonTech = new google.maps.LatLng(33.938624, -118.238717);
// //    const Carbon5 = new google.maps.LatLng(34.015120, -118.490616);
//     const TacoBell = new google.maps.LatLng(34.022284, -118.291808);
//     const TheAlleyDog = new google.maps.LatLng(34.033136, -118.249739);
//     const ChurrosMexicanos = new google.maps.LatLng(34.017321, -118.268696);
//     const WahlBurgers = new google.maps.LatLng(34.024519, -118.284774);


//     //Map options
//     const options = {
//       center: TacoBell,
//       zoom: 12
//     };

//     const map = new google.maps.Map(this.mapRef.nativeElement, options);

// //    this.addMarker(location, map);
// //    this.addMarker(USC, map);
// //    this.addMarker(Library, map);
// //    this.addMarker(SimonTech, map);
// //    this.addMarker(Carbon5, map);
//     this.addMarker(TacoBell, map);
//     this.addMarker(TheAlleyDog, map);
//     this.addMarker(ChurrosMexicanos, map);
//     this.addMarker(WahlBurgers, map);
//   }
//   addMarker(position, map) {
//     return new google.maps.Marker({
//       position,
//       map
//     });
//   }

// }