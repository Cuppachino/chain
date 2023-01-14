import { chain } from '.'

/*
 * Chain<{ brother: hermano }>
 */
const xx = chain({ brother: 'hermano' })

/*
 * Chain<{ a: 50, b: 100 }>
 */
const yy = xx.next(() => 50).next((a) => ({ a: a, b: 100 }))

/*
 * { brother: 'hermano' }
 */
console.log(xx.value)

/*
 * Chain<{ a: 50, b: 100 }>
 */
console.log(yy.value)

const storeA = chain()
//    ^?
const storeB = storeA.next({ count: 0 })
//    ^?
const storeC = storeB.next(({ count }) => ({ count: count + 1, fish: 40 }))
//    ^?

/*
 * { a: {}, b: { count: 0 }, c: { count: 1, fish: number } }
 */
console.log({ a: storeA.value, b: storeB.value, c: storeC.value })

try {
  console.log('storeA', storeA.value)
  // @ts-expect-error - You can't access a value that doesn't exist.
  // eslint-disable-next-line
  storeA.next(({ count }) => ({ count: count + 1 })).next((state) => console.log(state))
} catch (e) {
  console.error('`count` is never defined in storeA.')
}
