const SearchPos = JSON.parse(localStorage.getItem('mypos'));
const PostSearchMapsAPI   = 'https://freelancercafe.rocket-coding.com/Search';

// console.log(SearchPos);


//_________搜尋店家
let SearchCafe        = document.getElementById('map-search-input');
let SearchCafeIcon    = document.getElementById('SearchCafeIcon');

let ChangetoClickBtn  = document.getElementById('ChangetoClickBtn');
let ClosesortBarBtn   = document.getElementById('ClosesortBarBtn');

let limit_time  = document.getElementById('limit_time');
let wifi        = document.getElementById('wifi');
let quiet       = document.getElementById('quiet');
let socket      = document.getElementById('socket');

let SearchSort = {};


function ShowSearchBar() {

  ChangetoClickBtn.classList.remove("d-none");

};

SearchCafe.addEventListener(`click`,ShowSearchBar);



function FindCafe(SearchPos) {
 

  //基本判斷條件

  SearchSort.lat = SearchPos.lat;
  SearchSort.lng = SearchPos.lng;

  SearchSort.wifi       = false;
  SearchSort.quiet      = false;
  SearchSort.socket     = false;
  SearchSort.limit_time = true;



  PostEnter();
  PostIcon();
};


//___換按鈕樣式＋搜尋條件分類
function ChangetoClick() {
  
  this.classList.toggle('sortBarBtn');
  this.classList.toggle('sortBarBtn-click');

  if(this.id === 'socket' ){
    SearchSort.socket     = !SearchSort.socket ;
    // console.log("socket是"+(SearchSort.socket));

  }else if(this.id === 'wifi' ){
    SearchSort.wifi     = !SearchSort.wifi ;
    // console.log("wifi是"+(SearchSort.wifi)); 

  }else if(this.id === 'quiet' ){
    SearchSort.quiet     = !SearchSort.quiet ;
    // console.log("quiet是"+(SearchSort.quiet)); 

  }else if(this.id === 'limit_time' ){
    SearchSort.limit_time     = !SearchSort.limit_time ;
    // console.log("limit_time是"+(SearchSort.limit_time)); 
  };

  // console.log(SearchSort);

  PostEnter();
  PostIcon();

};

limit_time.addEventListener(`click`,ChangetoClick);
wifi.addEventListener(`click`,ChangetoClick);
quiet.addEventListener(`click`,ChangetoClick);
socket.addEventListener(`click`,ChangetoClick);

//___判斷送出方式

//___依據Icon送出
function PostIcon() {

  SearchCafeIcon.addEventListener( `click`, function(){

    SearchSort.search = SearchCafe.value;
    FindCafeAxios(SearchSort);

  });
  
  };

//___依據Enter送出
function PostEnter() {

SearchCafe.addEventListener( `keyup`, function(event){
  if (event.keyCode === 13){

    SearchSort.search = SearchCafe.value;
    FindCafeAxios(SearchSort);

  }});

};

//___Post

let SearchMapData = [];

function FindCafeAxios(SearchSort) {

  // console.log(SearchSort);
  ChangetoClickBtn.classList.add("d-none");

  axios.post(PostSearchMapsAPI,SearchSort,UserToken)
  .then(function (response) {

    console.log(response.data);
    SearchMapData = response.data;
    
    localStorage.setItem('SearchMapData',JSON.stringify(SearchMapData));

    window.location.replace('./FindCafe.html');

  })
    .catch(function (error) {
      console.log(error);
    });
  
};


//______________________________________________
//___關閉分類欄
function CloseSortBar(){
  ChangetoClickBtn.classList.add("d-none");
};

ClosesortBarBtn.addEventListener(`click`,CloseSortBar);


