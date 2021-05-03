
let EditMemberAPI       = 'https://freelancercafe.rocket-coding.com/Edit/User/';
let PostUpLoadFileAPI   = 'https://freelancercafe.rocket-coding.com/UpLoadFile/';

let originalName    = '';

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//AXIOS


axios.get(UserAPI,license)
.then(function (response) {
    
    console.log(response.data);
    console.log(response.data.userGuid);
    
    originalName          = response.data.userName;
    userGuid              = response.data.userGuid;
    userOriginalPhoto     = response.data.userPhoto;
    
    console.log(userGuid);


    originalMember();
    RefreshUserMainPhoto();
    // EditMemberData();
    lastNameInINPUT(originalName);

})
.catch(function (error) {
  console.log(error);
});



// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//印出原名
let LastName = document.getElementById('originalName');


function originalMember(){
    LastName.innerHTML  = originalName;
};

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//印出照片

let UserMainPhoto = document.getElementById('UserMainPhoto');

function RefreshUserMainPhoto() {

  console.log(userOriginalPhoto);
  
  UserMainPhoto.innerHTML =`
  <div class="userPhoto" id="UserMainPhoto">
  <img src="${userOriginalPhoto}" alt="">
  </div>`; 
  
};



// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//修改資料欄位
let EditDataAry = [];

let EditName     = document.getElementById('old-username');
let OldPassword  = document.getElementById('old-password');
let NewPassword  = document.getElementById('new-password');

let EditDoneBtn  = document.getElementById('EditDoneBtn');

let EditData = {};

// function lastNameInINPUT(originalName) {

//   EditName.placeholder.innerHTML = originalName;

// };


function EditMemberData() {

    EditData.userName       =   EditName.value;
    EditData.oldPassword    =   OldPassword.value;
    EditData.newPassword    =   NewPassword.value;

    EditDataAry.push(EditData);

    axios.put(EditMemberAPI,EditData,license)
    .then(function (response) {
        console.log(JSON.stringify(response.data));

        localStorage.removeItem('token');
        window.location.replace(`./Login.html`);
        alert("修改成功 請重新登入！")
      })
      .catch(function (error) {
        console.log(error);
        alert("資料格式不正確 請重新輸入！")
      });

    EditDataAry = [];
};



EditDoneBtn.addEventListener('click',EditMemberData);



// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//重新試寫推頭像到API

//空物件，將圖片推進空物件中
//按確認上傳/完成編輯後，將物件Put到遠端

let UploadUserPhotoBtn = document.querySelector('.upload-Btn');
const fileUploader = document.querySelector('#file-uploader');

let form = new FormData();

fileUploader.addEventListener('change', (e) => {
  console.log(e.target.files); // get file object
  form.append("product[photos][]", e.target.files[0])
  
});


 UploadUserPhotoBtn.addEventListener(`click`,function(){
  fetch(PostUpLoadFileAPI, {

    method: 'POST',
    headers: {Authorization : `Bearer ${UserToken}`},
    body: form,

  }).then((response) => {
      return response.json(); 
    }).then((jsonData) => {

      console.log(jsonData);
      history.go(0);
    
    }).catch((err) => {
      console.log('錯誤:', err);
  })
  
 
  
 });





// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿




