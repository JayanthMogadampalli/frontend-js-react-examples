class CircuitBreaker {
    constructor(fn, options = {} ) {
        this.fn = fn;
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.cooldownTime = options.cooldownTime || 1000;
        this.failureThreshold = options.failureThreshold || 5;
        this.halfOpenTime = options.halfOpenTime || 1000;
        this.lastFailureTime = null;
    }

    async call(...args) {
        if(this.state === 'OPEN') {
            const now = Date.now();
            if(now - this.lastFailureTime >= this.cooldownTime) {
                this.state = 'HALF-OPEN';
            }
            else {
                throw new Error('Circuit is OPEN. Call blocked')
            }
        }  

        try {
            const res = await this.fn(...args);

            if(this.state === 'HALF-OPEN') {
                this.state === 'CLOSED';
                this.failureCount = 0;
            }

            return result;
        } catch(err) {
            this.failureCount += 1;
            this.lastFailureTime = Date.now();

            if(this.failureCount >= this.failureThreshold) {
                this.state = 'OPEN';
            }

            throw err;
        }
    }
}

const unstableApi = async () => {
    if (Math.random() < 0.7) {
      throw new Error("API failed");
    }
    return "Success";
  };
  
  const breaker = new CircuitBreaker(unstableApi, {
    failureThreshold: 3,
    cooldownTime: 3000,
  });
  
  (async () => {
    for (let i = 0; i < 10; i++) {
      try {
        const result = await breaker.call();
        console.log(`✅ Call ${i + 1}:`, result);
      } catch (err) {
        console.log(`❌ Call ${i + 1}:`, err.message);
      }
  
      await new Promise(res => setTimeout(res, 500));
    }
  })();
  