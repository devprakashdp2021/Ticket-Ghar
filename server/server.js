const express = require(`express`);
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const bookingsRoute=require("./routes/bookingsRoute");
app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();

//render deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, ()=>console.log(`Node JS server is running on port ${port}` ));
