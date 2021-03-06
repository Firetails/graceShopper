/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Candies} from './candies'
export {default as SelectedCandy} from './selected-candy'
export {default as Cart} from './cart-form'
export {default as OrderConfirmation} from './order-confirmation'
