const sdk = VoxImplant.getInstance();
let currentCall = null;

async function initialize() {
    const initParameters = {
        node: VoxImplant.ConnectionNode.NODE_9,
        micRequired: true,
        showDebugInfo: true,
        showWarnings: true
    };
    
    try {
        await sdk.init(initParameters);
        console.log("SDK inicializado")
    } catch (e) {
        console.log("Falha ao inicializar SDK", e.code, e.message);
    }

    await sdk.connect();

    sdk.on(VoxImplant.Events.AuthResult, function (e) {
        if (e.result === true) {
          console.log("Login com sucesso");
        } else {
          console.log(e.code, e.message);
        }
    });

    sdk.on(VoxImplant.Events.IncomingCall, (e) => {
        console.log("Chamada recebida!");
        currentCall = e.call;

        document.getElementById("answer").onclick = () => {
          currentCall.answer();
        };

        document.getElementById("decline").onclick = () => {
          currentCall.decline();
        };
    });

    await sdk.login(`vitor@voicecall.vlima.voximplant.com`, "12345678");
}

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});

function startcall() {
    const number = document.getElementById("number").value;

    currentCall = sdk.call(number);

    currentCall.on(VoxImplant.CallEvents.Connected, () => {
        console.log("Call connected!");
    });

    currentCall.on(VoxImplant.CallEvents.Disconnected, () => {
        console.log("Call disconnected!");
        currentCall = null;
        call.hangup();
    });

    currentCall.on(VoxImplant.CallEvents.Failed, (e) => {
        console.log("Call failed!", e);
    });
}

function endcall(){
    if (currentCall) {
        currentCall.hangup();
        currentCall = null;
        console.log("Camada encerrada");
    }
}

function declinecall() {
    if (currentCall) {
        currentCall.hangup();
        console.log("Camada recusada");
    }
}

function answercall (){
    sdk.on(VoxImplant.Events.IncomingCall, function (e) {
        currentCall.answer();
        console.log("Chamada recebida de: ", newCall.number);
    })
}