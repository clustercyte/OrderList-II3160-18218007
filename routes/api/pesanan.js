const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Item = require('../../models/Item')
const Log = require('../../models/Log')

//@route    GET api/pesanan
//@desc     get all orders
//@access   Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(pesanan => {
      try {
        Log.updateOne({}, { $inc: { GetPesanan: 1 } }, { upsert: true }).then(
          () => res.status(200).send({ pesanan })
        )
      } catch {
        res.status(500).send({
          message: 'Internal server error'
        })
      }
    })
    .catch(e =>
      res.status(500).send({
        message: 'Internal server error'
      })
    )
})

//@route    POST api/pesanan
//@desc     Create a new orders
//@access   Private
router.post('/', auth, (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Required body not found'
    })
    return
  }
  const newItem = new Item({
    name: req.body.name
  })
  try {
    newItem.save().then(item => {
      Log.updateOne({}, { $inc: { AddPesanan: 1 } }, { upsert: true }).then(
        () => res.json(item)
      )
    })
  } catch {
    res.status(500).send({
      message: 'Internal server error'
    })
  }
})

//@route    PUT api/pesanan
//@desc     Edit orders
//@access   Private
router.put('/', auth, (req, res) => {
  if (!req.body.name || !req.body.id) {
    res.status(400).send({
      message: 'Required body not found'
    })
    return
  }
  const namaItem = req.body.name
  const idItem = req.body.id
  try {
    Item.updateOne({ _id: idItem }, { $set: { name: namaItem } }).then(() => {
      Log.updateOne({}, { $inc: { EditPesanan: 1 } }, { upsert: true }).then(
        () => res.json({ success: true })
      )
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Internal server error'
    })
  }
})

//@route    DELETE api/pesanan/:id
//@desc     Delete sebuah order
//@access   Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => {
        try {
          Log.updateOne({}, { $inc: { DelPesanan: 1 } }, { upsert: true }).then(
            () => res.json({ success: true })
          )
        } catch {
          res.status(500).send({
            message: 'Internal server error'
          })
        }
      })
    )
    .catch(err => res.status(400).json({ success: false }))
})

//@route    GET api/log
//@desc     get api logs
//@access   Public
router.get('/log', (req, res) => {
  Log.find()
    .select('-_id')
    .select('-__v')
    .then(log => res.json(log))
})
module.exports = router
