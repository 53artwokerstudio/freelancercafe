const LoginUserAPI = 'https://freelancercafe.rocket-coding.com/Login';


/////登入//////

    let LoginBtn = document.querySelector('.login-btn');
    let emailadd = document.getElementById('login-emailadd');
    let password = document.getElementById('login-password');


    let userAry = [];

    function Login (){

        let userlogin = {};

        userlogin.userEmail = emailadd.value;
        userlogin.userPassword = password.value;

        userAry.push(userlogin);

        //印出各值，測試完刪除
        console.log(emailadd.value);
        console.log(password.value);
        console.log(userlogin);
        

        axios.post(LoginUserAPI,userlogin)
        .then(function (response) {
            
            console.log(response);
            console.log(response.data.token);
            console.log(response.data.userGuid);

            //const userGuid = response.data.userGuid;
            const Token = response.data.token;
            
            
            localStorage.setItem("token",Token);

            window.location.replace(`./Maps.html`);

        })
          .catch(function (error) {
            console.log(error);
          });

    }

    LoginBtn.addEventListener('click',Login);

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
