//not yet done -> 1.updateEmployeeInfo method  2.command function problem 3.await group as object 4.change date format(reference to showEmployeeInfo method)
const { createClient } = require('redis');
class nodeServiceEmployee {
    constructor(knex, createClient) {
        this.knex = knex;
    }

    /* GET /salary/:id */ //Working Hours, Hourly Rate, Total Salary
    async showEmployeeSummary(id) {
        // acquire hourly rate
        let summaryObject = {};
        await this.knex
            .select("hourly_rate", "month_working_hour", "month_salary", "employee_id")
            .from("salary")
            .where("employee_id", id)
            .then((rows) => {
                try {
                    // console.log("Employee Service - hourly rate: " + rows[0].hourly_rate);
                    summaryObject.hourly_rate = rows[0].hourly_rate;
                    summaryObject.month_working_hour = rows[0].month_working_hour;
                    summaryObject.month_salary = rows[0].month_salary;
                    summaryObject.employee_id = rows[0].employee_id;
                }
                catch {
                    console.log("Employee Service: queryHourlyRate Error");
                }
            });
        return (summaryObject);
    };

    /* GET /punchin/:id/:date */ //insert data in attendance // checked
    async employeePunchIn(id) {
        //generate 4-digit password
        const client = createClient();

        client.on("error",
            (err) => console.log("RedisClient Error", err));

        await client.connect();

        var otp = Math.floor(1000 + Math.random() * 8999)
        await client.set(id.toString(), otp.toString());

        let value = await client.get(id.toString());

        return value;
    };

