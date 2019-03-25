
const os = require('os');
const path = require('path');
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

const userCPUCount = os.cpus().length;

const calculateFactorial = number => {
  if (number === 0) {
    return 1;
  }
  return new Promise((resolve, reject) => {
    const numbers = [... new Array(number)].map((_, i) => i+1);
    console.log(numbers, userCPUCount)
  })
};

calculateFactorial(10);
