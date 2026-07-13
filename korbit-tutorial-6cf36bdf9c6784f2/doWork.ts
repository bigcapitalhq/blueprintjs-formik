import { processWork } from 'korbit-tutorial-6cf36bdf9c6784f2/util.js';

function doSomeWork(workToBeDone: Array<string>) {
    let finishedWork = []
    workToBeDone.forEach((workItem) => finishedWork.push(processWork(workItem)))
    return finishedWork
}

let workToBeDone: Array<string> = ["these", "are", "some", "words", null]
console.log(doSomeWork(workToBeDone))