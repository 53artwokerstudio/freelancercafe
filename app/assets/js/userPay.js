let UserPayToken = localStorage.getItem("token");


let PostPayBillAPI = 'https://freelancercafe.rocket-coding.com/UpLoadFile/PayBill'

let memberUserPayBtn = document.getElementById('memberUserPayBtn');


function PayMeMoney() {
    


    let form = {
        ordernumber:'100001',
        amount:15,
        payType: 'CREDIT'
    };
    
    
    fetch(PostPayBillAPI, {

        method: 'POST',
        headers: {Authorization : `Bearer ${UserPayToken}`},
        body: form,
    
      }).then((response) => {
          return response.json(); 
        }).then((jsonData) => {
          console.log(jsonData);
        }).catch((err) => {
          console.log('錯誤:', err);
      })
    
    
    
        
        }

memberUserPayBtn.addEventListener(`click`,PayMeMoney);