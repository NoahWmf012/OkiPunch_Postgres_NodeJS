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

    // /biz/showone/:id (GET)
    showOneWorker(company, user) {
        return this.knex("employee_information").where('employee_id', user);
    }

    //  /biz/worker/addnew (POST)
    addNewWorker(company, body) {

    }

    // /biz/worker/:id/calendar (GET)
    showWorkerCanlendar(company, user) {

    }

    // /biz/worker/:id/info (GET)
    showWorkerDayRecord(company, user) {

    }

    // /biz/worker/:id/info (PUT)
    updateWorkerInfo(company, body) {

    }

    // /biz/worker/:id/info (DELETE)
    layoffWorker(company, user) {

    }
}

module.exports = nodeServiceCompany;
