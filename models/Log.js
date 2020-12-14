const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  GetPesanan: {
    type: Number
  },
  AddPesanan: {
    type: Number
  },
  DelPesanan: {
    type: Number
  },
  EditPesanan: {
    type: Number
  }
})

module.exports = Log = mongoose.model('Log', logSchema)
