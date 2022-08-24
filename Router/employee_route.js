class nodeRouterEmployee {
    constructor(nodeServiceEmployee, express) {
        this.nodeServiceEmployee = nodeServiceEmployee;
        this.express = express;
    }
    router() {
        let router = this.express.Router();
        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this));
        // router.put("/", this.put.bind(this));
        // router.delete("/", this.delete.bind(this));
        return router;
    }

    //GET method
    get(req, res) {
        return this.nodeServiceEmployee;
    }

    //POST method
    post(req, res) {
        return this.nodeServiceEmployee;
    }

    //PUT method
    post(req, res) {
        return this.nodeServiceEmployee;
    }

    //DELETE method
    post(req, res) {
        return this.nodeServiceEmployee;
    }
}

module.exports = nodeRouterEmployee;