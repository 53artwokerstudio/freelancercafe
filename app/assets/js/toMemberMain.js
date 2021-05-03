//調用會員資料
let UserToken = localStorage.getItem("token");
let UserAPI = 'https://freelancercafe.rocket-coding.com/User';
const license = { headers: { Authorization: `Bearer ${UserToken}` }};



let minUserPhoto = document.querySelector('.min-userPhoto');

 
if ( UserToken === "" || UserToken === null ) {

    console.log("尚未登入");

    function toUserMain(){

      window.location.replace('./UserMain.html');

    };

  minUserPhoto.addEventListener('click',toUserMain);

  
}else{

  axios.get(UserAPI,license)
  .then(function (response) {

    console.log(response.data);
    //window.location.replace('./Maps.html');

    getMinUserPhoto = response.data.userPhoto;
    
    ShowMinUserPhoto();

  })
  .catch(function (error) {
    console.log(error);
  });

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  //跳轉到會員

  function toMemberMain(){
      window.location.replace('./memberMain.html');
  };
  
  minUserPhoto.addEventListener('click',toMemberMain);

};

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//印出會員頭像

function ShowMinUserPhoto() {
  console.log(getMinUserPhoto);
  
  minUserPhoto.innerHTML = `
  <div class="min-userPhoto">
  <img src="${getMinUserPhoto}" alt="">
  </div>
  `
};
