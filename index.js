const Express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToServer } = require("./utilities/mongodb");
const userApi = require("./routes/v2/user.route");
const catagoriesApi = require("./routes/v2/catagories.route");
const shopsApi = require("./routes/v2/shpos.routes");

const app = Express();
const Port = process.env.PORT || 3210;

//middleware :
app.use(Express.json());
app.use(cors());

// test route:
app.get("/", (req, res) => {
    res.send("I am running");
});
//database connect :
connectToServer((err) => {
    if (!err) {
        app.listen(Port, () => {
            console.log(`Example app listening on port ${Port}`);
        });
    } else {
        console.log(err);
    }
});

//separates route :
app.use("/api/v2/users", userApi);
app.use("/api/v2/catagories", catagoriesApi);
app.use("/api/v2/shops", shopsApi)

