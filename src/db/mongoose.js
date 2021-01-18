const mongoose = require('mongoose');

// MONGODB_URL='mongodb://127.0.0.1:27017/task-manager-api'
// mongoose.connect(process.env.MONGODB_URL, {

mongoose.connect('mongodb+srv://TaskManager:iM29siRQ@cluster0.le1e2.mongodb.net/task-manager-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

