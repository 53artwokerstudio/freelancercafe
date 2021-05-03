const PostMapsDataAPI     = 'https://freelancercafe.rocket-coding.com/MapsData';
const GetFavMapsAPI       = 'https://freelancercafe.rocket-coding.com/FavList';

//測試載入圖標
const MySetIcon     = "https://freelancercafe.rocket-coding.com/image/myset.png";
const FavShopIcon   = "https://freelancercafe.rocket-coding.com/image/FavShop.png";


//定義咖啡廳清單資料
let CafeData = '';

//_________愛店地圖
let FavListData;
let FavMapsAry = [];


var map;


function FavMap() {

//_________初始位置
 var latlng = { lat: 22.6043902, lng: 120.2981223 };
  
   map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: latlng,
  });


// _________抓我的位置
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        
      
      let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        let mymarker = new google.maps.Marker({
          position: pos,
          icon: MySetIcon,
          map: map,
      });

        map.setZoom(18);
        map.setCenter(pos);

        // localStorage.setItem('mypos',JSON.stringify(pos));
           //_________

          //  FindCafe(pos);
        
        // _________
          //抓愛店清單
          axios.get(GetFavMapsAPI,license)
          .then(function (response) {

              // console.log(response.data);
              FavListData = response.data;
              memberornot();

          })
          .catch(function (error) {
          console.log(error);
          });

        
    });
} else {

    // Browser doesn't support Geolocation
    alert("未允許或遭遇錯誤！");
  }

};
//_________判斷會員
function memberornot(){
  if ( UserToken === "" || UserToken === null ) {
  
      console.log("非會員無愛店清單");
  
  }else{
  
      // console.log(FavListData);
      MarkerMyFav(FavListData);
  
  }}

// _________抓愛店清單標記

function MarkerMyFav(FavListData) {
  
  // console.log(FavListData);

  FavListData.forEach(items => {


    FavShopPos = {
    position: new google.maps.LatLng(items.latitude, items.longitude),
    id:items.id,
    }

    // console.log(FavShopPos);

    FavMapsAry.push(FavShopPos);
  });

  // console.log(FavMapsAry);

  FavMapsAry.forEach(function (items,i){
    const Favmarker = new google.maps.Marker({
      position: items.position,
      icon: FavShopIcon,
      map: map,
      id:items.id,
    });

    map.setZoom(16);

    google.maps.event.addListener(Favmarker, 'click', function() {
        console.log(Favmarker);
    
        FavModalOpen(Favmarker);
      });

  });
   

}

function FavModalOpen(Favmarker){
  
    window.location.replace('./Cafe.html');
  
    localStorage.setItem('SingleShop',JSON.stringify(Favmarker.id));
  
  }

// _________返回會員主頁
let BackToMemberMainBtn = document.getElementById('BackToMemberMainBtn');

function BackToMemberMain() {
    window.location.replace(`./MemberMain.html`);
}

BackToMemberMainBtn.addEventListener(`click`,BackToMemberMain);


