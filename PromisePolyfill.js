const STATE = {
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
    PENDING: "pending",
};
   
class MyPromise {
   #state = STATE.PENDING
   #thenCbs = [];
   #catchCbs = [];
    #value;
    #onSuccessBind=this.#onSuccess.bind(this);
    #onFailBind = this.#onFail.bind(this);

   constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind);
        }
        catch(err) {
            this.#onFail(err);
        }
   }

   #runCallbacks() {
    if(this.#state === STATE.FULFILLED){
        this.#thenCbs.forEach((callback) => {
            callback(this.#value);
        })

        this.#thenCbs = [];
    }

    if (this.#state === STATE.REJECTED) {
        this.#catchCbs.forEach(callback => {
          callback(this.#value)
        })
  
        this.#catchCbs = []
      }
    }


  #onSuccess(value){
    queueMicrotask(() => {
        if(this.#state !== STATE.PENDING) return;

        if(value instanceof MyPromise) {
            value.then(this.#onSuccessBind, this.#onFailBind);
        }
        this.#state = STATE.FULFILLED;
        this.#value = value;
        this.#runCallbacks();
    })
  }

  #onFail(value){
    queueMicrotask(() => {
        if(this.#state !== STATE.PENDING) return;

        if(value instanceof MyPromise) {
            value.then(this.#onSuccessBind, this.#onFailBind);
        }


      if (this.#catchCbs.length === 0) {
        throw new UncaughtPromiseError(value)
      }

        this.#state = STATE.REJECTED;
        this.#value = value;
        this.#runCallbacks();
    })
  }

  then(thenCb, catchCb) {
        return new Promise((resolve, reject) => {   
            this.#thenCbs.push((value) => {
                if(value === null) {
                    resolve(null);
                    return;
                }

                try {
                    const result = thenCb(value);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

            this.#catchCbs.push((value) => {
                if(value === null) {
                    reject(null);
                    return;
                }

                try {
                    const result = catchCb(value);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

           this.#runCallbacks();
    });

  }

  catch(cb){
    return this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(
      result => {
        cb()
        return result
      },
      result => {
        cb()
        throw result
      }
    )
  }

  static resolve(val) {
    return new MyPromise((resolve) => {
        resolve(val);
    })
  }

  static reject(val){
    return new MyPromise((resolve, reject) => {
        reject(val);
    })
  }


 static all(promises) {
    return new MyPromise((resolve, reject) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            promise.then((result) => {
                results[index] = result;
                completed++;

                if(completed === promises.length) {
                    resolve(results);
                }
            }).catch(reject);
        });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            promise.then((result) => {
                results[index] = { status: "fulfilled", value: result };
            }).catch((error) => {
                results[index] = { status: "rejected", reason: error };
            }).finally(() => {
                completed++;
                if(completed === promises.length) {
                    resolve(results);
                }
            });
        });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve).catch(reject);
        });
    });
  }

    static any(promises) {
        return new MyPromise((resolve, reject) => {
            const errors = [];
            let completed = 0;
    
            promises.forEach((promise) => {
                promise.then(resolve).catch((error) => {
                    errors.push(error);
                    completed++;
    
                    if(completed === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                });
            });
        });
    }


}