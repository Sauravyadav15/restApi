const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');



//  let q= `INSERT INTO user (id, username, email, password) VALUES ?`;
//  let user = [["236a","234lglaa", "234@gmail.coma","234Ta"],
//   ["237b","235lglab","235@gmail.comb","235Tb"]];
// try{
//     conncetion.query( q , [user], (err,result)=>{     
//         if(err) throw err;
//         console.log(result);
//         console.log(result.length);
//       });
// } catch(err){
//     console.log(err);
//         console.log(result);
// }
// let  createRandomUser2 =() =>{
//     return {
//       userId: faker.string.uuid(),
//       username: faker.internet.username(), // before version 9.1.0, use userName()
//       email: faker.internet.email(),
//       password: faker.internet.password(),  
//     };
//   }
//   console.log(createRandomUser2());

const conncetion =mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "linkTest",
  password: "Sky@jnv#1545",
});

// INSERT IN BULK


let  getRandomUser2 =() =>{
  return [
   faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
   faker.internet.email(),
    faker.internet.password(),  
  ];
}
console.log(getRandomUser2());

let q2= `INSERT INTO user (id, username, email, password) VALUES ?`;
let data =[];
for(let i=1; i<=100; i++){
  data.push(getRandomUser2());
}
try{
    conncetion.query( q2 , [data], (err,result)=>{     // to give command in sql we use this line
        if(err) throw err;
        console.log(result);
        console.log(result.length);
      });
} catch(err){
    console.log(err);
        console.log(result);
}

conncetion.end();