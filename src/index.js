const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { update } = require('./models/user')
require('./db/mongoose')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

// 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

app.listen(port, () => {
    console.log('Server is started');
})



// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async() =>{
//     // const task = await Task.findById('6002a4fe4c1e8f02c042f3d2')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('6002a3c7dc3c00315071ff43')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()