console.log(license);

let MsgID = JSON.parse(localStorage.getItem('MsgID'));

//API
let SingleUserMsgAPI    = 'https://freelancercafe.rocket-coding.com/UserMsg/'+MsgID;
let PutEditUserMsgAPI   = 'https://freelancercafe.rocket-coding.com/EditUserMsg';
let PutDelUserMsgAPI    = 'https://freelancercafe.rocket-coding.com/DelUserMsg';


//Data
let MsgLastData = '';

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//AXIOS

axios.get(SingleUserMsgAPI,license)
.then(function (response) {

  console.log(response.data);
  MsgLastData = response.data;

  RenderOldMsgData();
})
.catch(function (error) {
  console.log(error);
});

//_______基本資訊渲染

let CafeReviewMsg = document.getElementById('CafeReviewMsg');

function RenderOldMsgData() {

    console.log(MsgLastData);
    
    
    CafeReviewMsg.innerHTML =`

    <ul class="FdcAllCenter" id ="CafeReviewMsg">
    <li><h2>${MsgLastData.shopName}</h2></li>
    <li><p class="hint">
    首次留言時間：${String(MsgLastData.addDateTime.split(`T`)[0]+' '+MsgLastData.addDateTime.split(`T`)[1].split(`.`)[0])}
    </p></li>
    
    <li><p class="hint">
    編輯留言時間：
    ${(MsgLastData.editDateTime ? String(MsgLastData.editDateTime.split(`T`)[0]+' '+MsgLastData.editDateTime.split(`T`)[1].split(`.`)[0]):'沒有編輯時間')}
    
    </p></li>
    

    <li>
        
        <input 
        type="text" 
        name="" 
        id="InputEditReviewText"
        value="${MsgLastData.content}"
        class="EditReviewText ReviewInputType"
        >
    
    </li>
    </ul>
    `
}

//_______送出評論
let EditReviewBtn = document.getElementById('EditReviewBtn');
let AddReviewData = {};


function PutEditMsg(e) {
    console.log(e);


    let LastMsg = String(e.path[0].ownerDocument.activeElement.defaultValue);
    let NewMsg  = String(InputEditReviewText.value);


    if (LastMsg != NewMsg) {
        console.log(LastMsg);
        console.log(NewMsg);

        AddReviewData.id      = MsgLastData.msgId;
        AddReviewData.content = NewMsg;

        console.log(AddReviewData);

        axios.put(PutEditUserMsgAPI,AddReviewData,license)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.replace('./MemberMain_Review.html')
        })
        .catch(function (error) {
            console.log(error);
        });

    }else{
        Swal.fire('您沒有修改留言！')
    }
}

EditReviewBtn.addEventListener(`click`,PutEditMsg);

//_______刪除此評論
let DelReviewBtn = document.getElementById('DelReviewBtn');
let DelMsgID = { id : MsgID,}

function DelReview() {

    axios.put(PutDelUserMsgAPI,DelMsgID,license)
    .then(function (response) {

        console.log(JSON.stringify(response.data));
        window.location.replace(`./MemberMain_Review.html`)
    
    })
    .catch(function (error) {
        console.log(error);
    });

    
}

DelReviewBtn.addEventListener(`click`,DelReview);