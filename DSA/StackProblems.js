class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val){
        this.stack.push(val);
        if (
            this.minStack.length === 0 ||
            val <= this.minStack[this.minStack.length - 1]
          ) {
            this.minStack.push(val);
          }
    }

    pop(){
        const poppedVal = this.stack.pop();
        if(poppedVal === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }

    top(){
        return this.stack[this.stack.length - 1];
    }
}

function nextGreaterElement(nums1, nums2) {
    let stack = [];
    let nextGreaterElement = {};

    for(let num of nums2) {
        while(stack.length > 0 && stack[stack.length - 1] < num) {
            const smaller = stack.pop();
            nextGreaterElement[smaller] = num;
        }

        stack.push(num);
    }


    const res =[];
    for(let num of nums1) {
        if(nextGreaterElement[num]){
            res.push(nextGreaterElement[num]);
        } else res.push(-1); 
    }

    return res;
}

function dailyTemperatures(T) {
    const stack = [];
    const res = new Array(T.length).fill(0);

    for(let i = 0; i< T.length;i++) {
        while(stack.length > 0 && T[i] > T[stack[stack.length - 1]]){
            const prevIndex = stack.pop();
            res[i] = i -prevIndex;
        }

        stack.push(i);
    }

    return res;
}

function removeDuplicates(s) {
        const stack = [];
        for(let c of s) {
            if(stack.length > 0 && stack[stack.length - 1] === char) {
                stack.pop();
            }else {
                stack.push(c);
            }
        }

        return stack.join(',');
}