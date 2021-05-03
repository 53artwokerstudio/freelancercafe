console.log(UserToken);
let ReviewSingleShopID = JSON.parse(localStorage.getItem('SingleShop'));

//API
let GetCafeMsgAPI       = 'https://freelancercafe.rocket-coding.com/CafeMsg/'+ReviewSingleShopID;
let GetSingleCafeAPI    = 'https://freelancercafe.rocket-coding.com/Cafe/'+ReviewSingleShopID;

let SingleCafeReviewItem   = document.getElementById('SingleCafeReviewItem');
let SingleCafeImg          = document.getElementById('SingleCafeImg');


//_______取單一店家資料
axios.get(GetSingleCafeAPI)
.then(function (response) {

    console.log(response.data);
    let ThisCafeDataName = response.data.name;
    let ThisCafePhoto = response.data.photo;
    console.log(ThisCafePhoto);

    RenderCafeNameinReview(ThisCafeDataName);
    ReviewCafeImg(ThisCafePhoto);

})
.catch(function (error) {
  console.log(error);
});


//_______取單一店家評價
axios.get(GetCafeMsgAPI)
.then(function (response) {

    console.log(response.data);
    let CafeReviewData = response.data;

    CafeReview(CafeReviewData);

})
.catch(function (error) {
  console.log(error);
});



//_______店名渲染
let CafeNameinReview = document.getElementById('CafeNameinReview');

function  RenderCafeNameinReview(ThisCafeDataName) {

    CafeNameinReview.innerHTML = ThisCafeDataName;

}

function ReviewCafeImg(ThisCafePhoto){

    //____染店家圖片
    SingleCafeImg.innerHTML=`
    <div class="cafe-img" id="SingleCafeImg">
    <img src="${ThisCafePhoto}" alt="">
    </div>

    `
}


//_______評價渲染
let CafeReviewBtn = document.getElementById('CafeMsgReviewBtn');


function CafeReview(CafeReviewData) {

    let Review = '';

    if ( UserToken === "" || UserToken === null ) {

        CafeReviewBtn.classList.add("d-none");

        Review +=`
        <ul class="FdcAllCenter" id="SingleCafeReviewItem">
        <li class="FdcAllCenter">
        <i class="far fa-smile-wink"></i>
        </br>
        <h3>來過這裡了嗎？快告訴我們你的想法吧！</h3>
        <p>目前還沒有任何評價</p>
        </li>
        </ul>`


    }else{
        
        if ( CafeReviewData.length === null) {
            Review +=`
            <ul class="FdcAllCenter" id="SingleCafeReviewItem">
            <li class="FdcAllCenter">
            <i class="far fa-smile-wink"></i>
            </br>
            <h3>來過這裡了嗎？快告訴我們你的想法吧！</h3>
            <p>目前還沒有任何評價</p>
            </li>
            </ul>`
        
        }else{
    
            CafeReviewData.forEach( function (item) {
            
                Review +=`
                <ul class="" id="SingleCafeReviewItem">
        
                <li class="MemberReview btLine" >
        
        
                    <div class="MemberUserPhoto">
                        <img src="${item.userPhoto}" alt="">
                    </div>
                    
        
                    <ul class="ReviewText">
                        <li><h3>${item.userName}</h3></li>
        
                        <li><p>${item.content}</p></li> 
                        
                        <li class="hint">
                        ${String(item.addDateTime.split(`T`)[0]+' '+item.addDateTime.split(`T`)[1].split(`.`)[0])}
                        </li>
                    </ul>
        
                </li>
        
            </ul>`
        })}

    };

   

    SingleCafeReviewItem.innerHTML = Review;   
    
}

//_________回到地圖

let ReviewCloseWebBox = document.getElementById('ReviewCloseWebBox');


function closeReviewBox() {

window.location.replace('./Maps.html');
localStorage.removeItem('SingleShop');

};


ReviewCloseWebBox.addEventListener(`click`,closeReviewBox);
