import { Component, AfterViewChecked } from '@angular/core';
import {FormsModule} from '@angular/forms';

declare let paypal:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  
  addScript: boolean = false;
  paypalLoad: boolean = true;
  
  finalAmount: number = .01;
 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'Ad4vP15Ae4zckfUbrbOPNyoPAQVVEgd1FMj8WRDFKFJfN_lcz34tp2ybFmtrSZyQw-02jwCUWMHuKGMo',
      production: 'Ad4vP15Ae4zckfUbrbOPNyoPAQVVEgd1FMj8WRDFKFJfN_lcz34tp2ybFmtrSZyQw-02jwCUWMHuKGMo'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment)
       alert("payment succesful!");
      })
    }
  };

   ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
       paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
 
}
