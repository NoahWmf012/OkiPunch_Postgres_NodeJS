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
let old_in_time = '08:59:55';

let new_status = 'LATE';
let new_in_time = '09:32:00';
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

    // update attendance table
    await knex("attendance").where({ employee_id: id, in_date: old_in_date, in_time: old_in_time})
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
        .select("id")
        .from("attendance")
        .where({ employee_id: id, in_date: old_in_date, in_time: old_in_time })
        .then((rows) => {
            attendance_id = rows[0].id; //attendance_id
        })

    // from salary table
    let hourly_rate;
    await knex
        .select("hourly_rate")
        .from("salary")
        .where("employee_id", id)
        .then((rows) => {
            hourly_rate = rows[0].hourly_rate; //hourly rate
        })

    let dailySalary = hourly_rate * sumDayWorkHours; //one day salary
    console.log(dailySalary);

    //insert payroll table
    function toMonthName(monthNumber) {
        let date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }
    let currentMon = toMonthName((Number(old_in_date.split("/")[1]))).toLowerCase();
    console.log(currentMon); //git english month
    console.log(dailySalary);

    await knex(`payroll_${currentMon}`).where("attendance_id", attendance_id)
        .update("daily_salary", dailySalary);







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
        })

    await knex("salary").where("employee_id", id)
        .update({ month_working_hour: (sumWithInitialPayroll / hourly_rate), month_salary: sumWithInitialPayroll });
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


        // await knex("")
    // .select("attendance.day_working_hour", "employee_information.last_name", "employee_information.alias", "employee_information.employee_id", "employee_information.phone_number", "employee_information.address", "employee_information.date_of_birth", "employee_information.gender", "salary.hourly_rate", "employee.title")
    // .from("attendance")
    // .innerJoin("salary", "salary.employee_id", "employee_information.employee_id")
    // .innerJoin("employee", "salary.employee_id", "employee.employee_id")
    // .where("employee_information.employee_id", id)
    // .then(()=>{

    // })







    // let day_working_hourArray = [];
    // let day_working_minArray = [];
    // let sum;
    // let sumWithInitial;
    // let sumWithInitial2;
    // // update salary table
    // await knex
    //     .select("attendance.day_working_hour", "salary.hourly_rate")
    //     .from("attendance")
    //     .innerJoin("salary", "attendance.employee_id", "salary.employee_id")
    //     .where("attendance.employee_id", id)

    //     // .select("attendance.day_working_hour", "employee_information.last_name", "employee_information.alias", "employee_information.employee_id", "employee_information.phone_number", "employee_information.address", "employee_information.date_of_birth", "employee_information.gender", "salary.hourly_rate", "employee.title")
    //     // .from("attendance")
    //     // .innerJoin("salary", "salary.employee_id", "employee_information.employee_id")
    //     // .innerJoin("employee", "salary.employee_id", "employee.employee_id")
    //     // .where("employee_information.employee_id", id)
    //     // .then(()=>{
    //     .then((rows) => {
    //         console.log(rows);
    //         for (let i = 0; i < rows.length; i++) {
    //             day_working_hourArray.push(Number((rows[i].day_working_hour).split(":")[0]));
    //             day_working_minArray.push(Number((rows[i].day_working_hour).split(":")[1]))
    //         }
    //         const initialValue = 0;
    //         sumWithInitial = day_working_hourArray.reduce(
    //             (previousValue, currentValue) => previousValue + currentValue,
    //             initialValue
    //         );
    //         sumWithInitial2 = day_working_minArray.reduce(
    //             (previousValue, currentValue) => previousValue + currentValue,
    //             initialValue
    //         );
    //         sum = (sumWithInitial + (sumWithInitial2 / 60)) * rows[0].hourly_rate;
    //         return sum;
    //     })
    // console.log(sum);
    // await knex("attendance").where({ employee_id: id, in_date: old_in_date, in_time: old_in_time, out_time: old_out_time })
    // .update({
    //     month_working_hour: sumWithInitial + (sumWithInitial2 / 60), month_salary: sum
    // });

    // // update payroll table
    // // await knex("attendance").where({ employee_id: id, in_date: old_in_date, in_time: old_in_time, out_time: old_out_time })
    // //     .update({
    // //         status: new_status, in_time: new_in_time, out_time: new_out_time, day_working_hour: workinghhmmss
    // //     });
