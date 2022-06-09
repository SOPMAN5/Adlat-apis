
const qs = require('qs');
const axios = require('axios');
//const {sumTotal} = require('./cart'
 const sendFormData =  (id,cartArray,userObject,paidAmount,selectedPercent,actualAmout) => {
    let  products  = [];
    cartArray.forEach(e=>{
      if(e){
        let guestno = `Number of Servings: ${e.value}`   
        products.push(e.name,guestno)
      }
    });
    const nelifyFormData  ={
'form-name':'contact',
'Name':`${userObject.name}`,
'Email':`${userObject.email}`,
'Phone' : `${userObject.phone}`,
'EventDate' : `${userObject.eventDate}`,
'Percentage-paid':`${selectedPercent}%`,
'Amount-Paid':`${paidAmount}`,
'Total-food-cost': `${actualAmout}`,
'Amount-remaining' : `${actualAmout-paidAmount}`,
'Type-of-Event':`${userObject.event_type}`,
'Time-of-Event': `${userObject.time}`,
'Location-of-event': `${userObject.event_location}`,
'Paystack-Reference-ID' : `${id}`,
'Products-purchased':`${products.join('\n')}`

}

      let config = {
        method:'post',
        url:'/',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data:encode(nelifyFormData)
      }
      return axios(config)

}

//module.exports = sendFormData;
