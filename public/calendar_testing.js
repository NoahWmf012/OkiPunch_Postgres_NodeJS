//For testing//


require("dotenv").config();
const knex = require("knex")({
    // CODE HERE
    client: 'postgresql',
    connection: {
        database: "chingyiyeung",
        user: "postgres",
        password: "password",
        dateStrings: true
    },
});

let in_time = "";
let out_time = "";
let employee_id = "";
let inDate = [];
let outdate = "";
in_date_result = "";

// below return it as correct date, 19->20, 20->21

// let query = knex.select("employee_id", "in_date").from("attendance")
//     .where("employee_id", 1)
//     .orderBy('employee_id', 'asc');

// query.then((rows) => {
//     // console.log(rows); //!PROBLEM HERE! it return 19 & 20, therefore, I changed it to 20 & 21 below
//     for (let j = 0; j < rows.length; j++) {
//         let value = (rows[j].in_date);

//         value = value.toString();
//         console.log(value);

//         const date = value.split(' ', 4).join(' ');
//         const time = value.split(' ').slice(4).join(' ').split(' ')[0];

//         let [month, day, year] = date.split(' ').slice(1).join(' ').split(' ');

//         const [hours, minutes, seconds] = time.split(':');
//         let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         month = (months.indexOf(month) + 1)
//         let alteredDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds)));

//         // console.log(alteredDate);
//     }
// }).catch((error) => {
//     console.log(error);
// });




// id: "001",//staff_id
// name: "Author's Birthday",//"Punctual", "Late", "Absence"
// description: "Author's note: Thank you for using EvoCalendar! :)",//additional information e.g.late/absence reason
// date: "2022/08/24", //default format: February/15/1999  ,or  [ today.getMonth() + 1 + "/" + week_date.start + "/" + today.getFullYear(), today.getMonth() + 1 + "/" + week_date.end + "/" + today.getFullYear() ]
// type: "birthday", //"punctual", "late", "absence"

//e.g. id:employee_id, name:"punctual", description:"08:50:50", date:"2022/08/24", type""punctual"
// let command = async function (id) {
//     //acquire in_time -> name = type
//     let name = [];
//     let query_time = await knex
//         .select("in_time")
//         .from("attendance")
//         .where("employee_id", 3)
//         .orderBy("in_date", "asc")
//         .then((rows) => {
//             try {
//                 for (i = 0; i < rows.length; i++) {
//                     if (n == null) {
//                         name.push("Absence");
//                     } else if (((n).split(':')[0]) < 9 || ((n).split(':')[0]) == 9 && ((n).split(':')[1]) == 0 && ((n).split(':')[2]) == 0) {
//                         name.push("Punctual");
//                     } else if ((((n).split(':')[0]) >= 9) && (((n).split(':')[1]) > 0) && (((n).split(':')[2]) == 0)) {
//                         name.push("Late");
//                     } else {
//                         name.push("Absence");
//                     }
//                 }
//             } catch {
//                 console.log("Employee Service Error - query_time");
//             }
//         });
//     // console.log(name);


//     //acquire in_time & out_time description
//     let description = [];
//     let query_in_time = await knex
//         .select("in_time", "out_time")
//         .from("attendance")
//         .where("employee_id", 3)
//         .orderBy("in_date", "asc")
//         .then((rows) => {
//             try {
//                 console.log(rows);
//                 for (j = 0; j < rows.length; j++) {
//                     if (rows[j].in_time == null) {
//                         description.push("Absence");
//                     } else {
//                         description.push(`IN:${rows[j].in_time}  OUT:${rows[j].out_time}`);
//                     }
//                 }
//             } catch {
//                 console.log("Employee Service Error - query_in_time");
//             }
//         });
//     // console.log(description);

//     //acquire date
//     let queryDate = await knex.select("in_date").from("attendance")
//         .where("employee_id", 1)
//         .orderBy('in_date', 'asc')
//         .then((rows) => {

//             let value = [];
//             let date = [];
//             let time = [];
//             let alteredDate = [];
//             let resultDate = [];
//             // console.log(rows); //!PROBLEM HERE! it return 19 & 20, therefore, I changed it to 20 & 21 below
//             for (let j = 0; j < rows.length; j++) {

//                 value.push(rows[j].in_date.toString());

//                 date.push((value[j]).split(' ', 4).join(' '));

//                 time.push(value[j].split(' ').slice(4).join(' ').split(' ')[0]);

//                 let [month, day, year] = date[j].split(' ').slice(1).join(' ').split(' ');

//                 const [hours, minutes, seconds] = time[j].split(':');
//                 let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//                 month = (months.indexOf(month) + 1)
//                 alteredDate.push(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds))));
//                 resultDate.push(alteredDate[j].toISOString().split('T')[0]);
//             }
//             // console.log(resultDate);

//         }).catch((error) => {
//             console.log("Employee Service Error - queryDate");
//         });
// }

// command();


// let id = 3;

