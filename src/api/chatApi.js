import api from "./axios";

export const askAI = async (message, history = []) => {
  const { data } = await api.post("/assistant/chat", {
    message,
    history,
  });

  return data;
};