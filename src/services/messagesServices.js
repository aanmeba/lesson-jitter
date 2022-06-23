import jitterAPI from "../config/api";

export async function getMessages() {
  const response = await jitterAPI.get("/messages");
  // console.log(response.data);
  return response.data;
}

export async function createMessage(msg) {
  const response = await jitterAPI.post("/messages", msg);
  console.log(response.data);
  return response.data;
}

export async function getMyMessages() {
  const response = await jitterAPI.get("/messages/mymessages");
  return response.data;
}

export async function getMessagesByUser(username) {
  const response = await jitterAPI.get(`/messages?username=${username}`);
  return response.data;
}
