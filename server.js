const Server = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const db_Url = process.env.MONGO_URL;
const port = process.env.PORT;


mongoose.connect(db_Url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Database Connected!");
}).then(() => {
  Server.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  });
}).catch((err) => {
  console.log(err.message);
})



