const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5432;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const path = './db.db';
const db = new sqlite3.Database(path);

app.post("/accountType", (req, res)=> {//req.body.name  req.body.type
    console.log(req.body.name , req.body.type);
    let query = "UPDATE users SET soul = ? WHERE name = ?";
    db.run(query, req.body.type, req.body.name, err => {
        if(err){return res.status(500).send()}
        return res.status(200).send("everything ok, i hope");
    })
})

app.post("/addRecruit", (req, res) => {//req.body.name  req.body.reason req.body.classPD  req.body.number  req.body.departament
    let query = "INSERT INTO recruits(name, reason, class, departament, number) VALUES(?, ?, ?, ?, ?)"
    db.run(query, req.body.name, req.body.reason, req.body.classPD, req.body.departament, req.body.number, err => {
        if(err){return res.status(500).send()}
        return res.status(200).send()
    })
})

app.post("/addSponsor", (req, res) => {//req.body.png
    let query = "INSERT INTO sponsors(image) VALUES(?)";
    db.run(query, req.body.png, err => {
        if(err){return res.status(500).send()}
        return res.status(200).send();
    })
})

app.post("/addEvent", (req, res) => {//req.body.name  req.body.description  req.body.date  req.body.image   req.body.file
    console.log(req.body.name,  req.body.description , req.body.date ,    req.body.file)
    const tableName = "YOE_" + req.body.file;
    const query = `INSERT INTO ${tableName} (name, description, date, image) VALUES (?, ?, ?, ?)`;

    db.run(query, req.body.name, req.body.description, req.body.date, req.body.image, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });

})

app.post("/addYearOfEvents", (req, res) => {

})

app.post("/addMember", (req, res) => {//req.body.image req.body.description req.body.departament req.body.name
    console.log(req.body.image, req.body.description, req.body.departament, req.body.name);
    let query = "INSERT INTO members(name, image, description, departament) VALUES(?, ?, ?, ?)";
    db.run(query, req.body.name, req.body.image, req.body.description, req.body.departament, err => {
        if(err){
            return res.status(500).send();
        }
        return res.status(200).send();
    })
})

app.post("/addMessage", (req, res) => {//req.body.message
    let query = "INSERT INTO messages(image) VALUES(?)";
    db.run(query, req.body.message, err => {
        if(err){
            return res.status(500).send();
        }
        return res.status(200).send();
    })
})

app.post("/addUser", (req, res) => {//req.body.username  req.body.password
    console.log(req.body.username, req.body.password);
    console.log("creating user");
    let query = "SELECT * FROM users WHERE name = ?";
    db.get(query, req.body.username, (err, row) => {
        if(err){
            return res.status(500).send;
        }
        if(row){
            return res.status(200);
        }else{
            query = "INSERT INTO users(name, password, soul) VALUES (?, ?, `true`)";
            db.run(query, req.body.username, req.body.password, err => {
                if(err){return res.status(500).send()}
                return res.status(200).send(true);
            })
        }
    })
})

app.post("/createYOE", (req, res) => {//req.body.YOE
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS YOE_${req.body.YOE.replace(/-/g, "_")} (
        name TEXT,
        description TEXT,
        date TEXT,
        image TEXT
    );`;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return res.status(500).send();
        } else {
            console.log('Table created or already exists.');
        }
        return res.status(200).send();
    });
})

app.post("/deleteRecruits", (req, res) => {
    let query = "DELETE FROM recruits";
    db.run(query, err=> {
        if(err){return res.status(500).send()}
        return res.status(200).send()
    })
})

app.post("/deleteMember", (req, res) => {//req.body.name
    console.log(req.body.name);
    let query = "DELETE FROM members WHERE name = ?";
    db.run(query, req.body.name, err=> {
        if(err){return res.status(500).send()}
        return res.status(200).send("member deleted");
    })
})

app.post("/deleteSponsor", (req, res) => {//req.body.index
    query = "DELETE FROM sponsors WHERE key = ?";
    db.run(query, req.body.index, err => {
        if(err){return res.status(500).send()}
        return res.status(200).send()
    })
})

app.get("/eventsYears", (req, res) => {

    let query = "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'YOE%'";
    query = "SELECT tbl_name FROM sqlite_master"
    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).send();
        }
        console.log("table names");
        console.log(rows);

        let YOE = rows.map(row => row.tbl_name).filter(value => value.substring(0, 3) === "YOE");
        YOE = YOE.map(val=> val.substring(4,13));
        console.log(YOE);

        return res.status(200).send(YOE);
    })
})

app.post("/getEvents", (req, res) => { //req.body.file
    let query = `SELECT * FROM YOE_${req.body.file}`;
    db.all(query, (err, rows)=> {
        if(err){return res.status(500).send()}
        return res.status(200).send(rows);
    })
})

app.get("/getSponsors", (req, res) => {
    let query = "SELECT * FROM sponsors";
    db.all(query, (err, row) => {
        if(err){return res.status(500).send()}
        return res.status(200).send(row);
    })
})

app.get("/getRecruits", (req, res) => {
    let query = "SELECT * FROM recruits";
    db.all(query, (err, row) => {
        if(err){return res.status(500).send()}
        return res.status(200).send(row);
    })
})

app.get("/getMessages", (req, res) => {
    console.log("getting messages");
    let query = "SELECT * FROM messages";
    db.all(query, (err, row) => {
        if(err){return res.status(500).send()}
        return res.status(200).send(row);
    })
})

app.get("/getMembers", (req, res) => {
    let query = "SELECT * FROM members";
    db.all(query, (err, row) => {
        if(err){return res.status(500).send()}
        return res.status(200).send(row);
    })
})

app.post("/logIn", (req, res) => {//req.body.name req.body.password
    console.log(req.body.name, req.body.password);
    let query = "SELECT * FROM users WHERE name = ? AND password = ?"
    db.get(query, req.body.name, req.body.password, (err, row) => {
        if(err){
            return res.status(500).send();
        }
        console.log(row);
        if(row){
            return res.status(200).send(row.soul == "extropy" ? "member" : "true");
        }else{
            return res.status(200).send();
        }
    })
})

app.listen(port, () => {
    console.log("EXTROPETY ON TOP:)")
})