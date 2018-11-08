import { TestScheduler } from 'rxjs/testing'
import './index123.js'

let scheduler: TestScheduler = new TestScheduler((actual, expected) => {
  console.log(123)
})

console.log(scheduler)
