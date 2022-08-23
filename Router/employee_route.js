class nodeRouterEmployee {
    constructor(noteServiceEmployee, express) {
        this.noteServiceEmployee = noteServiceEmployee;
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
        return this.noteServiceEmployee
    }

    //POST method
    post(req, res) {
        // return this.noteServiceEmployee
    }

    //PUT method
    post(req, res) {
        // return this.noteServiceEmployee
    }

    //DELETE method
    post(req, res) {
        // return this.noteServiceEmployee
    }
}

module.exports = nodeRouterEmployee;