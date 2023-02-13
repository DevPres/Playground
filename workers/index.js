let formWorker = new Worker("formWorker.js");
console.log(formWorker);
formWorker.onmessage = (e) => {
    console.log(e);
    console.log("message received from worker");
};


formWorker.postMessage({input: "some-name", value: "some-value"});
