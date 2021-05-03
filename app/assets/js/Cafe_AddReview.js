// console.log(license);
//抓單一店家ID
let AddReviewSingleShopID = JSON.parse(localStorage.getItem('SingleShop'));

//API
let PostAddMsgAPI = 'https://freelancercafe.rocket-coding.com/AddMsg/';
let GetAddSingleCafeAPI  = 'https://freelancercafe.rocket-coding.com/Cafe/'+AddReviewSingleShopID;

//監聽
let inputNewMsg          = document.getElementById('inputNewMsg');
let PostNewMemberMsgBtn  = document.getElementById('PostNewMemberMsgBtn');
let AddReviewCafeName    = document.getElementById('AddReviewCafeName');
let AddReviewSingleCafeImg =  document.getElementById('AddReviewSingleCafeImg');


let AddNewMsg = {};


//_______取單一店家資料
axios.get(GetAddSingleCafeAPI,license)
.then(function (response) {

    console.log(response.data);
    let AddThisCafeDataName = response.data.name;
    let AddThisCafeDataPhoto = response.data.photo;


    AddReviewCafeTitle(AddThisCafeDataName);
    AddReviewCafeImg(AddThisCafeDataPhoto);
})
.catch(function (error) {
  console.log(error);
});

function AddReviewCafeTitle(AddThisCafeDataName) {
    
    AddReviewCafeName.innerHTML = AddThisCafeDataName;

}


function AddReviewCafeImg(AddThisCafeDataPhoto){

    //____染店家圖片
    AddReviewSingleCafeImg.innerHTML=`
    <div class="cafe-img" id="SingleCafeImg">
    <img src="${AddThisCafeDataPhoto}" alt="">
    </div>

    `
}




function AddNewMemberMsg() {
    if (inputNewMsg.value === "" ||
        inputNewMsg.value === null ||
        inputNewMsg.value === undefined) {

        alert('沒有輸入留言！');
        
    }else{
        AddNewMsg.content = inputNewMsg.value;
        AddNewMsg.shopId  = AddReviewSingleShopID;
    
        
    
        console.log(AddNewMsg);
    
    
    
        axios.post(PostAddMsgAPI,AddNewMsg,license)
        .then(function (response) {
    
        console.log(response.data);
        window.location.replace('./Cafe_Review.html')
    
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    

}

PostNewMemberMsgBtn.addEventListener(`click`,AddNewMemberMsg);