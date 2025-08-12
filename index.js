function startcall() {
    // prepare settings
    const number = document.getElementById("number").value;

    // start the call
    const call = sdk.callPSTN(number);

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