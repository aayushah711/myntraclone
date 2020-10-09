const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./routes/authRoute');

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
mongoose.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res, req) => {
        if (err) {
            console.log(err);
        } else {
            console.log('The database is connected');
        }
    }
);

app.use('/api/users', authRoute);

const port = 5000;
app.listen(port, () => {
    console.log('The server is up and running on port ' + port);
});
