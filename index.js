// subscribe to the IncomingCall event
const sdk = VoxImplant.getInstance();
sdk.on(VoxImplant.Events.IncomingCall, (e) => {

    // add function to answer a call
    document.getElementById("answer").onclick = () => {
        e.call.answer();
    };

    // add function to decline a call
    document.getElementById("decline").onclick = () => {
        e.call.decline();
    };

    // subscribe to the necessary events
    e.call.addEventListener(VoxImplant.CallEvents.Connected, () => {
        console.log("Call connected!");
        // you can process ending the call here, for example
        document.getElementById("endcall").onclick = () => {
            e.call.hangup();
        };
    });
    e.call.addEventListener(VoxImplant.CallEvents.Disconnected, () => {
        console.log("Call disconnected!");
    });
    e.call.addEventListener(VoxImplant.CallEvents.Failed, (e) => {
        console.log("Call failed!");
    });
});

const startcall = () => {
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