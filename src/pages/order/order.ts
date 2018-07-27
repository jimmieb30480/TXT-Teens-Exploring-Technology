import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public stores = [
    {
      position: {lat:34.022284, lng:-118.291808},
      name: "Gyro's Cart",
      phone: '121330009188',
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
  public store;
  public items = [
    {
      name: "Taco",
      num: 0,
      price: '$1.50',
      priceNum: 1.5
    },
    {
      name: "Burger",
      num: 0,
      price: '$1.50',
      priceNum: 3
    },
    {
      name: "Hot Dog",
      num: 0,
      price: '$1.50',
      priceNum: 1.5
    },
    {
      name: "Snacks",
      num: 0,
      price: '$1.50',
      priceNum: 1.5
    },
    {
      name: "Corn",
      num: 0,
      price: '$1.50',
      priceNum: 1.5
    },
  ]
  public price = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sms: SMS) {
    this.store = this.stores.filter((data) => {
      console.log(data);
      if(data.id === this.navParams.get('id')){
        return data
      }
    })
    this.store = this.store[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
  
  add(self) {
    console.log(self);
    self.num += 1;
    this.updatePrice();
  }

  subtract(self) {
    if(self.num > 0){
      self.num -= 1;
    }
    this.updatePrice();
  }

  updatePrice(){
    this.price = 0;
    this.items.filter((data) => {
      this.price += (data.priceNum * data.num)
    })
  }

  sendSMS(){
    let msg = 'Order request for ' + this.store.name + '\n \n' ;
    this.items.filter((data) => {
      if(data.num > 0){
        msg += '' + data.name + ' ' + data.num + '\n'
      }
    })

    this.sms.send('4243092410',  msg, { replaceLineBreaks: true});

  }
}
