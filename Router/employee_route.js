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
        router.get("/salary", this.EmployeeSummary.bind(this));
        router.get("/calendar", this.renderEmployeeCalendar.bind(this)); // should be "/calendar/:id/:date"
        router.get("/calendar/api", this.inputEmployeeCalendar.bind(this)); // should be "/calendar/:id/:date"
        router.get("/punch", this.renderPunchPage.bind(this));
        router.get("/punchin", this.punchIn.bind(this));
        router.get("/punchout", this.punchOut.bind(this));
        router.get("/info", this.renderInfo.bind(this));
        router.get("/info/api", this.inputInfo.bind(this));
        router.post("/info/update", this.editInfo.bind(this));
        return router;
    }

    async EmployeeSummary(req, res) {
        let id = (req.user.id).toString();
        let data = await this.nodeServiceEmployee.showEmployeeSummary(id);
        res.json(data);
    }

    renderEmployeeCalendar(req, res) {
        res.type(".html");
        res.render("employee_calendar");
    }

    async inputEmployeeCalendar(req, res) {
        let id = req.user.id;
        let data = await this.nodeServiceEmployee.showEmployeeCalendar(id);
        res.json(data);
    }

    renderPunchPage(req, res) {
        res.type(".html");
        res.render("employee_punch");
    }

    async punchIn(req, res) {
        let id = req.user.id;
        let data = await this.nodeServiceEmployee.employeePunchIn(id);
        res.send(data);
    }

    async punchOut(req, res) {
        let id = req.user.id;
        let data = await this.nodeServiceEmployee.employeePunchOut(id);
        res.json(data);
    }

    renderInfo(req, res) {
        res.type(".html");
        res.render("employee_information")
    }

    async inputInfo(req, res) {
        let id = req.user.id;
        let data = await this.nodeServiceEmployee.showEmployeeInfo(id);
        res.json(data);
    }

    async editInfo(req, res) {
        let id = req.user.id;
        let phone_number = req.body.phone_number;
        let address = req.body.addr;
        let data = await this.nodeServiceEmployee.updateEmployeeInfo(id, phone_number, address);
        res.end();
    }
}

module.exports = nodeRouterEmployee;
