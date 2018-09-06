var access_token = "4399740a076000c097a249af6e334d7b0e060baa";
var axios = require("axios").default;
var url  = "https://www.strava.com/api/v3";
var headers = {
  "Authorization" : "Bearer " + access_token
}

function getClubs(){
  return new Promise((resolve,reject)=>(
    axios({
      url : url + "/athlete/clubs",
      method : "GET",
      headers : headers
    }).then(e=>resolve(
      e.data.map(function(e,i){
        return {
          id : e.id, name : e.name, url : e.url
        }
      })
    )).catch(e=>reject(e))
  ));
}

function getClubActivities(id){
  return new Promise((resolve,reject)=>(
    axios({
      url : url + "/clubs/" + id + "/activities",
      method : "GET",
      headers : headers
    }).then(e=>resolve(
      e.data.map(function(e,i){
        return {
          e : e
        }
      })
    )).catch(e=>reject(e))
  ));
}


getClubs().then(e=>{
  
  getClubActivities(45291).then(e=>{
    console.log(e);
  })


})