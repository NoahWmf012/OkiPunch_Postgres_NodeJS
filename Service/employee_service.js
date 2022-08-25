//not yet done -> 1.updateEmployeeInfo method  2.command function problem 3.await group as object 4.change date format(reference to showEmployeeInfo method)
class nodeServiceEmployee {
    constructor(knex) {
        this.init();
        this.knex = knex;
    }




    init() {
        new Promise((resolve, reject) => {

        });
    }



    /* GET /salary/:id */ //Working Hours, Hourly Rate, Total Salary
    showEmployeeSummary(id) {
        let command = async function () {
            // acquire hourly rate
            let queryHourlyRate = await this.knex
                .select("hourly_rate")
                .from("salary")
                .where("employee_id", id)
                .then((rows) => {
                    try {
                        console.log("Employee Service - hourly rate: " + rows[0].hourly_rate);
                        return rows[0].hourly_rate;
                    }
                    catch {
                        console.log("Employee Service: queryHourlyRate Error");
                    }
                });

            // cal total work hours
            let queryWorkHours = await this.knex
                .select("in_time", "out_time")
                .from("attendance")
                .where("employee_id", id)
                .orderBy("id", "asc")
                .then((rows) => {
                    try {
                        let workHoursArray = [];
                        for (i = 0; i < rows.length; i++) {
                            const [hours, minutes, seconds] = (rows[i].in_time).split(':');
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
                        return totalWorkHours;
                    }
                    catch {
                        console.log("Employee Service queryWorkHours Error");
                    }
                })
        }
        command();
    };



    /* POST /punchin/:id/:date */ //insert data in attendance
    employeePunchIn(id) {
        let command = async function () {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;

            let d = new Date();
            let n = d.toLocaleTimeString();

            await this.knex
                .insert({ employee_id: id, in_date: today, in_time: n })
                .into("attendance");

            console.log("Punch In and insert data successfully")
        }
        command();
    };



    /* POST /punchout/:id/:date */
    employeePunchOut(id) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        let d = new Date();
        let n = d.toLocaleTimeString();

        let queryPunchOutId = this.knex.select("id").from("attendance")
            .where("attendance.employee_id", id)
            .orderBy("id", "asyn")

        return queryPunchOutId.then((data) => {
            let punchOutId = (data[data.length - 1].id);
            console.log(punchOutId);
            if (punchOutId) {
                console.log("Punch Out and insert data successfully")
                return this.knex("attendance").where("id", punchOutId)
                    .update({ out_date: d, out_time: n });
            } else {
                console.log("Employee Service Error - queryPunchInId");
            }
        })
    };



    /* GET /calendar/:id/:date */ // 
    showEmployeeCalendar(id) {
        //e.g. id:employee_id, name:"punctual", description:"08:50:50", date:"2022/08/24", type""punctual"
        let command = async function () {
            //acquire in_time -> name = type
            let name = [];
            let query_time = await this.knex
                .select("in_time")
                .from("attendance")
                .where("employee_id", id)
                .orderBy("in_date", "asc")
                .then((rows) => {
                    try {
                        for (i = 0; i < rows.length; i++) {
                            if (rows[i].in_time == null) {
                                name.push("Absence");
                            } else if (((rows[i].in_time).split(':')[0]) < 9 || ((rows[i].in_time).split(':')[0]) == 9 && ((rows[i].in_time).split(':')[1]) == 0 && ((rows[i].in_time).split(':')[2]) == 0) {
                                name.push("Punctual");
                            } else if ((((rows[i].in_time).split(':')[0]) >= 9) && (((rows[i].in_time).split(':')[1]) > 0) && (((rows[i].in_time).split(':')[2]) == 0)) {
                                name.push("Late");
                            } else {
                                name.push("Absence");
                            }
                        }
                    } catch {
                        console.log("Employee Service Error - query_time");
                    }
                });
            // console.log(name);


            //acquire in_time & out_time description
            let description = [];
            let query_in_time = await this.knex
                .select("in_time", "out_time")
                .from("attendance")
                .where("employee_id", id)
                .orderBy("in_date", "asc")
                .then((rows) => {
                    try {
                        console.log(rows);
                        for (j = 0; j < rows.length; j++) {
                            if (rows[j].in_time == null) {
                                description.push("Absence");
                            } else {
                                description.push(`IN:${rows[j].in_time}  OUT:${rows[j].out_time}`);
                            }
                        }
                    } catch {
                        console.log("Employee Service Error - query_in_time");
                    }
                });
            // console.log(description);


            //acquire date
            let queryDate = await this.knex.select("in_date").from("attendance")
                .where("employee_id", id)
                .orderBy('in_date', 'asc')
                .then((rows) => {
                    let value = [];
                    let date = [];
                    let time = [];
                    let alteredDate = [];
                    let resultDate = [];
                    // console.log(rows); //!PROBLEM HERE! it return 19 & 20, therefore, I changed it to 20 & 21 below
                    for (let j = 0; j < rows.length; j++) {
                        value.push(rows[j].in_date.toString());
                        date.push((value[j]).split(' ', 4).join(' '));
                        time.push(value[j].split(' ').slice(4).join(' ').split(' ')[0]);
                        let [month, day, year] = date[j].split(' ').slice(1).join(' ').split(' ');
                        const [hours, minutes, seconds] = time[j].split(':');
                        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        month = (months.indexOf(month) + 1)
                        alteredDate.push(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds))));
                        resultDate.push(alteredDate[j].toISOString().split('T')[0]);
                    }
                    // console.log(resultDate);
                }).catch((error) => {
                    console.log("Employee Service Error - queryDate");
                });
        }
        command();
    };



    /* GET /info/:id */ //Name, position, id, hourly rate, phone no, address, date of brith, gender
    showEmployeeInfo(id) {
        let command = async function () {
            let object = {};
            let infoQuery = await this.knex
                .select("fName", "employee_id", "phone_number", "address", "date_of_birth", "gender")
                .from("employee_information")
                .where("employee_id", "4")
                .then((rows) => {
                    try {
                        let date = rows[0].date_of_birth;
                        date.setDate(date.getDate() + 1);

                        object.fName = rows[0].fName;
                        object.employee_id = rows[0].employee_id;
                        object.phone_number = rows[0].phone_number;
                        object.address = rows[0].address;
                        object.date_of_birth = date;
                        object.gender = rows[0].gender;
                    } catch {
                        console.log("Employee Service Error - infoQuery")
                    }
                })

            let salaryQuery = await this.knex
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
        }

        command();
    };



    /* PUT /info/:id */ //Name, position, id, hourly rate, phone no, address, date of brith, gender
    updateEmployeeInfo(id, phone_number, address) {

    };
}

module.exports = nodeServiceEmployee;