const { json } = require("body-parser");

class nodeRouterCompany {
    constructor(noteServiceCompany, express) {
        this.noteServiceCompany = noteServiceCompany;
        this.express = express;
    }
    router() {
        let router = this.express.Router();
        router.get("/showworkers", this.showAll.bind(this));
        router.get("/showone/:id", this.showOne.bind(this)); //employ_information
        router.post("/worker/addnew", this.addNew.bind(this));
        router.get("/worker/:id/calendar", this.showCalendar.bind(this));
        router.get("/worker/:id/info", this.showInfo.bind(this));
        router.put("/worker/:id/info", this.updateInfo.bind(this));
        router.delete("/worker/:id/info", this.deleteOne.bind(this));
        return router;
    }

    async showAll(req, res) {
        var data = await this.noteServiceCompany.showWorkers("getAll employees")
        res.json(data);
    }

    async showOne(req, res) {
        var data = await this.noteServiceCompany.showOneWorker(null, req.params.id)
        res.json(data);
    }

    async addNew(req, res) {
        var data = await this.noteServiceCompany.addNewWorker();
        res.json(data);
    }

    async showCalendar(req, res) {
        var data = await this.noteServiceCompany.showWorkerCanlendar();
        res.json(data);
    }

    async showInfo(req, res) {
        var data = await this.noteServiceCompany.showWorkerDayRecord();
        res.json(data);
    }

    async updateInfo(req, res) {
        var data = await this.noteServiceCompany.updateWorkerInfo();
        res.json(data);
    }

    async deleteOne(req, res) {
        var data = await this.noteServiceCompany.layoffWorker();
        res.json(data);
    }
}

module.exports = nodeRouterCompany;
