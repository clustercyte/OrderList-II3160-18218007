const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express()
app.use(express.json())

const db = config.get('mongoURI')

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use('/api/pesanan', require('./routes/api/pesanan'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started at port ${port}`))
