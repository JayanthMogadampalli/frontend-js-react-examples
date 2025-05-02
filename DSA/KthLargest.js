import { MaxHeap } from "./HeapFns.js";
import { MinHeap } from "./min_heap.js";

export default class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.minHeap = new minHeap((a,b) => a - b);

        for(const num of nums) {
            this.add(num);
        }
    }

    add(val) {
        this.minHeap.push(val);

        if(this.minHeap.size() > this.k) {
            this.minHeap.pop();
        }

        return this.minHeap.peek();
    }
}

export function kthClosest(points, k) {
   const heap = new MaxHeap((a,b) => b[0] - a[0]);

   for (let [x, y] of points) {
    const dist = x*x + y*y;
    heap.push([dist, x, y]);

    if(heap.size() > k) {
        heap.pop();
    }
   }
   

   return heap.heap.map(([_,x,y])=> [x,y]);
}

export function kMostFrequent(nums, k) {
  const freqMap = new Map();

  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const minHeap = new MinHeap((a, b) => a[0] - b[0]);
  
  for (let [num, freq] of freqMap.entries()) {
    minHeap.push([freq, num]);
    if(minHeap.size() > k) {
        minHeap.pop();
    }
  }
  
  return minHeap.heap.map((_, num) => num);
}

export function findKthLargest(nums, k ) {
    const minHeap = new MinHeap((a,b) => a - b);

    for(let num of nums) {
        minHeap.push(num);

        if(minHeap.size() > k ) {
            minHeap.pop();
        }
    }

    return minHeap.peek();
}

function kthSmallest(lists, k){
    const minHeap = new MinHeap((a, b) => a.val - b.val);

   for(let i = 0; i< lists.length; i++) {
    if (lists[i].length > 0) {
        minHeap.push({ val: lists[i][0], listIdx: i, elemIdx: 0 });
    }
   }

   let count = 0;


   while(minHeap.size() > 0) {
    const { val, listIdx, elemIdx } =  minHeap.pop();
    count++;

    if(count === k) {
        return val;
    }

    const nextIdx = elemIdx + 1;
    if (nextIdx < lists[listIdx].length) {
        minHeap.push({
            val: lists[listIdx][nextIdx],
            listIdx,
            elemIdx: nextIdx,
        })
    }
   }

   return null;
}