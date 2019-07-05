const mysql = require('mysql')

class SQL {
constructor(host, user, password, database){
    this.connection=mysql.createConnection({
        host:host,
        user:user,
        password:password,
        database:database
    })
}
// insert(name, email, telephone, password){
//     this.connection.query(`INSERT INTO user SELECT '${name}', '${email}', '${telephone}', '${password}';`,(error, results)=>{
//         if (error)throw error;
//     })
// }

insert(username, name, age, hashword){
    this.connection.query(`INSERT INTO hashing SELECT '${username}', '${name}', '${age}, '${hashword};`,(error, results)=>{
        if (error)throw error;
    })
}

// insert(password, hashword){
//     this.connection.query(`INSERT INTO hash SELECT '${password}', '${hashword}';`,(error, results)=>{
//         if (error)throw error;
//     })
// }

fetch(username) {        
    return new Promise((resolve, reject) => {            
        this.connection.query(`SELECT * FROM tableTwo WHERE username='${username}'`, (err, results) => {  if (err) reject(err);                
            resolve(results[0]);            
        });        
    });    
}


}

// Extension to the task, modify the insert method so that it can accept different parameters similar to how we passed the connection options into the class


module.exports = SQL