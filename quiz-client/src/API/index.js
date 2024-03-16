import axios from "axios";

export const BASE_URL = "https://localhost:7183/";

export const ENDPOINTS = {
  participant: "Participant",
  question: "Question",
  getAnswer: "Question/GetAnswer",
};

export const createAPIEndpoint = (enpoint) => {
  let url = BASE_URL + "api/" + enpoint + "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
