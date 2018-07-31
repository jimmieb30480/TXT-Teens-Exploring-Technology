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
      name: "Gyro's Food Cart",
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
      priceNum: 1.5,
      desc: 'Crisp-fried corn tortillas with seasoned ground beef, onion, and cilantro.',
      img: "assets/imgs/tacos.jpg",
      rating1: "fa fa-star checked",
      rating2: "fa fa-star checked",
      rating3: "fa fa-star checked",
      rating4: "fa fa-star checked",
      rating5: "fa fa-star"
    },
    {
      name: "Burger",
      num: 0,
      price: '$1.50',
      priceNum: 1.5,
      desc: 'This burger is very pleasing to the eyes because it contains a rich sesame bun, juicy meat, melted cheese, and a sweet onion.',
      img: "assets/imgs/burger.jpg",
      rating1: "fa fa-star checked",
      rating2: "fa fa-star checked",
      rating3: "fa fa-star checked",
      rating4: "fa fa-star checked",
      rating5: "fa fa-star checked"
    },
    {
      name: "Hot Dog",
      num: 0,
      price: '$1.50',
      priceNum: 1.5,
      desc: 'Crisp-fried corn tortillas with seasoned ground beef, onion, and cilantro.',
      img: "assets/imgs/hotdog.jpg",
      rating1: "fa fa-star checked",
      rating2: "fa fa-star checked",
      rating3: "fa fa-star checked",
      rating4: "fa fa-star checked",
      rating5: "fa fa-star"
    },
    {
      name: "Corn",
      num: 0,
      price: '$1.50',
      priceNum: 1.5,
      desc: 'This corn is a classic in Mexico because it contains all these delicious ingredients, such as',
      img: "assets/imgs/corn.jpg",
      rating1: "fa fa-star checked",
      rating2: "fa fa-star checked",
      rating3: "fa fa-star checked",
      rating4: "fa fa-star",
      rating5: "fa fa-star"
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
// http://jeremykerley.com/wp-content/uploads/2016/07/tacos.jpg
// https://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQxrXkD7nWqMj2WKOR26-kCvwibjdEiMKSS_K7Zg121ZWCAGHI
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqi_-aQF61Pw97t4SgG6LpPMRJmQXpxgUtkmU-w00JmryRpYMl


// https://www.fluentu.com/blog/spanish/wp-content/uploads/sites/2/2017/11/how-to-order-food-in-mexican-spanish-e1511867184148.jpg
// https://files.slack.com/files-pri/T17R4TFAM-FBZHTGC67/tacos.png
