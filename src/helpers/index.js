const axios = require("axios");

const encodeClientState = (data) => {
  if (data) {
    const jsonStr = JSON.stringify(data);
    const buffer = Buffer.from(jsonStr);
    return buffer.toString("base64");
  }
};

const decodeClientState = (data) => {
  if (data) {
    const buffer = Buffer.from(data, "base64");
    const str = buffer.toString("ascii");
    return JSON.parse(str);
  }
  return {};
};

const postBridgeCalls = async (callControlID) => {
  await axios
    .post(
      `${process.env.TELNYX_BASE_URL}/calls/${callControlID}/actions/bridge`,
      {
        video_room_id: process.env.TELNYX_VIDEO_ROOMID,
        video_room_context: JSON.stringify({ username: "bob", id: 20 }),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`
      },
      }
    )
    .then((resp) => console.log("postBridgeCalls"))
    .catch((error) => console.log("error=> postBridgeCalls", error));
};

module.exports = {
  encodeClientState,
  decodeClientState,
  postBridgeCalls,
};
