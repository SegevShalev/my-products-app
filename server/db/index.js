const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_HOST } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/product_db?retryWrites=true&w=majority`;

const connect = async () => {
  return mongoose
    .connect(uri)
    .then(() => console.log("db connected!"))
    .catch(console.log());
};

connect()

module.exports = {connect}
