class nodeServiceEmployee {
    constructor(knex) {
        this.init();
        this.knex = knex;
    }

    init() {
        new Promise((resolve, reject) => {

        });
    }

    /* GET /salary/:id */
    //Working Hours, Hourly Rate, Total Salary
    showEmployeeSummary(id) {

    };

    /* POST /punchin/:id/:date */
    employeePunchIn(id, date) {

    };

    /* POST /punchout/:id/:date */
    employeePunchOut(id, date) {

    };

    /* GET /calendar/:id/:date */
    showEmployeeCalendar(id, date) {
        let query = this.knex
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