const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  GetPesanan: {
    type: Number,
    default: 0
  },
  AddPesanan: {
    type: Number,
    default: 0
  },
  DelPesanan: {
    type: Number,
    default: 0
  },
  EditPesanan: {
    type: Number,
    default: 0
  }
})

module.exports = Log = mongoose.model('Log', logSchema)
