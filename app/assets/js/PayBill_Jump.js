// //調用會員資料
// let UserToken = JSON.parse(localStorage.getItem("token"));
// const license = { headers: { Authorization: Bearer ${UserToken} }};

console.log(license);

let PostPayBillAPI = 'https://freelancercafe.rocket-coding.com/PayBill';



let Newebpay = document.forms['Newebpay'];

console.log(Newebpay);

let MemberUserPayBtn = document.getElementById('MemberUserPayBtn');

let PayBillData = '';

function PostToPayBill() {

    
    let payBillData = {

    amount:"49", 
    payType:"CREDIT"
    }

    axios.post(PostPayBillAPI,payBillData,license)
    .then(function (response) {

    console.log(response.data);
    PayBillData = response.data;

    
    document.write(`
    <form name='Newebpay' action='https://ccore.spgateway.com/MPG/mpg_gateway' method='post' id="PayBillId">
    
    <input type='hidden' name='MerchantID' value='${PayBillData[0].Value}' />
    
    <input type='hidden' name='TradeInfo' value='${PayBillData[1].Value}' />
    
    <input type='hidden' name='TradeSha' value='${PayBillData[2].Value}' />
    
    <input type='hidden' name='Version' value='${PayBillData[3].Value}' />
    
    </form><script>document.Newebpay.submit();</script>
    ` );


    })
    .catch(function (error) {
    console.log(error);
    });

};

MemberUserPayBtn.addEventListener(`click`,PostToPayBill);






