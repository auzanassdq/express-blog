const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./config/database')
const { PORT } = require('./config/variableEnv')

const userRouter = require("./routes/user")

const app = express()
const port = PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("assets/images/"))

db.then(() => {
  console.log(`connected to database`);
}).catch(error => {
  console.log("error happend when to reach mongodb collection", error);
})

app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`server runnning on port ${port}`)
})