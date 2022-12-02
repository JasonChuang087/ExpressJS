function sendRequest(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("John");
            reject("500 error");
        },2000);
    });
}

let promise = sendRequest();
console.log(promise);
// 要用then去取得promise內容
promise.then(function(username){
    console.log("hello "+username);
})

async function getName(){
    try{
        let username = await sendRequest();
        //let username = await fetch("https://jsonplaceholder.typicode.com/users");
        //.json會返回promise 在promise前加入await等待轉換
        //username被轉換成json變量的值
        //username = await username.json();
        console.log(username);
    }
    //reject返回的錯誤
    catch(message){
        console.log(`Error: ${message}`);
    }

}

getName();
// document.getElementById("second-title").innerHTML = "Hello JavaScript!";
// var btn = document.getElementById("action-btn")
// btn.onclick = function(){
//     alert("click");
// }
// fetch('https://json.org/example.html',{mode: 'no-cors'})
//    .then(response => response.json)
//    .then(data => console.log(data));

/*
let sentToAirport = false;
let p = new Promise(function(resolve,reject){
    if(sentToAirport){
        console.log("send to airport");
        resolve("send to airport");
    }
    else{
        console.log("failed")
        reject("failed to airport");
    }
});

//執行完上方再執行這裡
p
.then(function(msg){console.log(`${msg} promise solved`)})
.catch(function(msg){console.log(`${msg} promise rejected`)});

let f = fetch('https://jsonplaceholder.typicode.com/users')
    
f
.then(function(data){
    //回傳的promise再接到下方then
    return data.json();
})
.then(function(jsonData){
    console.log(jsonData);
    return 100;
})
.then(function(nums){
    console.log(nums);
})
*/
