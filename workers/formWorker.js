onmessage = (e) => {
    console.log(e)
    console.log("from worker,received")
    postMessage(e.data);
}
