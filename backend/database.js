const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// // Load MongoDB URI and credentials from environment variables
// const mongoURI = process.env.MONGODB_URI;
// const mongoUser = process.env.MONGODB_USER;
// const mongoPass = process.env.MONGODB_PASS;

// console.log("MONGODB_URI =", mongoURI);
// console.log("user =", mongoUser);
// console.log("pass =", mongoPass);

const connectionParams = {
    // user: process.env.MONGO_USERNAME,
    // pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
};

const useDBAuth = process.env.USE_DB_AUTH || false;
if(useDBAuth){
    connectionParams.user = process.env.MONGODB_USER;
    connectionParams.pass = process.env.MONGODB_PASS;
}


// Connect to MongoDB and create user and database
mongoose
  .connect(process.env.MONGODB_URI, connectionParams)
  .then(async () => {
    // await createMongoDBUser(); // Create MongoDB user
    // await createDatabase(); // Create database
    console.log("Connected to MongoDB without authentication");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));


const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = {Product, connectionParams};


// -------------------------------------------------------------

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

// mongoose.connect(process.env.MONGODB_URI);

// const productSchema = new mongoose.Schema({
//   name: String,
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;
