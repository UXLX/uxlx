var lrs;
    try {
        lrs = new TinCan.LRS(
            {
                endpoint: "https://lrs.yetanalytics.io/xapi",
                username: "5cc2c20624c3a305d89b72d795acff845aa7f74e6cb97bd6",
                password: "44a4776fee8f70e1cff76ea7c20b403e86e4b58fa90ccae25b64fb15dd81b1e6",
                allowFail: false
            }
        );
        console.log("LRS set up");
    }
    catch (ex) {
        console.log("Failed to setup LRS object: " + ex);
        // TODO: do something with error, can't communicate with LRS
    }
