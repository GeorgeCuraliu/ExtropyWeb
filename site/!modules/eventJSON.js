import axios from "https://cdn.skypack.dev/axios";

export class Events{

async getNamesOfEventsJSON(){//this will get just the names of files with events(for menu on main pane-events square)
  try {
    const response = await axios.get("http://localhost:5432/eventsYears");
    return response.data;
  } catch (error) {
    console.error("Error during retrieving server data:", error);
  }
}

async getJSONcontent(file){
  try{
  const events = await axios.post("http://localhost:5432/getEvents", {file});
  console.log(events.data);
  return events.data;
  }catch(err){
    console.log(err);
  }
}

sendSponsorPng(png){
    axios.post("http://localhost:5432/addSponsor", {png})
}

async getSponsors(){
  try {
    const response = await axios.get("http://localhost:5432/getSponsors");
    return response.data; // assuming you want to return the response data
  } catch (error) {
    console.error("Error during retrieving server data:", error);
    throw error; // rethrow the error for further handling if needed
  }
}

deleteSponsor(index){
  axios.post("http://localhost:5432/deleteSponsor",{index});
}
deleteRecruits(){
  axios.post("http://localhost:5432/deleteRecruits", {delete: "confirm"});
}
async sendData(name, reason, classPD, number, departament){
    axios.post("http://localhost:5432/addRecruit", {name: name, reason: reason, classPD: classPD, number: number, departament:departament})
}
async getRecruits(){
  console.log("get recruits");
  try {
    const response = await axios.get("http://localhost:5432/getRecruits");
    return response.data;
  } catch (error) {
    console.error("Error during retrieving server data:", error);
    throw error;
  }
}
async accountType(user, type){
  axios.post("http://localhost:5432/accountType", {name: user, type: type})
  .then(response => {return response.data})
}
async getMembers(){
  try{
    const res = await axios.get("http://localhost:5432/getMembers")
    return res.data;
  }catch(err){
    console.log(err);
  }

}
async logIn(name, password){
  console.log("log in atempt");
  try {
    const response = await axios.post("http://localhost:5432/logIn", { name: name, password: password });
    return response.data; // assuming you want to return the response data
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // rethrow the error for further handling if needed
  }
}
}