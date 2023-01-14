export const internalChainSymbol: unique symbol = Symbol('internalChainIdentifier')
export type InternalChainSymbol = typeof internalChainSymbol

export type Chain<Prev> = {
  value: Prev
  next<Next>(fork: (prev: Prev) => Next): Chain<Next>
  next<Next>(fork: Next): Chain<Next>
  readonly [internalChainSymbol]: InternalChainSymbol
}

// export type Chainable<T> = T extends unknown ? undefined : T

/**
 * todo: description
 * - chain returns a new copy of the store and leaves the previous store to be garbage collected.
 *
 * todo: version that enforces the type stays the same and maybe merges state instead of replacing it by default.
 *
 * @example
 * ```
 * const base = chain() // Chain<{}>
 * const store = base.next({ count: 0 }) // Chain<{ count: number }>
 * const forked = store.next(({ count }) => ({ count: count + 1, date: new Date() })) // Chain<{ count: number, date: Date }>
 * ```
 */
export const chain = <T = undefined>(prev: T = undefined as T): Chain<T> => ({
  value: prev,
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
   * import { chain, InternalChainSymbol } from "..." // todo: name package
   *
   * const myChain = chain() // Chain<{}>
   * const myObj = {} // {}
   *
   * console.log(InternalChainSymbol in myChain) // true
   * console.log(InternalChainSymbol in myObj) // false
   * ```
   */
  [internalChainSymbol]: internalChainSymbol
})
