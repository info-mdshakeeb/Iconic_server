const Express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToServer } = require("./utilities/mongodb");
const userApi = require("./routes/v2/user.route");
const catagoriesApi = require("./routes/v2/catagories.route");
const shopsApi = require("./routes/v2/shpos.routes.js");
const productApi = require("./routes/v2/products.route");
const AddToCart = require("./routes/v2/addTocart.router");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = Express();
const Port = process.env.PORT;

//middleware :
app.use(Express.json());
app.use(cors());

// test route:
app.get("/", (req, res) => {
    res.send("I am running");
});

//stripe payment route:
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    const booking = req.body;
    const price = booking.price;
    const amount = price * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "bdt",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

//database connect :
connectToServer((err) => {
    if (!err) {
        app.listen(Port, () => {
            console.log(`Example app listening on port ${Port}`);
        });
    } else { console.log(err) }
});
//separates route :
app.use("/api/v2/users", userApi);
app.use("/api/v2/catagories", catagoriesApi);
app.use("/api/v2/shops", shopsApi);
app.use("/api/v2/products", productApi);
app.use("/api/v2/cart", AddToCart)
