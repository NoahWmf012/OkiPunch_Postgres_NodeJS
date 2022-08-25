class nodeRouterEmployee {
    constructor(nodeServiceEmployee, express) {
        this.nodeServiceEmployee = nodeServiceEmployee;
        this.express = express;
    }

    router() {
        let router = this.express.Router();
        router.get("/salary/:id", this.EmployeeSummary.bind(this));
        router.get("/calendar/:id/:date", this.EmployeeCalendar.bind(this));
        router.post("/punchin/:id/:date", this.punchIn.bind(this));
        router.post("/punchout/:id/:date", this.punchOut.bind(this));
        router.get("/info/:id", this.showInfo.bind(this));
        router.put("/info/:id", this.editInfo.bind(this));
        return router;
    }

    async EmployeeSummary(req, res) {
        var data = await this.nodeServiceEmployee.showEmployeeSummary("1");
        let id = req.params.id;
        console.log(id);
        res.json(data);
    }

    async EmployeeCalendar(req, res) {
        var data = await this.nodeServiceEmployee.showEmployeeCalendar(id, date);
        let id = req.params.id;
        res.json(data);
    }

    async punchIn(req, res) {
        var data = await this.nodeServiceEmployee.employeePunchIn(id, date);
        let id = req.params.id;
        let date = req.params.id;
        res.json(data);
    }

    async punchOut(req, res) {
        var data = await this.nodeServiceEmployee.employeePunchOut(id, date);
        let id = req.params.id;
        res.json(data);
    }

    async showInfo(req, res) {
        var data = await this.nodeServiceEmployee.showEmployeeInfo(id);
        let id = req.params.id;
        res.json(data);
    }

    async editInfo(req, res) {
        var data = await this.nodeServiceEmployee.updateEmployeeInfo(id);
        let id = req.params.id;
        res.json(data);
    }
}

module.exports = nodeRouterEmployee;