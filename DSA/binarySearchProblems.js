import { MaxHeap } from "./HeapFns";

function searchRotatedArray(nums, target) {
        let low = 0, high = nums.length - 1;

        while(low <= high) {
            let mid = Math.floor((low + high)/2);

            if(nums[mid] === target) return mid;

            if(nums[low] <= nums[mid]) {
                if(target >= nums[low] && target < nums[mid]) {
                    high = mid -1;
                } else {
                    low = mid + 1;
                }
            }

            else {
                if(target <= nums[high] && target > nums[mid]) {
                    low = mid +1;
                }
                else {
                    high = mid - 1;
                }
            }
        }

        return -1;
}

function checkFirstBadVersion(isBadVersion, n) {
    let low = 0;
    let high = n;
    let firstBad = -1;

    while(low <= high) {
        let mid = Math.floow((low + high)/2);

        if(isBadVersion(mid)){
            firstBad = mid;
            high = mid -1;
        } else {
            low = mid + 1;
        }
    }

    return firstBad;
}

function findClosestElements(arr, k, x) {
  let low = 0, high = arr.length - 1;
  while(low < high) {
    let mid = Math.floor((low + high)/2);

    if(x - arr[mid] > arr[mid + k] - x) {
        low = mid + 1;
    }else {
        high = mid;
    }
  }

  return arr.slice(low, low + k);
}

function letterCasePermutation(s) {
        const res = [];

        function backtrack(index, path) {
                if(index === s.length) {
                    res.push(path.join(','));
                    return;
                }

                const char = s[index];

                if(/[a-zA-Z]/.test(char)){
                    path.push(char.toLowerCase());
                    backtrack(index + 1, path);
                    path.pop();

                     // Uppercase
                    path.push(char.toUpperCase());
                    backtrack(index + 1, path);
                    path.pop();
                }

                else {
                       // Uppercase
                       path.push(char.);
                       backtrack(index + 1, path);
                       path.pop();
                }
        }

    backtrack(0, []);
    return res;

}


function jumpGame(nums) {
  let targetIndex = nums.length - 1;

  for(let i = nums.length - 2; i>=0; i--) {
    if(targetIndex <= i+ nums[i]) targetIndex = i;
  }

  return targetIndex === 0;
}

function canCompleteCircuit(gas, cost) {
  let totalGas = 0;
  let totalCost = 0;
  let tank = 0;
  let start = 0;
  for(let i = 0; i<gas.length; i++){
    totalCost += cost[i];
    totalGas += gas[i];
    tank += gas[i] - cost[i];

    if(tank < 0) {
        start = i + 1;
        tank = 0;
    }
  }

  totalGas < totalCost ? -1 : start;
}

function twoCityScheduling(costs){
    costs.sort((a,b) => (a[0]- a[1]) -(b[0]-b[1]));

    let totalCost = 0;
    let n = costs.length/2;
    
    for(let i = 0; i < nums.length; i++) {
        if(i<n) {
            totalCost += costs[i][0];
        }
        else {
            totalCost += costs[i][1];
        }
    }

    return totalCost;
}

function minRefuelStops(target, startFuel, stations) {
  let maxHeap = new MaxHeap();
  let fuel = startFuel;
  let stops = 0;
  let i = 0;

  while(fuel < target) {
    while( i< stations.length && fuel >= stations[i][0]) {
        maxHeap.push(stations[i][1]);
        i++;
    }

    if(maxHeap.isEmpty()){
        return -1;
    }

    fuel += maxHeap.pop();
    stops++;
  }

  return stops;
}


function findContentChildren(g, s) {
g.sort((a,b)=> a-b);
s.sort((a,b)=> a-b);

let child = 0;
let cookie = 0;

while(child < g.length && cookie < s.length){
    if(s[cookie] <= g[child]) {
        child++;
        cookie++;
    }

    cookie++;
}

return child;
}

const balanceParenthesis(string) {
 const stack = [];
 const map = {
    '{': '}',
    '(': ')',
    '[': ']'
 };

 for(let char of s) {
    if(char == '(' || char == '{' || char === '[') {
        stack.push(char);
    } else {
        if(stack.length === 0 || stack.pop() !== map[char]){
            return false;
        }
    }
 }

 return stack.length === 0;
}