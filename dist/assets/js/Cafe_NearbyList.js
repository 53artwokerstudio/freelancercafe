let NearbyPos = JSON.parse(localStorage.getItem('mypos'));
// console.log(NearbyPos);

let NearbyShopItem      = document.getElementById('NearbyShopItem');

//_______取附近清單
axios.post(PostMapsDataAPI,NearbyPos)
.then(function (response) {

    console.log(response.data);
    
    let NearbyItem = response.data;

    Nearby(NearbyItem);

})
.catch(function (error) {
  console.log(error);
});



//_______取最愛清單
function Nearby(NearbyItem) {

    let NearbyCafeItem = '';
    
    NearbyItem.forEach(function (item,i) {

        // console.log(item);

        NearbyCafeItem +=`
        <ul class="" id="NearbyShopItem">

        <li class="MemberReview btLine" >

        <div class="MemberUserPhoto">
            <img src="${item.photo}" alt="">
        </div>
            
            <ul class="ReviewText">
                <li><h3>${item.name}</h3></li>
                <li><p>${item.address}</br>${item.open_time}</p></li>   
                <li><p>離現在位置： ${item.DisView}</p></li>  
                </ul>

        </li>

    </ul>`
    })

    NearbyShopItem.innerHTML = NearbyCafeItem;   
    
}

//_________回到地圖
let NearbyCloseWebBox  = document.getElementById('CafeNearbycloseWebBox');

function closeNearbyBox() {

    history.back(); 
    localStorage.removeItem('SingleShop');
};

NearbyCloseWebBox.addEventListener(`click`,closeNearbyBox);
