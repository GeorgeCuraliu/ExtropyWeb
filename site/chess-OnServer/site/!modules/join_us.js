export class JoinUs{
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
}