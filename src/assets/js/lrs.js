var lrs;
console.log(lrs);
    try {
        lrs = new TinCan.LRS(
            {
                endpoint: "https://lrs.yetanalytics.io/xapi",
                username: "127971c614e9690ccf3a4bf110bfd2d451da6e0fbfb808b3",
                password: "f298358a16084ddc3e2940c1f9045a48e8793081f3b57113724a122836836a06",
                allowFail: false
            }
        );
        console.log(lrs);
    }
    catch (ex) {
        console.log("Failed to setup LRS object: " + ex);
        // TODO: do something with error, can't communicate with LRS
    }
