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


let id = 1;

//punch in

let command1 = async function () {
    //in_date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;

    //in_time
    let d = new Date();
    let n = d.toLocaleTimeString();

    //status
    let status = "";
    if (in_time == null) {
        status = "ABSENT";
    } else if (((n).split(':')[0]) == 9 && ((n).split(':')[1]) == 0) {
        status = "ON_TIME"; //09:00:00 - 09:00:59
    } else if ((((n).split(':')[0]) > 9) && (((n).split(':')[0]) <= 15) || (((n).split(':')[0]) = 9) && (((n).split(':')[1]) > 0)) {
        status = "LATE"; //09:01:00 - 15:59:59
    } else if ((((n).split(':')[0]) < 9)) {
        status = "EARLY GOING"; // ... - 08:59:59
    } else if ((((n).split(':')[0]) >= 16)) {
        status = "HALF DAY"; // 16:00:00 - ...
    }

    await knex
        .insert({ employee_id: 1, in_date: today, in_time: n, status: status })
        .into("attendance");

    console.log("Punch In and insert data successfully")
}

// command1();




//date
let command2 = async function () {

    function toMonthName(monthNumber) {
        let date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let punchOutId;
    let workinghhmmss;

    let d = new Date();
    let n = d.toLocaleTimeString();


    //insert attendance table
    let queryPunchOutId = await knex.select("id").from("attendance")
        .where("attendance.employee_id", 1)
        .orderBy("id", "asyn")
        .then((data) => {
            punchOutId = (data[data.length - 1].id);

            if (punchOutId) {
                console.log("Punch Out and insert data successfully")
                let queryIn_time = knex.select("in_time").from("attendance").where("id", punchOutId)
                return queryIn_time.then((time) => {

                    // in_time -> change 21:39:26 to 77966s
                    let hmsInTime = time[0].in_time;
                    var aInTime = hmsInTime.split(':');
                    var inTimeSeconds = (+aInTime[0]) * 60 * 60 + (+aInTime[1]) * 60 + (+aInTime[2]);

                    //out_time -> change 21:39:26 to 77966s
                    let hmsOutTime = n;
                    var aOutTime = hmsOutTime.split(':');
                    var outTimeSeconds = (+aOutTime[0]) * 60 * 60 + (+aOutTime[1]) * 60 + (+aOutTime[2]);

                    //cal working hours for one day
                    let workingSecond = outTimeSeconds - inTimeSeconds;
                    workinghhmmss = new Date(workingSecond * 1000).toISOString().slice(11, 19);

                    // return knex("attendance").where("id", punchOutId)
                    //     .update({ out_date: d, out_time: n, day_working_hour: workinghhmmss });
                })
            } else {
                console.log("Employee Service Error - queryPunchInId");
            }

        })


    //insert payroll table
    let payrollquery = await knex
        .select("hourly_rate")
        .from("salary")
        .where("employee_id", 1)
        .then((rows) => {
            console.log(rows[0].hourly_rate);

            let daily_salary = (workinghhmmss.split(":")[1]) * (rows[0].hourly_rate) / 60;
            console.log(daily_salary);


            // return knex
            //     .insert({ employee_id: id, attendance_id: punchOutId, salary_id: id, daily_salary: daily_salary })
            //     .into(`payroll_${toMonthName(mm).toLowerCase()}`);
        });

    //update salary table

    let querySalary = await knex
        .select("daily_salary")
        .from(`payroll_${toMonthName(mm).toLowerCase()}`)
        .where("employee_id", id)
        .orderBy("id", "asc")
        .then((rows) => {
            try {
                let workHoursArray = [];
                for (i = 0; i < rows.length; i++) {
                    const [hours, minutes, seconds] = (n).split(':');
                    function convertToSeconds(hours, minutes, seconds) {
                        return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
                    }
                    workHoursArray.push(parseInt((convertToSeconds(hours, minutes, seconds)) / 60 / 60));
                }
                const initialValue = 0;
                const totalWorkHours = workHoursArray.reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    initialValue
                );
                console.log(`Employee Service - total working hours: ${totalWorkHours}`);
                summaryObject.total_work_hours = totalWorkHours;
            }
            catch {
                console.log("Employee Service queryWorkHours Error");
            }
        })

    // let querySalary1 = await knex
    //     .select()

    // return knex
    //     .insert({ employee_id: id, month_working_hour: 1, month_salary: 1, accumulate_salary: 1, accumulate_working_hour: 1 })
    //     .into(`payroll_${toMonthName(mm).toLowerCase()}`);

};

command2();

















//for cal 
// let queryWorkHours = await knex
// .select("in_time", "out_time")
// .from("attendance")
// .where("employee_id", 1)
// .orderBy("id", "asc")
// .then((rows) => {
//     try {
//         let workHoursArray = [];
//         for (i = 0; i < rows.length; i++) {
//             const [hours, minutes, seconds] = (n).split(':');
//             function convertToSeconds(hours, minutes, seconds) {
//                 return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
//             }
//             workHoursArray.push(parseInt((convertToSeconds(hours, minutes, seconds)) / 60 / 60));
//         }
//         const initialValue = 0;
//         const totalWorkHours = workHoursArray.reduce(
//             (previousValue, currentValue) => previousValue + currentValue,
//             initialValue
//         );
//         // console.log(`Employee Service - total working hours: ${totalWorkHours}`);
//         summaryObject.total_work_hours = totalWorkHours;
//     }
//     catch {
//         console.log("Employee Service queryWorkHours Error");
//     }
// })