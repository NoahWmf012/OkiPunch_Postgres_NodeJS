const { json } = require("body-parser");
const Auth = require("./company_AuthRouter");

class nodeRouterCompany {
    constructor(companyService, express) {
        this.companyService = companyService;
        this.express = express;
        this.auth = new Auth();
    }
    router() {
        let router = this.express.Router();

        router.use(this.auth.isAdminLogged);


        //connecting DB
        router.get("/showworkers", this.showAll.bind(this)); //employ
        //need interface for adding new worker {username, email, password, department_id, title, salaries, fName, lName, alias varchar, phone_number, address, gender Enum('M', 'F'),date_of_brith date,image}
        router.get("/worker/addnew", this.showAddNew.bind(this));
        router.post("/worker/addnew", this.addNew.bind(this)); //employ , employ_information
        router.get("/worker/:id/calendar", this.showCalendar.bind(this)); //attendance
        router.put("/worker/:id/calendar", this.updateCalendar.bind(this)); //attendance
        router.get("/worker/:id/info", this.showInfo.bind(this)); //employ_information
        router.put("/worker/:id/info", this.updateInfo.bind(this)); //employ_information
        router.delete("/worker/:id", this.deleteOne.bind(this)); //employ , employ_information
        return router;
    }

    loadLoginPage(req, res) {
        res.type(".html");
        res.render("company_login");
    }

    loadSignupPage(req, res) {
        res.type(".html");
        res.render("company_signup");
    }

    async showAll(req, res) {
        var data = await this.companyService.showWorkers("getAll employees")
        res.json(data);
    }

    showAddNew(req, res) {
        res.render("company_new_worker")
    }

    async addNew(req, res) {
        console.log("addNew")
        // router.post(
        //     "/company_signup",
        //     this.isNotLogged,
        //     this.passport.authenticate("company-signup", {
        //         successRedirect: "/company_login",
        //         failureRedirect: "/company_signup",
        //         failureFlash: true,
        //     })
        // );
    }

    async showCalendar(req, res) {
        var data = await this.companyService.showWorkerCanlendar(null, req.params.id);
        res.json(data);
    }

    async updateCalendar(req, res) {
        var data = await this.companyService.updateWorkerCanlendar();
        res.json(data);
    }

    async showInfo(req, res) {
        var data = await this.companyService.showWorkerDayRecord();
        res.json(data);
    }

    async updateInfo(req, res) {
        var data = await this.companyService.updateWorkerInfo();
        res.json(data);
    }

    async deleteOne(req, res) {
        var data = await this.companyService.layoffWorker(null, req.params.id);
        res.json(data);
    }
}

module.exports = nodeRouterCompany;
