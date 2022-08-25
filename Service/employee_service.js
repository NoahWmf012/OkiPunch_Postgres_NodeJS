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



    /* POST /punchin/:id/:date */
    employeePunchIn(id, date) {

    };



    /* POST /punchout/:id/:date */
    employeePunchOut(id, date) {

    };



    /* GET /calendar/:id/:date */
    showEmployeeCalendar(id, date) {
        let query_salary = this.knex
            .select("employee_id", "in_date", "in_time", "out_time")
            .from("attendance")
            .where("id", id)
            .orderBy("in_time", "asc");

        return query.then((rows) => {
            return rows;
        })
    };



    /* GET /info/:id */
    //Name, position, id, hourly rate, phone no, address, date of brith, gender
    showEmployeeInfo(id) {

    };



    /* PUT /info/:id */
    updateEmployeeInfo(id) {

    };
}

module.exports = nodeServiceEmployee;