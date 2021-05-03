//API
let GetFavList = 'https://freelancercafe.rocket-coding.com/FavList';

//愛店清單
// let MyFavList = [];

//會員頭像
let MemberUserPhoto     = document.querySelector('.MemberUserPhoto');
let MemberFavShopItem   = document.getElementById('MemberFavShopItem');


//_______取最愛清單
axios.get(GetFavList,license)
.then(function (response) {

    console.log(response.data);
    // MyFavList.push(response.data);

    let FavListItem = response.data;

    ShowMemberFavShopItem(FavListItem);

})
.catch(function (error) {
  console.log(error);
});

//_______取最愛清單
function ShowMemberFavShopItem(FavListItem) {

    let FavItem = '';
    
    FavListItem.forEach(function (item,i) {

        FavItem +=`
        <ul class="" id="MemberFavShopItem">

            <li class="MemberReview btLine" >
                

                <div class="MemberUserPhoto">
                    <img src="${item.photo}" alt="">
                </div>
                    
                <ul class="ReviewText">
                    <li><h3>${item.name}</h3></li>
                    <li><p>${item.address}</br>${item.open_time}</p></li>   
                </ul>

            </li>
            
        </ul>`
    })

    MemberFavShopItem.innerHTML = FavItem;   
    
}

//_________回到地圖

let closeFavBoxBtn = document.getElementById('closeFavBoxBtn');


function closeFavBox() {

history.go(-1);
localStorage.removeItem('SingleShop');

};


closeFavBoxBtn.addEventListener(`click`,closeFavBox);
