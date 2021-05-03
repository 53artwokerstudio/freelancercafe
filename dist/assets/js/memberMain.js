//調用會員資料
let UserToken = localStorage.getItem("token");
const license = { headers: { Authorization: `Bearer ${UserToken}` }};

let UserAPI = 'https://freelancercafe.rocket-coding.com/User';


// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//AXIOS

let MainMemberName = '';


axios.get(UserAPI,license)
.then(function (response) {

  console.log(response.data);

  MainMemberName  = response.data.userName;
  MainMemberPhoto  = response.data.userPhoto;


  MemberMain();
  MemberInfo();


})
.catch(function (error) {
  console.log(error);
});

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//印出會員資訊

let MenuUserName = document.querySelector('.MenuUserName');
let MenuUserPhoto = document.querySelector('.userPhoto');

function MemberMain(){
    MenuUserName.innerHTML  = MainMemberName;

    MenuUserPhoto.innerHTML  =`
    <div class="userPhoto">
    <img src="${MainMemberPhoto}" alt="">
    </div>
    ` ;

    //會員頭貼
};


// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//按X回地圖

let XbacktoMap = document.getElementById('XbacktoMap');

function MemberbacktoMap(){

  window.location.replace('./Maps.html');

};

XbacktoMap.addEventListener(`click`,MemberbacktoMap);




// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//登出

let SingOutBtn = document.getElementById('SingOut');

function SingOut(){

    localStorage.removeItem("token");
    window.location.replace('./Login.html');
};


SingOutBtn.addEventListener('click',SingOut);