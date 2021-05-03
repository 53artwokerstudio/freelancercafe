const PostMapsDataAPI     = 'https://freelancercafe.rocket-coding.com/MapsData';
const GetFavMapsAPI       = 'https://freelancercafe.rocket-coding.com/FavList';

//測試載入圖標
const MySetIcon     = "https://freelancercafe.rocket-coding.com/image/myset.png";
const ShopIcon      = "https://freelancercafe.rocket-coding.com/image/map-marker.png";



//定義咖啡廳清單資料
let CafeData = '';

var map;


function initMap() {

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

        map.setZoom(15);
        map.setCenter(pos);

        localStorage.setItem('mypos',JSON.stringify(pos));
        //_________

        FindCafe(pos);

        // _________
        //抓每一間店
        axios.post(PostMapsDataAPI,pos)
        .then(function (response) {

          console.log(response.data);
          CafeData = response.data;

          markerShop();



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


//_________給每間店上座標

let markerShopAry = [];
let ShopPos = {};


function markerShop() {
// console.log(CafeData);

//抓出每個位置的座標並賦予id
CafeData.forEach(items => {
  // console.log(items);

  ShopPos = {
    id:items.shopId,
    position: new google.maps.LatLng(items.latitude, items.longitude),

  }

  // console.log(ShopPos);
  
  //推進新陣列
  markerShopAry.push(ShopPos);
});

// console.log(markerShopAry);

//依據新陣列賦予標記
markerShopAry.forEach(function (items,i) {

  let marker = new google.maps.Marker({
    position: items.position,
    icon: ShopIcon,
    map: map,
    id:items.id,

  });
  marker.setMap(map);
  
  
  // marker.setMap(null);


  //監聽標記
  google.maps.event.addListener(marker, 'click', function() {
    console.log(marker);

    modalOpen(marker)
  });
 

  
});

};


function modalOpen(marker){

  console.log('商店id是'+marker.id);
  console.log(marker);

  window.location.replace('./Cafe.html');

  localStorage.setItem('SingleShop',JSON.stringify(marker.id));

}
