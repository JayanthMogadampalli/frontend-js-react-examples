export class MaxHeap {
    constructor(compareFn = (a,b) => b - a) {
        this.compare = compareFn;
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this._heapifyUp();
    
        return this;
    }

    pop() {
        if(this.size === 0) return null;
        const top = this.heap[0];
        const end = this.heap.pop();
        if(this.size > 0) {
           this.heap[0] = end;
           this._heapifyDown(); 
       }

       return top;
    }

    peek() {
        return this.heap[0] || null;
    }

    size() {
        return this.heap.length;
    }

    _heapifyUp() {
        let index = this.size() - 1;
        const element = this.heap[index];
        while (index > 0) {
               const parentIndex = Math.floor((index - 1)/ 2);
               const parent = this.heap[parentIndex];
               if(this.compare(element, parent) < 0) {
                this.heap[index] = parent;
                index = parentIndex;
               } 
               else {
                break;
               }
        }
        this.heap[index] = element;
    }

    _heapifyDown() {
        let index = 0;
        const length = this.size();
        const element = this.heap[0];
        while(true){
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if(left < length && this.compare(this.heap[left], this.heap[largest]) < 0) {
                largest = left;
            }

            if (right < length && this.compare(this.heap[right], this.heap[largest]) < 0) {
                largest = right;
              }
              if (largest === index) break;
              
              this.heap[index] = this.heap[largest];
              index = largest;
        }

        this.heap[index] = element;
    }
}

export class MinHeap {
    constructor(compareFn = (a, b) => a - b) {
      this.heap = [];
      this.compare = compareFn;
    }
  
    push(value) {
      this.heap.push(value);
      this._heapifyUp();
    }
  
    pop() {
      if (this.size() === 0) return null;
      const top = this.heap[0];
      const end = this.heap.pop();
      if (this.size() > 0) {
        this.heap[0] = end;
        this._heapifyDown();
      }
      return top;
    }
  
    peek() {
      return this.heap[0] || null;
    }
  
    size() {
      return this.heap.length;
    }
  
    _heapifyUp() {
      let index = this.size() - 1;
      const element = this.heap[index];
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
        if (this.compare(element, parent) < 0) {
          this.heap[index] = parent;
          index = parentIndex;
        } else {
          break;
        }
      }
      this.heap[index] = element;
    }
  
    _heapifyDown() {
      let index = 0;
      const length = this.size();
      const element = this.heap[0];
  
      while (true) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;
  
        if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
          smallest = left;
        }
  
        if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
          smallest = right;
        }
  
        if (smallest === index) break;
  
        this.heap[index] = this.heap[smallest];
        index = smallest;
      }
      this.heap[index] = element;
    }
  }

export class MedianFinder {
  constructor() {
    this.low = new MaxHeap(); // left half
    this.high = new MinHeap(); // right half
  }

  addNum(num) {
    if(this.low.size() === 0 || num <= this.low.peek()) {
        this.low.push(num);
    } else {
        this.high.push(num);
    }

    // Balance heaps
    if(this.low.size() > this.high.size() + 1) {
         this.high.push(this.low.pop());
    } else if(this.high.size() > this.low.size()) {
        this.low.push(this.high.pop());
    }
  }

  findMedian() {
   if(this.low.size() > this.high.size()) {
     return this.low.peek();
   } else {
     return (this.low.peek() + this.high.peek()) / 2;
   }
  }
}
