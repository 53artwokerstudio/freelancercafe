// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//AXIOS

let MemberName = '';
let MemberEmail = '';


axios.get(UserAPI,license)
.then(function (response) {

  console.log(response.data);

  MemberName  = response.data.userName;
  MemberEmail =  response.data.userEmail;

  MemberInfo();
//   EditMember();


})
.catch(function (error) {
  console.log(error);
});

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//印出會員資訊

let UserName     = document.querySelector('.UserName');
let UserEmail    = document.querySelector('.UserEmail');

function MemberInfo(){

    UserName.innerHTML      = MemberName;
    UserEmail.innerHTML     = MemberEmail;
};

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

// let EditUserName = document.getElementById('EditUserName');

// function EditMember(){
//     EditUserName.innerHTML  = MemberName;
// };

