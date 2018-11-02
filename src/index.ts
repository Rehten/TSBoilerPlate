import {TestScheduler} from 'rxjs/testing'

let scheduler: TestScheduler = new TestScheduler((actual, expected) => {
  console.log(123)
})

scheduler.run(helpers => {
  helpers.cold()
})
