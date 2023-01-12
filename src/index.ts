/**
 * This utility type comes in my type-space package.
 * ```
 * import type { Combine } from '@cuppachino/type-space'
 * ```
 */
export type Combine<T> = {} & { [K in keyof T]: T[K] }

export const chainSymbol: unique symbol = Symbol('internalChainIdentifier')

export interface Chain<Prev = {}> {
  value: Readonly<Prev>
  next<Next>(fork: (prev: Prev) => Combine<Next>): Chain<Combine<Next>>
  next<Next>(fork: Combine<Next>): Chain<Combine<Next>>
  readonly [chainSymbol]: typeof chainSymbol
}

/**
 * todo: description
 *
 * @example
 * ```
 * const base = chain() // Chain<{}>
 * const store = base.next({ count: 0 }) // Chain<{ count: number }>
 * const forked = store.next(({ count }) => ({ count: count + 1, date: new Date() })) // Chain<{ count: number, date: Date }>
 * ```
 */
export const chain = <T = {}>(prev: T = {} as T): Chain<Combine<T>> => ({
  value: { ...Object.freeze(prev) },
  next(fork) {
    if (fork instanceof Function) {
      return chain(fork(prev))
    } else {
      return chain(fork)
    }
  },
  /**
   * This symbol can be used to identify Chain objects.
   * todo (idea): middlewares for extending the Chain interface.
   *
   * @example
   * ```
   * import { chain, ChainSymbol } from "..." // todo: name package
   *
   * const myChain = chain() // Chain<{}>
   * const myObj = {} // {}
   *
   * console.log(ChainSymbol in myChain) // true
   * console.log(ChainSymbol in myObj) // false
   * ```
   */
  [chainSymbol]: chainSymbol
})

/*
 * Chain<{ brother: hermano }>
 */
const xx = chain({ brother: 'hermano' })

/*
 * Chain<{ a: 50, b: 100 }>
 */
const yy = xx.next(() => 50).next((a) => ({ a, b: 100 }))

/*
 * { brother: 'hermano' }
 */
console.log(xx.value)
/*
 * Chain<{ a: 50, b: 100 }>
 */
console.log(yy.value)

const storeA = chain() // Chain<{}>
const storeB = storeA.next({ count: 0 }) // Chain<{ count: number }>
const storeC = storeB.next(({ count }) => ({ count: count + 1 })) // Chain<{ count: number }>

/*
 * { a: {}, b: { count: 0 }, c: { count: 1 } }
 */
console.log({ a: storeA.value, b: storeB.value, c: storeC.value })

try {
  console.log('storeA', storeA.value)
  // @ts-expect-error - this will throw an error because each store is immutable and each store is a fork of the previous store, or a completely new store that simply used some of the previous stores state.
  // eslint-disable-next-line
  storeA.next(({ count }) => ({ count: count + 1 })).next((state) => console.log(state))
} catch (e) {
  throw new Error('Chains are immutable!')
}

/*
 * Or if you're somewhere between oop and fp you could do something like this:
 * - extend storeC with a new property, "ratings".
 * - define a function that increments "ratings" by 1.
 */
let myStore = storeC.next((state) => ({ ...state, ratings: 0 }))
const addRating = <T extends { ratings: number }>(state: T) => {
  return { ...state, ratings: state.ratings !== undefined ? state.ratings + 1 : 0 }
}

myStore = myStore.next(addRating).next(addRating).next(addRating)
/*
 * { count: 1, ratings: 3 }
 */
console.log(myStore.value)
