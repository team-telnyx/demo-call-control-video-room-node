const telnyxPackage = require("telnyx");
const { encodeClientState, decodeClientState, postBridgeCalls } = require("./helpers");
const telnyx = telnyxPackage(process.env.TELNYX_API_KEY);

const webhook = async (req, res) => {
  res.status(200).send();

  const event = req.body.data;
  const eventType = event.event_type;

  console.log("webhook - event", event);

  const callIds = {
    call_control_id: event.payload.call_control_id,
    call_session_id: event.payload.call_session_id,
    call_leg_id: event.payload.call_leg_id,
  };

  const call = new telnyx.Call(callIds);

  const clientState = decodeClientState(event.payload.client_state);

  switch (eventType) {
    case "call.initiated":
      console.log('call.initiated')
      const clientStateInitiated = encodeClientState(callIds)
      call.answer({client_state: clientStateInitiated});

      break;
    case "call.answered":
      console.log('call.answered')
      await postBridgeCalls(clientState.call_control_id)
      break;

    case "call.bridged":
      console.log('call.bridged')
    
      break;
    default:
      
      break;
  }
};

module.exports = {
  webhook,
};