    /* POST /punchout/:id/:date */ //checked
    async employeePunchOut(id) {
        //date
        function toMonthName(monthNumber) {
            let date = new Date();
            date.setMonth(monthNumber - 1);
            return date.toLocaleString('en-US', {
                month: 'long',
            });
        }
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        let punchOutId;
        let workinghhmmss;

        let d = new Date();
        let n = d.toLocaleTimeString();

        //insert attendance table
        await this.knex.select("id").from("attendance")
            .where("attendance.employee_id", id)
            .orderBy("id", "asyn")
            .then((data) => {
                punchOutId = (data[data.length - 1].id);

                if (punchOutId) {
                    console.log("Punch Out and insert data successfully")
                    let queryIn_time = this.knex.select("in_time").from("attendance").where("id", punchOutId)
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

                        return this.knex("attendance").where("id", punchOutId)
                            .update({ out_date: d, out_time: n, day_working_hour: workinghhmmss });
                    })
                } else {
                    console.log("Employee Service Error - queryPunchInId");
                }
            })

        //insert payroll table
        let hourly_rate;
        await this.knex
            .select("hourly_rate")
            .from("salary")
            .where("employee_id", id)
            .then((rows) => {
                let daily_salary = (workinghhmmss.split(":")[1]) * (rows[0].hourly_rate) / 60;
                hourly_rate = rows[0].hourly_rate;
                return this.knex
                    .insert({ employee_id: id, attendance_id: punchOutId, salary_id: id, daily_salary: daily_salary })
                    .into(`payroll_${toMonthName(mm).toLowerCase()}`);
            });

        //update salary table
        //find month_working_hour in salary
        let dailySalaryPayroll = [];
        await this.knex
            .select("daily_salary", "hourly_rate")
            .from(`payroll_${toMonthName(mm).toLowerCase()}`)
            .innerJoin('salary', `payroll_${toMonthName(mm).toLowerCase()}.employee_id`, 'salary.employee_id')
            .where(`payroll_${toMonthName(mm).toLowerCase()}.employee_id`, id)
            .then((rows) => {
                for (let i = 0; i < rows.length; i++) {
                    dailySalaryPayroll.push(Number(rows[i].daily_salary));
                }
                const initialValue = 0;
                const sumWithInitialPayroll = dailySalaryPayroll.reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    initialValue
                );
                console.log(`Total monthly salary for ${toMonthName(mm).toLowerCase()}: $` + sumWithInitialPayroll);
                return this.knex("salary").where("employee_id", id)
                    .update({ month_working_hour: (sumWithInitialPayroll / rows[0].hourly_rate), month_salary: sumWithInitialPayroll });
            })
    };



    /* GET /calendar/:id/:date */ // 
    async showEmployeeCalendar(id) {
        //acquire type
        let summaryObject = {};
        let status = [];
        let query_time = await this.knex
            .select("status")
            .from("attendance")
            .where("employee_id", id)
            .orderBy("id", "asc")
            .then((rows) => {
                for (let i = 0; i < rows.length; i++) {
                    status.push(rows[i].status);
                }
                summaryObject.status = status;
            });

        //acquire in_time & out_time description
        let description = [];
        let query_in_time = await this.knex
            .select("in_time", "out_time")
            .from("attendance")
            .where("employee_id", id)
            .orderBy("id", "asc")
            .then((rows) => {
                for (let j = 0; j < rows.length; j++) {
                    description.push(`IN:${rows[j].in_time}  OUT:${rows[j].out_time}`);
                }
            });
        summaryObject.description = description;

        //acquire date
        let queryDate = await this.knex.select("in_date").from("attendance")
            .where("employee_id", id)
            .orderBy('id', 'asc')
            .then((rows) => {
                // let value = [];
                // let date = [];
                // let time = [];
                // let alteredDate = [];
                // let resultDate = [];
                let dateArray = [];
                // console.log(rows); //!PROBLEM HERE! it return 19 & 20, therefore, I changed it to 20 & 21 below
                for (let j = 0; j < rows.length; j++) {
                    // value.push(rows[j].in_date.toString());
                    // date.push((value[j]).split(' ', 4).join(' '));
                    // time.push(value[j].split(' ').slice(4).join(' ').split(' ')[0]);
                    // let [month, day, year] = date[j].split(' ').slice(1).join(' ').split(' ');
                    // const [hours, minutes, seconds] = time[j].split(':');
                    // let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    // month = (months.indexOf(month) + 1)
                    // alteredDate.push(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds))));
                    // console.log(alteredDate);
                    // resultDate.push(alteredDate[j].toISOString().split('T')[0]);
                    // console.log(resultDate);

                    const date = rows[j].in_date;
                    date.setDate(date.getDate() + 1);
                    dateArray.push(date.toISOString().split('T')[0]);
                }
                summaryObject.date = dateArray;
            });
        return summaryObject; // include status, description, time
    };

    /* GET /info/:id */ //Name, position, id, hourly rate, phone no, address, date of brith, gender
    async showEmployeeInfo(id) {
        let object = {};
        await this.knex
            .select("employee_information.first_name", "employee_information.last_name", "employee_information.alias", "employee_information.employee_id", "employee_information.phone_number", "employee_information.address", "employee_information.date_of_birth", "employee_information.gender", "salary.hourly_rate", "employee.title")
            .from("employee_information")
            .innerJoin("salary", "salary.employee_id", "employee_information.employee_id")
            .innerJoin("employee", "salary.employee_id", "employee.employee_id")
            .where("employee_information.employee_id", id)
            .then((rows) => {
                let date = rows[0].date_of_birth;
                (date.setDate(date.getDate() + 1));
                let date_of_birth = (date.toISOString().split('T')[0]);

                object.first_name = rows[0].first_name;
                object.last_name = rows[0].last_name;
                object.alias = rows[0].alias;
                object.employee_id = rows[0].employee_id;
                object.phone_number = rows[0].phone_number;
                object.address = rows[0].address;
                object.date_of_birth = date_of_birth;
                object.gender = rows[0].gender;
                object.hourly_rate = rows[0].hourly_rate;
                object.title = rows[0].title;
            })
        return object;
    };

    /* PUT /info/:id */ //Name, position, id, hourly rate, phone no, address, date of brith, gender
    async updateEmployeeInfo(id, phone_number, address) {
        return this.knex("employee_information").where("employee_id", id).update({
            phone_number: phone_number, address: address
        });
    };
}

module.exports = nodeServiceEmployee;