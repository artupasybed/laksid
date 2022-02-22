// const app = new Vue({

//     el: '#main',
   
//     data: {

//         result: "",
//         responseAvailable: false,
//         apiKey: '<YOUR_RAPIDAPI_KEY>'

//     },

//     methods: {

//         fetchAPIData( ) { 
//             this.responseAvailable = false;

//         fetch("https://jokes-database.p.rapidapi.com/", {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "jokes-database.p.rapidapi.com",
//                 "x-rapidapi-key": this.apiKey
//             }
//         })
//         .then(response => { 
//             if(response.ok){
//                 return response.json()    
//             } else{
//                 alert("Server returned " + response.status + " : " + response.statusText);
//             }                
//         })
//         .then(response => {
//             this.result = response.body; 
//             this.responseAvailable = true;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//         }
//     }

// })



   let network = {
                "async": true,
                "crossDomain": true,
                "url": "https://us1.unwiredlabs.com/v2/process.php",
                "method": "POST",
                "headers": {},
                "processData": false,
                "data": "{\"token\": \"de235bb988154a\",\"radio\": \"gsm\",\"mcc\": 310,\"mnc\": 410,\"cells\": [{\"lac\": 7033,\"cid\": 17811}],\"wifi\": [{\"bssid\": \"00:17:c5:cd:ca:aa\",\"channel\": 11,\"frequency\": 2412,\"signal\": -51}, {\"bssid\": \"d8:97:ba:c2:f0:5a\"}],\"address\": 1}"
                }
                $.ajax(settings).done(function (response) {
                console.log(response);
                });
                return network;
