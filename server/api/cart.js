const router = require('express').Router()
const {Cart, CartCandy, Candy} = require('../db/models')
const {isAdmin} = require('./security')

router.get('/', (req, res, next) => {
  try {
    const cart = req.session.cart
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.post('/:candyId/:amount', async (req, res, next) => {
  try {
    console.log('POST!!!!', req.params)
    const candy = await Candy.findByPk(req.params.candyId)
    let found = false
    for (let i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].candy.id === candy.id) {
        req.session.cart[i].amount =
          Number(req.session.cart[i].amount) + Number(req.params.amount)
        found = true
      }
    }
    if (!found) {
      const newCartItem = {candy: candy, amount: req.params.amount}
      req.session.cart.push(newCartItem)
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:candyId/:amount', (req, res, next) => {
  try {
    req.session.cart.forEach(el => {
      if (el.candy.id === req.params.candyId) {
        el.amount = req.params.amount
      }
    })

    console.log('RESPONSE IN PUT', req.session.cart)
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:candyId', (req, res, next) => {
  try {
    const cart = req.session.cart
    const newCart = cart.filter(el => el.candy.id !== req.params.id)
    req.session.cart = newCart
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.delete('/', (req, res, next) => {
  try {
    req.session.cart = []
    res.send('Cart deleted')
  } catch (error) {
    next(error)
  }
})
//NOTE: KEEP THIS LOGIC FOR WHEN WE NEED TO REQUEST A SUBMITTED ORDER FROM THE DATABASE
// router.get('/:cartId', async (req, res, next) => {
//   try {
//     const cart = await Cart.findByPk(req.params.cartId, {
//       include: [{all: true}]
//     })
//     res.json(cart)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:cartId', isAdmin, async (req, res, next) => {
//   try {
//     await Cart.destroy({
//       where: {
//         id: req.params.cartId
//       }
//     })
//     res.json('cart destroyed')
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:cartId/:candyId/:amount', async (req, res, next) => {
//   try {
//     let updatedCC = await CartCandy.update(
//       {
//         amount: req.params.amount
//       },
//       {
//         where: {
//           candyId: req.params.candyId,
//           cartId: req.params.cartId
//         },
//         returning: true,
//         plain: true
//       }
//     )
//     res.json(updatedCC)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:cartId/:candyId', async (req, res, next) => {
//   try {
//     let cartCandy = await CartCandy.findAll({
//       where: {
//         candyId: req.params.candyId,
//         cartId: req.params.cartId
//       }
//     })
//     await cartCandy[0].destroy()
//     res.json('cart candy destroyed')
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
