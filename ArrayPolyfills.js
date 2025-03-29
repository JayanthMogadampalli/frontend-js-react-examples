Array.prototype.myMap = function(callback) {    
    const result = [];

    for(let i = 0; i< this.length; i++) {
        result.push(callback(this[i], i, this));
    }
}

Array.prototype.myFilter = function(callback) {
    const result = [];

    for(let i = 0; i< this.length; i++) {
        if(callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
}

Array.prototype.myReduce = function(callback, initialValue) {
    let acc = initialVal || this[0];

    for(let i = 0; i< this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }

    return acc;
}

Array.prototype.myForEach = function(callback) {
    for(let i = 0; i< this.length; i++) {
        callback(this[i], i, this);
    }
}

function Person(name) {
   this.name = name;

   Person.prototype.hello = function() {
       return `Hello, I am ${this.name}`;
   };
}

function Developer(name, skills) {
    Person.call(this, name);
    this.skills = skills;
}

Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;

Developer.prototype.getSkills = function() {
    return this.skills;
}

const dev = new Developer('John', ['JavaScript', 'React', 'Node']);
console.log(dev.hello());
console.log(dev.getSkills());


const minWindowString = (s, t) => {
   if(t.length > s.length) return '';
   const reqCount = {};
    const windowCount = {};

    for(const char of t) {
        reqCount[char] = (reqCount[char] || 0) + 1;
    }

    let left = 0;
    const required = Object.keys(reqCount).length;
    let result = [-1, -1];
    let resLen = Infinity;
    let current = 0;

    for(let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCount[char] = (windowCount[char] || 0) + 1;
        
        if(reqCount[char] && reqCount[char] === windowCount[char]) {
            current++;
        }

        while(current === required) {
            if(right - left + 1 < resLen) {
                result = [left, right];
                resLen = right - left + 1;
            }

            const leftChar = s[left];
            windowCount[leftChar]--;
            if(reqCount[leftChar] && windowCount[leftChar] < reqCount[leftChar]) {
                current--;
            }

            left++;
        }
    }

    const [start, end] = result;
    return s.substring(start, end + 1);

};

