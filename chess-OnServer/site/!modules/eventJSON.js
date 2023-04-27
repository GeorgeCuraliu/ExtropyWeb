export class Events{


async getNamesOfEventsJSON(){//this will get just the names of files with events(for menu on main pane-events square)
  let response = new Array();
  let fileNames = await $.ajax({//whis will make the function wait for the response from server
        type:"GET",
        url: "http://localhost:1233/chess-OnServer/server/eventsYears.php",
        data: 'json',
  });
  fileNames = JSON.parse(fileNames);
  fileNames.forEach(element => {
    element = element.split(`.`);
    response.push(element[0]);//will get rid of .json part of name
  });
  console.log(response);
  return response;
}

async getJSONcontent(file){
  let eventsOfYear = await $.ajax({
  type: "GET",
  url:`http://localhost:1233/chess-OnServer/server/events/${file}.json`,
  data:`json`
  })
  console.log(eventsOfYear);
  return eventsOfYear;
}

sendSponsorPng(png){
    $.ajax({
      type:"POST",
      url: "http://localhost:1233/chess-OnServer/server/addSponsor.php",
      data: {png: png},
      success: function(response, status, xhr){
        console.log(response);
      },
      error: function(response, status, xhr){

      }
    });
}

async getSponsors(){
  let fileNames = await $.ajax({//whis will make the function wait for the response from server
        type:"GET",
        url: "http://localhost:1233/chess-OnServer/server/sponsors.json",
        data: 'json',
  });
  console.log(fileNames);
  return fileNames;
}

deleteSponsor(index){
  $.ajax({
    type:"POST",
    url: "http://localhost:1233/chess-OnServer/server/deleteSponsor.php",
    data: {index: index},
    success: function(response, status, xhr){
      console.log(response);
    },
    error: function(response, status, xhr){

    }
  });
}
deleteRecruits(){
  $.ajax({
    type:"POST",
    url: "http://localhost:1233/chess-OnServer/server/deleteRecruits.php",
    data: {delete: "confirm"},
    success: function(response, status, xhr){
      console.log(response);
    },
    error: function(response, status, xhr){

    }
  })
}
async sendData(name, reason, classPD, number, departament){
  $.ajax({
      type:"POST",
      url: "http://localhost:1233/chess-OnServer/server/addRecruit.php",
      data: {name: name, reason: reason, classPD: classPD, number: number, departament:departament},
      success: function(response, status, xhr){
        console.log(response);
      },
      error: function(response, status, xhr){

      }
    });
}
async getRecruits(){
 let recruits = await $.ajax({
      type: "GET",
      url: "http://localhost:1233/chess-OnServer/server/recruits.json",
      data: "json"
  })
  return recruits;
}
async accountType(user, type){
  let responseReturn = await $.ajax({
    type:"POST",
    url: "http://localhost:1233/chess-OnServer/server/accountType.php",
    data: {user: user, type: type},
    success: function(response, status, xhr){
      console.log(response);
    },
    error: function(response, status, xhr){

    }
  });
  return responseReturn;
}
}