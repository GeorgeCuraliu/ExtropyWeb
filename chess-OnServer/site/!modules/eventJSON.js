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
}