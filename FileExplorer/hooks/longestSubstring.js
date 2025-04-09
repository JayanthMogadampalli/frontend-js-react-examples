function lengthOfLongestSubstring() {
   let charSet = new Set();
    let start = 0;
    let maxLength = 0;

    for (let end = 0; end < s.length; end++) {
        while(charSet.has(s[end])) {
            charSet.delete(s[start]);
            start++;
        }

        charSet.add(s[end]);
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('peanut butter');
        }, 1000);
    });
}


const p1 = new Promise((resolve, reject) => {
    resolve('Hello');
}
const p2 = new Promise((resolve, reject) => {
    resolve('World');
}

Promise.all([p1, p2]).then((values) => {
    console.log(values);
}).catch((error) => {
    console.log(error);
});
