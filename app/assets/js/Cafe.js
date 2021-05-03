//調用會員資料
let UserToken = localStorage.getItem("token");
const license = { headers: { Authorization: `Bearer ${UserToken}` }};

//帶我的位置
let MyPos = JSON.parse(localStorage.getItem('mypos'));

//帶商店ID
let SingleShop = JSON.parse(localStorage.getItem('SingleShop'));
// console.log(SingleShop);

//API
let GetMyFavshopAPI = 'https://freelancercafe.rocket-coding.com/MyFav/'+SingleShop;
let PostAddFavAPI   = 'https://freelancercafe.rocket-coding.com/AddFav';
let DeleteFavAPI    = 'https://freelancercafe.rocket-coding.com/DelFav/'+SingleShop;
let UserFavAPI      = 'https://freelancercafe.rocket-coding.com/User'

let ForSingleShopData = [];

let FavUserId;
let FavUserPhoto;
let LikeIcon = document.getElementById('LikeIcon');
let UnLikeIcon = document.getElementById('UnLikeIcon');


//__________________________________________

if ( UserToken === "" || UserToken === null ) {

    console.log("尚未登入");

    LikeIcon.classList.add('d-none');

    //_______取會員
axios.get(UserFavAPI,license)
.then(function (response) {

  console.log(response.data);

  FavUserId = response.data.id;
  FavUserPhoto = response.data.userPhoto;

  

})
.catch(function (error) {
  console.log(error);
});


//_______取店家
  axios.post(PostMapsDataAPI,MyPos)
  .then(function (response) {

    console.log(response.data);
    
    SingleShopData = response.data;
    ForSingleShopData.push(SingleShopData);


    SingleShopInfo();

  })
  .catch(function (error) {
    console.log(error);
  });

  
}else{  
//_______取會員
axios.get(UserFavAPI,license)
.then(function (response) {

  console.log(response.data);

  FavUserId = response.data.id;
  FavUserPhoto = response.data.userPhoto;

  

})
.catch(function (error) {
  console.log(error);
});


//_______取店家
  axios.post(PostMapsDataAPI,MyPos)
  .then(function (response) {

    console.log(response.data);
    
    SingleShopData = response.data;
    ForSingleShopData.push(SingleShopData);


    SingleShopInfo();

  })
  .catch(function (error) {
    console.log(error);
  });


  //_______取清單判斷是否這間店為最愛

 axios.get(GetMyFavshopAPI,license)
  .then(function (response) {

    console.log(response.data);
    let Fav = response.data;
    // console.log(Fav);

    MyFavorNot(Fav);

  })
  .catch(function (response) {
    // console.log(response.data);

  });




};
//_________店家資料渲染

let ShopInfoText = document.getElementById('ShopInfoTextId');
let CafeImg      = document.getElementById('CafeImg');

function SingleShopInfo() {
    // console.log(ForSingleShopData);

    ForSingleShopData[0].forEach(function (items,i){
        if (items.shopId === SingleShop) {

            console.log(items);

            let ShopName     = items.name;
            let ShopAdd      = items.address;
            let ShopOpenTime = items.open_time;
       


            let ShopSocket       = items.socket;
            let ShopQuiet        = items.quiet;
            let ShopWifi         = items.wifi;
            let ShopLimited_time = items.limited_time;
            
            //____染店家圖片
            CafeImg.innerHTML=`
            <div class="cafe-img" id="CafeImg">
            <img src="${items.photo}" alt="">
            </div>

            `
            
            //___店家資訊
            ShopInfoText.innerHTML = `
            
            <ul class="ShopInfoText">
            <li><h2>${ShopName}</h2></li>
            <li><p>${ShopAdd}</p></li>
            <li><p>${ShopOpenTime}</p></li>
            
            <li class="btLine"></li>

            <li>
                <ul class="web_ShopInfoIcon">
                <li class=" ${ ShopSocket ? 'InfoHave' : 'InfoNotHave'}">
                    <i class="fas fa-bolt"></i>
                    <p>提供插座</p>
                    
                </li>

                <li class=" ${ ShopQuiet ? 'InfoHave' : 'InfoNotHave'}">
                    <i class="fas fa-comment-slash"></i>
                    <p>環境安靜</p>
                </li>

                <li class=" ${ ShopLimited_time ? 'InfoNotHave' : 'InfoHave'}">
                    <i class="fas fa-hourglass-half"></i>
                    <p>不限時間</p>
                </li>

                <li class=" ${ ShopWifi  ? 'InfoHave' : 'InfoNotHave'}">
                    <i class="fas fa-wifi"></i>
                    <p>Free wifi</p>
                </li>

                </ul> 
            </li>

        </ul>
            `
        };

    });
    

};

//_________店家最愛判斷

function MyFavorNot(Fav) {

 if (Fav === 'yes') {

  LikeIcon.classList.toggle('d-none');
  UnLikeIcon.classList.toggle('d-none');
 
};
  
}


//_________店家最愛判斷-2
let AddMyFavShop = {};

function LikeUnlike() {

    console.log(this);
  
    this.classList.toggle('d-none');

    if (this.id === 'LikeIcon' ) {

        console.log('哇嘎意');
        UnLikeIcon.classList.toggle('d-none');

        AddMyFavShop.userId = FavUserId;
        AddMyFavShop.shopId = SingleShop;

        axios.post(PostAddFavAPI,AddMyFavShop,license)
        .then(function (response) {
      
          console.log(response.data);
      
        })
        .catch(function (error) {
          console.log(error);
        });


    }else if(this.id === 'UnLikeIcon' ){

        console.log('哇沒嘎意');
        LikeIcon.classList.toggle('d-none');


        console.log(license);

        axios.delete(DeleteFavAPI,license)
        .then(function (response) {
      
          console.log(response.data);
      
        })
        .catch(function (error) {
          console.log(error);
        });
    
    }

};

LikeIcon.addEventListener(`click`,LikeUnlike);
UnLikeIcon.addEventListener(`click`,LikeUnlike);


//_________路線引導

let directionsIcon = document.querySelector(".fa-directions");

function ToDirections(){

  window.location.replace('./MapsDirections.html');

}

directionsIcon.addEventListener(`click`,ToDirections);

//_________回到地圖
let CafeMaincloseWebBoxBtn     = document.getElementById('CafeMaincloseWebBox');
let closeMobileBoxBtn  = document.querySelector('.closeMobileBox');

function closeShopBox() {
  
  window.location.replace('./Maps.html');
  localStorage.removeItem('SingleShop');

};

CafeMaincloseWebBoxBtn.addEventListener(`click`,closeShopBox);
closeMobileBoxBtn .addEventListener(`click`,closeShopBox);