// //e.g. id:employee_id, name:"punctual", description:"08:50:50", date:"2022/08/24", type""punctual"
// let command = async function () {
//     //acquire type
//     let summaryObject = {};
//     let status = [];
//     let query_time = await knex
//         .select("status")
//         .from("attendance")
//         .where("employee_id", id)
//         .orderBy("id", "asc")
//         .then((rows) => {
//             try {
//                 for (i = 0; i < rows.length; i++) {
//                     status.push(rows[i].status);
//                 }
//                 summaryObject.status = status;
//             } catch {
//                 console.log("Employee Service Error - query_time");
//             }
//         });



//     //acquire in_time & out_time description
//     let description = [];
//     let query_in_time = await knex
//         .select("in_time", "out_time")
//         .from("attendance")
//         .where("employee_id", id)
//         .orderBy("id", "asc")
//         .then((rows) => {
//             try {
//                 for (j = 0; j < rows.length; j++) {

//                         description.push(`IN:${rows[j].in_time}  OUT:${rows[j].out_time}`);

//                 }
//             } catch {
//                 console.log("Employee Service Error - query_in_time");
//             }
//         });
//     summaryObject.description = description;


//     //acquire date
//     let queryDate = await knex.select("in_date").from("attendance")
//         .where("employee_id", id)
//         .orderBy('id', 'asc')
//         .then((rows) => {
//             // let value = [];
//             // let date = [];
//             // let time = [];
//             // let alteredDate = [];
//             // let resultDate = [];
//             let dateArray = [];
//             // console.log(rows); //!PROBLEM HERE! it return 19 & 20, therefore, I changed it to 20 & 21 below
//             for (let j = 0; j < rows.length; j++) {
//                 // value.push(rows[j].in_date.toString());
//                 // date.push((value[j]).split(' ', 4).join(' '));
//                 // time.push(value[j].split(' ').slice(4).join(' ').split(' ')[0]);
//                 // let [month, day, year] = date[j].split(' ').slice(1).join(' ').split(' ');
//                 // const [hours, minutes, seconds] = time[j].split(':');
//                 // let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//                 // month = (months.indexOf(month) + 1)
//                 // alteredDate.push(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds))));
//                 // console.log(alteredDate);
//                 // resultDate.push(alteredDate[j].toISOString().split('T')[0]);
//                 // console.log(resultDate);

//                 const date = rows[j].in_date;
//                 date.setDate(date.getDate() + 1);
//                 dateArray.push(date.toISOString().split('T')[0]);
//             }
//             summaryObject.date = dateArray;
//         });
//     console.log(summaryObject);
//     return summaryObject; // include status, description, time
// }
// command();



// let command1 = async function () {
//     //in_date
//     let today = new Date();
//     let dd = String(today.getDate()).padStart(2, '0');
//     let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     let yyyy = today.getFullYear();
//     today = yyyy + '/' + mm + '/' + dd;

//     //in_time
//     let d = new Date();
//     let n = d.toLocaleTimeString();
//     console.log(n)


//     //status
//     let status = "";
//     if (n == null) {
//         status = "ABSENT";
//     } else if (((n).split(':')[0]) == 9 && ((n).split(':')[1]) == 0) {
//         status = "ON_TIME"; //09:00:00 - 09:00:59
//     } else if ((((n).split(':')[0]) > 9) && (((n).split(':')[0]) <= 15) || (((n).split(':')[0]) = 9) && (((n).split(':')[1]) > 0)) {
//         status = "LATE"; //09:01:00 - 15:59:59
//     } else if ((((n).split(':')[0]) < 9)) {
//         status = "EARLY GOING"; // ... - 08:59:59
//     } else if ((((n).split(':')[0]) >= 16)) {
//         status = "HALF DAY"; // 16:00:00 - ...
//     }

//     await knex
//         .insert({ employee_id: id, in_date: today, in_time: n, status: status })
//         .into("attendance");

//     console.log("Punch In and insert data successfully")

// }
// // command1();

let id = 3;

let command1 = async function() {
    let object = {};
    await knex
        .select("employee_information.first_name", "employee_information.last_name", "employee_information.employee_id", "employee_information.phone_number", "employee_information.address", "employee_information.date_of_birth", "employee_information.gender", "salary.hourly_rate", "employee.title")
        .from("employee_information")
        .innerJoin("salary", "salary.employee", "employee_information.employee_id")
        .innerJoin("employee", "salary.employee", "employee.employee_id")
        .where("employee_id", id)
        .then((rows) => {
            console.log(rows[0])
                // let date = rows[0].date_of_birth;
                // (date.setDate(date.getDate() + 1));
                // let date_of_birth = (date.toISOString().split('T')[0]);

                // object.first_name = rows[0].first_name;
                // object.last_name = rows[0].last_name;
                // object.employee_id = rows[0].employee_id;
                // object.phone_number = rows[0].phone_number;
                // object.address = rows[0].address;
                // object.date_of_birth = date_of_birth;
                // object.gender = rows[0].gender;
                // console.log(object) ;
        })
      
    await knex
        .select("hourly_rate")
        .from("salary")
        .where("employee_id", id)
        .then((rows) => {
            try {
                object.hourly_rate = rows[0].hourly_rate;
            } catch {
                console.log("Employee Service Error - salaryQuery")
            }
        })
       
    // console.log(object);
};

command1();