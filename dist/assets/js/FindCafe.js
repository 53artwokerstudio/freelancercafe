const FindPos = JSON.parse(localStorage.getItem('mypos'));
const SearchMapDatas = JSON.parse(localStorage.getItem('SearchMapData'));

console.log(FindPos);
console.log(SearchMapDatas);
// console.log(SearchMapDatas.data);


//測試載入圖標
const MySetIcon     = "https://freelancercafe.rocket-coding.com/image/myset.png";
const FindShopIcon   = "https://freelancercafe.rocket-coding.com/image/map-marker.png";


//將資料定義為新陣列
let FindMapsAry = SearchMapDatas.data;
let MarkerFindCafeAry = [];
var map;


function FindMap() {

//_________位置
 let latlng = FindPos;
  
    console.log(latlng);

   map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: latlng,
  });

  let marker = new google.maps.Marker({
    position: latlng,
    icon: MySetIcon,
    map: map,
});

    map.setZoom(14);
    map.setCenter(FindPos);

    MarkerSearchCafe();

};

// _________標記找到的店家



function MarkerSearchCafe() {
  

    FindMapsAry.forEach(items => {

    SearchDataPos = {
    position: new google.maps.LatLng(items.latitude, items.longitude),
    id:items.shopId,
    }

    MarkerFindCafeAry.push(SearchDataPos);
  });

 
  console.log(MarkerFindCafeAry);

    MarkerFindCafeAry.forEach(function (items,i){
    const FindCafemarker = new google.maps.Marker({
      position: items.position,
      icon: FindShopIcon,
      map: map,
      id:items.id,
    });

    map.setZoom(14);

    google.maps.event.addListener(FindCafemarker, 'click', function() {
        console.log(FindCafemarker);
    
        FavModalOpen(FindCafemarker);
      });

  });
   
  localStorage.removeItem('SearchMapData');
//   localStorage.removeItem('mypos');

};

function FavModalOpen(FindCafemarker){
  
    window.location.replace('./Cafe.html');
  
    localStorage.setItem('SingleShop',JSON.stringify(FindCafemarker.id));
  
  }

