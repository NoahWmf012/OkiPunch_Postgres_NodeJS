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


let id = '4';
let old_in_date = '2022/08/20';
let old_in_time = '09:00:00';

let new_status = 'LATE';
let new_in_time = '08:00:00';
let new_out_time = '19:45:00';
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
    let workinghhmmss = new Date(workingSecond * 1000).toISOString().slice(11, 19);//e.g.09:00:00 -> 9 hours

    function toMonthName(monthNumber) {
        let date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }

    let currentMon;

    // update attendance table
    await knex("attendance").where({ employee_id: id, in_date: old_in_date, in_time: old_in_time })
        .update({
            status: new_status, in_time: new_in_time, out_time: new_out_time, day_working_hour: workinghhmmss
        });

    //attendance table data
    console.log(workinghhmmss);
    let day_working_hourArray = Number(workinghhmmss.split(":")[0]);
    let day_working_minArray = Number(workinghhmmss.split(":")[1]) / 60;
    let sumDayWorkHours = day_working_hourArray + day_working_minArray //working hours for one day

    let attendance_id;

    await knex
        .select("attendance.id", "salary.hourly_rate")
        .from("attendance")
        .innerJoin("salary", "attendance.employee_id", "salary.employee_id")
        .where({ "attendance.employee_id": id, "attendance.in_date": old_in_date, "attendance.in_time": old_in_time })
        .then((rows) => {
            console.log(rows);
        })


    await knex
        .select("id")
        .from("attendance")
        .where({ employee_id: id, in_date: old_in_date, in_time: old_in_time })
        .then((rows) => {
            console.log("rows attendance:" + rows);
            attendance_id = rows; //attendance_id
            console.log(attendance_id);
        })

    // from salary table
    let hourly_rate;
    await knex
        .select("hourly_rate")
        .from("salary")
        .where("employee_id", id)
        .then((rows) => {
            hourly_rate = rows[0].hourly_rate; //hourly rate

            let dailySalary = hourly_rate * sumDayWorkHours; //one day salary
            console.log(dailySalary);

            currentMon = toMonthName((Number(old_in_date.split("/")[1]))).toLowerCase();
            console.log(currentMon); //git english month
            console.log(dailySalary);

            return knex(`payroll_${currentMon}`).where("attendance_id", attendance_id)
                .update("daily_salary", dailySalary);
        })




    //insert salary table
    let sumWithInitialPayroll;
    let payrollAllDaySalary = [];
    await knex.select("daily_salary")
        .from(`payroll_${currentMon}`)
        .where("employee_id", id)
        .then((rows) => {
            for (let i = 0; i < rows.length; i++) {
                payrollAllDaySalary.push(Number(rows[i].daily_salary))
            }
            console.log(payrollAllDaySalary);
            let initialValue = 0;
            sumWithInitialPayroll = payrollAllDaySalary.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                initialValue
            );
            console.log(sumWithInitialPayroll);//total month salary
            return knex("salary").where("employee_id", id)
                .update({ month_working_hour: (sumWithInitialPayroll / hourly_rate), month_salary: sumWithInitialPayroll });
        })

};

command5();


// let command1 = async function(){
//     let attendance_id;
//     await knex
//         .select("id")
//         .from("attendance")
//         .where({ employee_id: id, in_date: old_in_date, in_time: old_in_time })
//         .then((rows) => {
//             attendance_id = rows; //attendance_id
//             console.log(attendance_id);
//         })
// }
// command1();

