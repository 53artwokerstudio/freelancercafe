//API
let UserMsg = 'https://freelancercafe.rocket-coding.com/UserMsg';

let MemberReview = '';
let ReTimeItem = '';

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
//AXIOS

axios.get(UserMsg,license)
.then(function (response) {

  console.log(response.data);
  MemberReview = response.data;

  ReviewOfMember();

})
.catch(function (error) {
  console.log("沒有收到資料"+error);

});

//_______評價渲染
let MemberReviewBox = document.getElementById('MemberReviewBox');
let EditPen;

function ReviewOfMember() {
    
    let ReviewItem = '';

    MemberReview.forEach( function (item,i) {

        ReviewItem +=`
        <li class="MemberReview btLine"">
                
        <div class="MemberUserPhoto">
            <img src="${item.photo}" alt="">
        </div>
        
        <ul class="ReviewText">
            <li class="Flex">
                <h3 class="mr16">${item.shopName}</h3>
                
                    <i class="fas fa-pen" 
                    id="${item.msgId}"
                    data-edittask=${i}></i>
                
                <li><p class="hint">留言時間：
                ${String(item.addDateTime.split(`T`)[0]+' '+item.addDateTime.split(`T`)[1].split(`.`)[0])}</p></li> 
                
            </li>
            <li><p>${item.content}</p></li>   
              
        </ul>

        </li>
        `

    })
    
    MemberReviewBox.innerHTML = ReviewItem;
 
}; 

function  ToEditPen(e) {
    console.log(e);
    console.log(e.path[0].id); 

    if(e.path[0].className !== "fas fa-pen"){
        return
    }

    let MsgNowId = Number(e.path[0].id);

    MemberReview.forEach( function (item,i){
    console.log(item.msgId);
    

    if (item.msgId === MsgNowId){
        console.log('爹娘我成功了');

        localStorage.setItem('MsgID',JSON.stringify(MsgNowId));
        window.location.replace('./MemberMain_ReviewEdit.html');

    }
    })

};


MemberReviewBox.addEventListener(`click`,ToEditPen);
