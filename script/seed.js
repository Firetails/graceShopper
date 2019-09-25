const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Cart, Candy, CartCandy} = require('../server/db/models')

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
    price: 399
  },
  {
    name: 'Penguin Cider Mochi Candy',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190717_021.jpg',
    description:
      'These sweet-looking mochi candies are packed with cider flavor! Mochi are sweet rice cake desserts in Japan and now, you can experience them as candy. These candies have a soft chewy texture. They also come with a toothpick that you can use to eat them. The packaging features cute penguin illustrations.',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 75,
    price: 299
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
    price: 599
  },
  {
    name: 'Kogumi Fruit Juice Gummies - Yogurt Assortment',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190829_011.jpg',
    description:
      'Enjoy the different flavors of deliciously healthy probiotic drinks with this gummy pack! The tasty gummies come in four yogurt flavors: strawberry, blueberry, lactic acid, and peach. Fruity and refreshingly tasty!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 300,
    price: 499
  },
  {
    name: 'Bonbonribbon Flute Candy',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190814_009.jpg',
    description:
      'This cute toy flute lets you enjoy delicious hard candies with a kawaii twist! The flute has 8 removable glittery caps that are decorated with Bonbonribbon characters. Each one contains candies that will satisfy your sweet-tooth cravings!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 599
  },
  {
    name: 'Sanrio Mini Gumball Machine',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190725_050.jpg',
    description:
      'Enjoy some sweet gum treats in a cute way with an equally cute Sanrio gumball machine! Push the button and a sweet gum will roll out. Choose from three color options to get your favorite character! Blue for the lovely Shinkansen, red for Hello Kitty, and pink for the cute Bonbonribbon.',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 450
  },
  {
    name: 'Pretty Cure Card & Gummies',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190725_021.jpg',
    description:
      'Enjoy the fruity taste of muscat gummy candies together with the charming PreCure girls! Pretty Cure is a popular Japanese anime series about cute magical girls. In addition to the delicious golden gummies, each pack comes with 1 card out of 15 different collectible designs. A kawaii surprise, indeed!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 290
  },
  {
    name: 'Heart Gummy Blocks DIY Set',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190725_035.jpg',
    description:
      'This DIY set from Heart allows you to build edible blocks like real LEGO bricks! Mix the ingredients together and put them in the plastic molds to create the block pieces. They come in three colors with corresponding flavors: yellow for pineapple, pink for strawberry, and blue for grape. Once the candies are set, you can have fun stacking them together and making colorful edible blocks!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 50,
    price: 550
  },
  {
    name: 'Fusen No Mi Fruity Bubble Gum',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190725_025.jpg',
    description:
      'Treat yourself to a fruity-licious experience with these gumballs from Lotte. Each piece has a sweet hard outer shell and they come in three flavors: strawberry, melon, and yogurt. To create a new watermelon taste, chew strawberry and melon-flavored pieces at the same time. Juicy and fresh like real fruits!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 310
  },
  {
    name: 'E-ma Forky Throat Candy - Muscat',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190725_025.jpg',
    description:
      "Made with real fruit juice, these throat candies are extra tasty and soothing. The vitamin C-infused candies have a muscat flavored hard outer shell and a chewy center sweetened with xylitol. They come in a cute container featuring Toy Story 4's adorable Forky.",
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 290
  },
  {
    name: 'Tohato Anpanman Caramel Corn - 4 pcs',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190717_015_1_.jpg',
    description:
      'This corn snack combines the light delicious taste of caramel and the crispiness of corn puffs! The set includes four small brightly-colored packages with each one featuring Anpanman or his friends. The Anpanman trivia on the back of each pack brings extra fun to this snack!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 175
  },
  {
    name: 'Kabaya Pure & Natural Melon Gummy Candies',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190717_023.jpg',
    description:
      'These cube-shaped gummies have the rich, juicy flavor of real Japanese melon juice! Their tender texture is soft on the outside and like a jiggly jelly on the inside. They come in a resealable pouch so you can easily eat them anywhere!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 200,
    price: 350
  },
  {
    name: 'Meiji Kajyu Fruit Gummies - Satsuma Mandarin',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190712_012.jpg',
    description:
      'These orange slice-shaped gummies are made with 100% real Satsuma Mandarin juice. They are chewy and juicy with a sweet citrus flavor. Free of artificial coloring, these gummies are also loaded with collagen which is good for your skin. The package is resealable so you can enjoy the candies whenever you want.',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 450
  },
  {
    name: 'Nobel Super Mario Gummies',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190509_014.jpg',
    description:
      'These gummy candies by Nobel feature the energetic Super Mario and friends! The gummies are flavored with the refreshing taste of cola and ramune soda and come in an assortment of 5 different shapes. Some of the bags include special gummies shaped like mushrooms, stars, and coins from Super Mario. Enjoy each pack in an original design out of 40 designs in total!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 75,
    price: 550
  },
  {
    name: 'Lactic Acid Bacteria Candy - Yogurt',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190530_022.jpg',
    description:
      'Say hello! to the good bacteria found in these delicious candies! Popular in Japan for their taste and health benefits, these candies have 3 million healthy lactic acid bacteria that are good for your stomach. Pop them in your mouth and savor the yummy flavor as they fight the bad bacteria inside your tummy!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 190
  },
  {
    name: 'Pocky Biscuit Sticks - Matcha Mousse',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190530_010.jpg',
    description:
      'These scrumptious Pocky biscuit sticks are now coated in a delicious mousse-like matcha chocolate coating. These have the perfect blend of bitter mixed with a sweet flavor and a crunch that will leave you wanting more. The end of the sticks are uncoated so your fingers can stay clean while savoring every matcha-mousse flavored biscuit!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 450
  },
  {
    name: 'Milky Peko Chan Hard Candy - Matcha',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190315_050.jpg',
    description:
      'Fujiya Milky Candy is one of the most well-loved sweets in Japan since 1951! The front packaging features the iconic Peko-chan, a cute schoolgirl. These hard candies are creamy, rich Hokkaido milk taste and are made with Uji matcha for a wonderful blend of Japanese flavors!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 590
  },
  {
    name: 'Pocky Biscuit Sticks - Chunky Strawberry Chocolate',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190403_021.jpg',
    description:
      'Pocky are light stick shaped biscuits covered in chocolate and get their name from their "pocky" sounding crunch. For this special flavor, the chocolate biscuits are coated in creamy strawberry chocolate made with actual strawberry bits. The end of the sticks has been left uncoated, so you will not get your fingers sticky while enjoying this sweet treat!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 550
  },
  {
    name: 'Happy Nikukyu Paw Gummies - Strawberry Milk',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190327_028.jpg',
    description:
      'These gummies are ridiculously adorable with the squishiness of real paw pads and a yummy strawberry milk taste. Each cute little paw is a dose of sweet creaminess. The resealable package makes them easy to carry with you and share with friends. The perfect little snack for whenever you feel like enjoying some cute sweetness!',
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 350
  },
  {
    name: 'Sumikko Gurashi Blueberry Yogurt Gummies',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190320_035.jpg',
    description:
      "Sumikko Gurashi are shy corner-living creatures, but don't shy away from these candies! These gummies are not only blueberry flavored but also have the yummy milky taste of yogurt! The candies are shaped like Sumikko Gurashi and are packed in a resealable bag for convenience.",
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 450
  },
  {
    name: 'Kasugai Cantaloupe Melon Gummy Candies',
    imageUrl:
      'https://www.blippo.com/media/catalog/product/cache/4/thumbnail/65x/040ec09b1e35df139433887a97daa66f/2/0/20190114_018.jpg',
    description:
      "Kasugai knows how to sweeten your day! These Cantaloupe melon flavored gummies are so delicious and juicy! With a super soft texture, pure melon juice extract, and sweet flavor, it's a perfect treat for everyone. Every gummy has been wrapped individually, so you can take a couple with you and share with friends easily. Yummy!",
    ingredients:
      'Glucose syrup, Sugar, Hydrogenated Palm Kernel Oil, Gelatin, Natural and Artificial Flavors, Strawberry juice from concentrate, DL-Malic Acid, Citric Acid, Emulsifiers, Sodium lactate Solution, and Natural colors (Beta-Carotene, Carmine)',
    quantity: 100,
    price: 590
  }
]

// const carts = [{status: 'order'}, {status: 'cart'}, {status: 'cart'}]

// const cartCandy = [
//   {cartId: 1, candyId: 1, amount: 3},
//   {cartId: 1, candyId: 2, amount: 3},
//   {cartId: 2, candyId: 1, amount: 3}
// ]
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    candies.map(candy => {
      return Candy.create(candy)
    })
  )

  // await Promise.all(
  //   carts.map(cart => {
  //     return Cart.create(cart)
  //   })
  // )

  // await Promise.all(
  //   cartCandy.map(el => {
  //     return CartCandy.create(el)
  //   })
  // )

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
