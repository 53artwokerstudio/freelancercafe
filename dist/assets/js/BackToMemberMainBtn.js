// _________返回地圖主頁
let BackToAllMapsBtn = document.getElementById('BackToAllMapsBtn');

function BackToAllMaps() {
    window.location.replace('./Maps.html');
}

BackToAllMapsBtn.addEventListener(`click`,BackToAllMaps);