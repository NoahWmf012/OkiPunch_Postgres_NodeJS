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


let id = '3';
let old_in_date = '2022/08/20';
let old_in_time = '08:59:50';
let old_out_time = '18:00:00 ';

let new_status = 'LATE';
let new_in_time = '10:00:00';
let new_out_time = '19:00:00';
// (id, old_in_date, old_in_time, old_out_time, new_status, new_in_time, new_out_time)

let command5 = async function () {

    // in_time -> change 21:39:26 to 77966s
    let hmsInTime = new_in_time;
    var aInTime = hmsInTime.split(':');
    var inTimeSeconds = (+aInTime[0]) * 60 * 60 + (+aInTime[1]) * 60 + (+aInTime[2]);

    //out_time -> change 21:39:26 to 77966s
    let hmsOutTime = new_out_time;
    var aOutTime = hmsOutTime.split(':');
    var outTimeSeconds = (+aOutTime[0]) * 60 * 60 + (+aOutTime[1]) * 60 + (+aOutTime[2]);

    //cal working hours for one day
    let workingSecond = outTimeSeconds - inTimeSeconds;
    let workinghhmmss = new Date(workingSecond * 1000).toISOString().slice(11, 19);

    console.log(workinghhmmss);

    // update attendance table
    await knex("attendance").where({ employee_id: id, in_date: old_in_date, in_time: old_in_time, out_time: old_out_time })
        .update({
            status: new_status, in_time: new_in_time, out_time: new_out_time, day_working_hour: workinghhmmss
        });

    // update salary table



    // update payroll table

};

command5();



// function toMonthName(monthNumber) {
//     let date = new Date();
//     date.setMonth(monthNumber - 1);
//     return date.toLocaleString('en-US', {
//         month: 'long',
//     });
// }
// let today = new Date();
// let dd = String(today.getDate()).padStart(2, '0');
// let mm = String(today.getMonth() + 1).padStart(2, '0');
// let yyyy = today.getFullYear();
// today = mm + '/' + dd + '/' + yyyy;

// let d = new Date();
// let n = d.toLocaleTimeString();

    // //insert payroll table
    // let hourly_rate;
    // await knex
    //     .select("hourly_rate")
    //     .from("salary")
    //     .where("employee_id", id)
    //     .then((rows) => {
    //         let daily_salary = (workinghhmmss.split(":")[1]) * (rows[0].hourly_rate) / 60;
    //         hourly_rate = rows[0].hourly_rate;
    //         // return this.knex
    //         //     .insert({ employee_id: id, attendance_id: punchOutId, salary_id: id, daily_salary: daily_salary })
    //         //     .into(`payroll_${toMonthName(mm).toLowerCase()}`);
    //     });


        // await knex
    //     .select("day_working_hour")
    //     .from("attendance")
    //     .where("employee_id", id)
    //     .orderBy("id", "asc")
    //     .then((rows) => {

    //     })