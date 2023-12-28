    const mongoose = require('mongoose');

    const url=`mongodb+srv://anusmitahait67:irHtfpzozvDGzx26@cluster0.bkq7nco.mongodb.net/?retryWrites=true&w=majority`

    mongoose.connect(url)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err));