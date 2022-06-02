const dotenv = require('dotenv').config();
const qs = require('qs');
const axios = require('axios');
//const {sumTotal} = require('./cart'
 const sendMessage = (id,cartArray,userObject,paidAmount,selectedPercent,actualAmout) => {
    let  products  = [];
    cartArray.forEach(e=>{
      if(e){
        let guestno = `Number of Servings: ${e.value}`   
        products.push(e.name,guestno)
      }
    });
    const text  =`
 Hi, a purchase occured on the website
Name:${userObject.name}
Email:${userObject.email}
Phone Number : ${userObject.phone}
Event Date : ${userObject.eventDate}
Percentage paid:${selectedPercent}%
Amount Paid:${paidAmount}
Total food cost: ${actualAmout}
Amount remaining : ${actualAmout-paidAmount}
Type of Event:${userObject.event_type}
Time of Event: ${userObject.time}
Location of event: ${userObject.event_location}
Paystack Reference ID : ${id}
Products purchased:
${products.join('\n')}`

    var data = qs.stringify({
        'From': 'whatsapp:+14155238886',
        'Body': text,
        'To': 'whatsapp:+2349064037403' 
      });
    var config = {
        method: 'post',
        url: `https://api.twilio.com/2010-04-01/Accounts/${process.env.Account_Sid }/Messages.json`,
        headers: { 
          'Authorization': 'Basic QUMyNDllZWVmMDcxYjkyMDFhYjg1MjU0MDBkZjU1ODZlNjpmNDkxMTFhYTdkNTJlMjM0MDY2ZDkxMThjMTFhZWYwMw==', 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}

module.exports = sendMessage;
