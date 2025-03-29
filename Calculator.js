class Calculator {
    constructor(initialValue = 0) {
        this.value = initialValue;
    } 

    add(val) {
        this.value += val;
        return this;
    }

    sub(val) {
        this.value -= val;
        return this;
    }

    multiply(val) {
        this.value *= val;
        return this;
    }

    divide(val) {
        this.value /= val;
        return this;
    }
}

const calculator = new Calculator();
const result = calculator.add(10).sub(2).multiply(2).divide(2).value;
console.log(result); // 8
