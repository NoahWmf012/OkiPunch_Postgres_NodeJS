class nodeServiceCompany {
    constructor(knex) {
        this.init();
        this.knex = knex;
    }
    init() {
        new Promise((resolve, reject) => { });
    }

    // /biz/showworkers (GET)
    showWorkers(company) {
        return this.knex("employee");
    }

    //  /biz/worker/addnew (POST)
    addNewWorker(company, body) {

    }

    // /biz/worker/:id/calendar (GET)
    showWorkerCanlendar(company, user) {
        return this.knex("attendance").where('employee_id', user);
    }

    // /biz/worker/:id/calendar (PUT)
    updateWorkerCanlendar(company, user) {

    }

    // /biz/worker/:id/info (GET)
    showWorkerDayRecord(company, user) {
        return this.knex("employee_information").where('employee_id', user);
    }

    // /biz/worker/:id/info (PUT)
    updateWorkerInfo(company, body) {

    }

    // /biz/worker/:id/info (DELETE)
    layoffWorker(company, user) {
        return this.knex("employee").update('active_status', 'layoff').where('id', user);
    }
}

module.exports = nodeServiceCompany;
