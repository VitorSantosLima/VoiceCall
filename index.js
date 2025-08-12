function startcall() {
    // prepare settings
    const callSettings = {
        number: document.getElementById("number").value,
        video: {
            sendVideo: false,
            receiveVideo: false
        }
    };

    // start the call
    const call = sdk.call(callSettings);

    // subscribe to the events if necessary
    call.addEventListener(VoxImplant.CallEvents.Connected, () => {
        console.log("Call connected!");
    });

    call.addEventListener(VoxImplant.CallEvents.Disconnected, () => {
        console.log("Call disconnected!");
    });
    
    call.addEventListener(VoxImplant.CallEvents.Failed, (e) => {
        console.log("Call failed!", e);
    });
};