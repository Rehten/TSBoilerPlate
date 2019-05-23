class Observer {
  constructor(dataFn) {
    this.dataFn = dataFn
  }

  next (value) {
    this.dataFn(value)
  }
}

class Observable {
  static create (behaviourFn) {
    return new Observable(behaviourFn)
  }

  constructor (behaviourFn) {
    this.behaviourFn = behaviourFn
  }

  subscribe (dataFn) {
    let observer = new Observer(dataFn)

    this.behaviourFn(observer)
  }
}

let stream$ = Observable.create(observer => {
  let count = 0
  let max = 56

  while (count < 56) {
    observer.next(count++)
  }
})

stream$.subscribe(value => console.log(value))
