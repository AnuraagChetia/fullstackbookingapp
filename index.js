const Express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bookingRoutes = require("./routes/booking");
const sequelize = require("./util/databse");

const app = Express();

app.use(cors());

app.use(bodyParser.json());

app.use("/user", bookingRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
