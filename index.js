const express = require("express");
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require("./config/connectDB");
const morgan = require('morgan');
// import userRoutes from './routes'
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

//env config
dotenv.config();

//mongodb connection
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.status(200).send({
        message: "Node server",
    });
});

//different user routes
app.use('/user', userRoutes);
//different blog routes
app.use('/blog', blogRoutes);

// port establishing
app.listen(8080, () => {
    console.log('Server running at port 8080'.bgBlue.white)
})
