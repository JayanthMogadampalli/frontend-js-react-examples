function myPromiseAll(tasksList) {
  // your implementation
  const res = new Array(tasksList.length);
  let count = 0;
   
  return new Promise((resolve, reject) => {
    tasksList.forEach((task, index) => {
        task()
        .then((data) => {
            res[index] = data;
            count++;
            if(count === tasksList.length) {
                resolve(res);
            }
        }).catch((err)=> {
            reject(err);
        })
    })
  })

}

function myPromiseRace(tasksList) {
    return new Promise((resolve, reject) => {
        tasksList.forEach((task)=> {
            task()
            .then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        });
    });
}

function myPromiseAny(tasksList) {
    return new Promise((resolve, reject) => {
        let count = 0;
        tasksList.forEach((task) => {
            task()
            .then((data) => {
                resolve(data);
            }).catch((err) => {
                count++;
                if(count === tasksList.length) {
                    reject('All promises rejected');
                }
            })
        });
    });
}