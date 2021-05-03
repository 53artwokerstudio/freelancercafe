//我的位置
const CurrentPos = JSON.parse(localStorage.getItem('mypos'));
const SingleShopID = JSON.parse(localStorage.getItem('SingleShop'));

const GetSingleShopDataAPI = 'https://freelancercafe.rocket-coding.com/Cafe/'+SingleShopID;

//換Icon(研究一下)
let SetIcon      = "https://freelancercafe.rocket-coding.com/image/map-marker.png";


let ToSingleShopDataPos = {};


axios.get(GetSingleShopDataAPI,CurrentPos)
.then(function (response) {

    console.log(response.data);
    let ToSingleShopData = response.data;

    SingleShopPos(ToSingleShopData);
    DirectionstoshopMap();

})
.catch(function (error) {
console.log(error);
});


function SingleShopPos(ToSingleShopData) {

     ToSingleShopDataPos.lat = ToSingleShopData.latitude;
     ToSingleShopDataPos.lng = ToSingleShopData.longitude;
    
    console.log(ToSingleShopDataPos);
}





function DirectionstoshopMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: CurrentPos,
  });

  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  document.getElementById("mode").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;

  console.log(ToSingleShopDataPos);

  directionsService.route(
    {
      origin: CurrentPos,
      destination: ToSingleShopDataPos,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode],
    },
    (response, status) => {
      if (status == "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}