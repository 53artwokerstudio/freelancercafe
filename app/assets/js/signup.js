const SignupUserAPI = 'https://freelancercafe.rocket-coding.com/SignUp';
   
//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    
/////登入//////

    let SignUpBtn = document.getElementById('signupbtn');

    let userName = document.getElementById('signup-username');
    let SignUpEmailAdd = document.getElementById('signup-emailadd');
    let SignUpPassword = document.getElementById('signup-password');


    let SignupUserAry = [];

    function Signup (){

        let usersignup = {};


        usersignup.userName = userName.value;
        usersignup.userEmail = SignUpEmailAdd.value;
        usersignup.userPassword = SignUpPassword.value;

        SignupUserAry.push(usersignup);

        

        console.log(usersignup);
        

        axios.post(SignupUserAPI,usersignup)
        .then(function (response) {

            console.log(JSON.stringify(response.data));
            console.log(response);
            window.location.replace('./SignUp-Check.html');
        })
          .catch(function (error) {
            console.log(error);
            alert('輸入資料格式錯誤，請重新檢查後送出！');
          });

    }

    SignUpBtn.addEventListener('click',Signup);

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿



