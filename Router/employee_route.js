const { json } = require("body-parser");
const Auth = require("./employee_AuthRouter");
class nodeRouterEmployee {
    constructor(nodeServiceEmployee, express) {
        this.nodeServiceEmployee = nodeServiceEmployee;
        this.express = express;
        this.auth = new Auth();
    }

    router() {
        let router = this.express.Router();
        router.use(this.auth.isLogged);
        router.get("/salary/:id", this.EmployeeSummary.bind(this));
        router.get("/calendar", this.renderEmployeeCalendar.bind(this)); // should be "/calendar/:id/:date"
        router.get("/calendar/:id", this.inputEmployeeCalendar.bind(this)); // should be "/calendar/:id/:date"
        router.get("/punch", this.renderPunchPage.bind(this));
        router.get("/punchin/:id", this.punchIn.bind(this));
        router.get("/punchout/:id", this.punchOut.bind(this));
        router.get("/info/:id", this.renderInfo.bind(this));
        router.put("/info/:id", this.editInfo.bind(this));
        return router;
    }

    async EmployeeSummary(req, res) {
        let id = req.params.id;
        var data = await this.nodeServiceEmployee.showEmployeeSummary(id);
        res.json(data);
    }

    renderEmployeeCalendar(req, res) {
        res.type(".html");
        res.render("employee_calendar");
    }

    async inputEmployeeCalendar(req, res){
        let id = req.params.id;
        var data = await this.nodeServiceEmployee.showEmployeeCalendar(id);
        res.json(data);
    }

    renderPunchPage(req, res) {
        res.type(".html");
        res.render("employee_punch");
    }

    async punchIn(req, res) {
        let id = req.params.id;
        var data = await this.nodeServiceEmployee.employeePunchIn(id);
        res.json(data);
    }

    async punchOut(req, res) {
        let id = req.params.id;
        var data = await this.nodeServiceEmployee.employeePunchOut(id);
        res.json(data);
    }

    renderInfo(req, res) {
        // var data = await this.nodeServiceEmployee.showEmployeeInfo(id);
        // let id = req.params.id;
        // res.json(data);
        res.type(".html");
        res.render("employee_information")
    }

    async editInfo(req, res) {
        var data = await this.nodeServiceEmployee.updateEmployeeInfo(id);
        let id = req.params.id;
        res.json(data);
    }
}

module.exports = nodeRouterEmployee;