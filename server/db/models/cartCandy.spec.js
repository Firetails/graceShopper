const {expect} = require('chai')
const db = require('../index')
const CartCandy = require('./cartCandy')

// describe('CartCandy model', () => {
//   // beforeEach(() => {
//   //   return db.sync({force: true})
//   // })
//   describe('amount field', () => {
//     let test
//     beforeEach(async () => {
//       test = await CartCandy.create({amount: 2})
//     })

//     it('has an amount field of type integer', () => {
//       expect(typeof test.amount === 'number').to.be.equal(true)
//     })
//   }) //end describe amount field
//   describe('candyId field', () => {
//     let test2
//     beforeEach(async () => {
//       test2 = await CartCandy.create({amount: 2})

//       it('has a candyId field of type integer', () => {
//         expect(typeof test2.candyId).to.be.a('number')
//       })
//     })
//   }) //end describe candyId field
//   describe('increment method', () => {
//     let test
//     beforeEach(async () => {
//       test = await CartCandy.create({amount: 2})
//     })
//     it('increases the amount field of the candy instance by one each time it is called', () => {
//       test.increment()
//       expect(test.amount).to.be.equal(3)
// test.increment();
// test.increment()
// expect(test.amount)to.be.equal(5)
//   })
// })
// describe('remove candy', () => {
//   let cart2
//   beforeEach(async () => {
//     cart2 = await Cart.create({candies: [1, 2, 3]})
//   })
//   it('removes all of a type of candy from the candies array and returns the removed candy', () => {
//     expect(cart2.remove(1)).to.deep.equal(1)
//     cart2.remove(1)
//     expect(cart2.candies).to.deep.equal([2, 3])
//   })
// }) //end describe remove method
// }) //end test block
