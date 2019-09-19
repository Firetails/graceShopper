const {green, red} = require('chalk')
const Candies = require('../server/db/models/Candy')
const db = require('../server/db')
const {User, Candy, Cart} = require('../server/db/models')

// here's some sample candies to get you started
// feel free to edit these or add your own!
const candies = [
  {
    name: 'Puccho',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190829_050.jpg',
    description:
      'Puccho candies are available in different varieties and this bag comes with not one, but four yummy flavors! Each piece is either flavored with muscat, grape, soda, or cola. The chewy treats are infused with fruit gummy bits, making them so irresistibly delicious!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 50,
    price: 3.99
  },
  {
    name: 'Peguin Cider Mochi Candy',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190717_021.jpg',
    description:
      'These sweet-looking mochi candies are packed with cider flavor! Mochi are sweet rice cake desserts in Japan and now, you can experience them as candy. These candies have a soft chewy texture. They also come with a toothpick that you can use to eat them. The packaging features cute penguin illustrations.',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 75,
    price: 2.99
  },
  {
    name: 'Happy Nikukyu Polar Bear Paw Gummies - White Soda',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190703_053.jpg',
    description:
      'Enjoy these polar bear paw-shaped gummy treats this summer! The refreshing gummies have a tasty white soda flavor and a juicy jelly center. They are packed in a resealable package, and each package design comes with a different polar bear expression. You will receive a random package design when you order. How exciting!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 30,
    price: 5.99
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    candies.map(candy => {
      return Candies.create(candy)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${candies.length} candies`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
