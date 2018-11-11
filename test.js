"use strict";


// let obj1 = {
//     a1: 'a1',
//     a2: 'a2',
//     a3: 'a3'
// };
//
// let obj2 = {
//     a2: 'a2'
// };
//
// let obj3 = {
//     a3: 'a3'
// };
//
// let arr = [obj1, obj2, obj3];
// // let res = arr.reduce((acc, val)=> Object.assign(acc, val));
// // console.log(res);
// let res = Object.values(obj1);
// console.log(res);

function fetchAction1() {
    return new Promise((resolve, rej) => {
        setTimeout(() => {
            (Math.random()).toFixed(2) > 0.5 ? resolve('data from 1 promise') : rej('error from 1 promise');
        }, 3000)
    })
}

function fetchAction2(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            (Math.random()).toFixed(2) > 0.5 ? data !== undefined ? res(data + ' and from 2 promise') : res('Data from 2 promise') : rej('error from 2 promise');
        }, 2000);
    })
}

// fetchAction1()
//     .then((data) => {
//         console.log(data);
//         return data;
//     })
//     .catch((err) => console.log(err))
//     .then((data) => {
//         return fetchAction2(data);
//     })
//     .then((data) => console.log(data))
//     .catch((err) => {
//         console.log(err)
//     });

Promise.all([fetchAction1(), fetchAction2()]).then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
});