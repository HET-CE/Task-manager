const mongoose = require('mongoose');

// MONGODB_URL='mongodb://127.0.0.1:27017/task-manager-api'
// mongoose.connect(process.env.MONGODB_URL, {

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

