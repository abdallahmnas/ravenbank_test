import axios from "axios";

const headers = () => {
  return {
    // authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
};
const HttpGateway = {
  get: async (data: any) => {
    // console.log("http request data", data);
    const resp = await axios.get(data.baseUrl, {
      headers: data.headers ?? headers(),
    });
    // console.log("http response data", resp.data);

    return resp;
  },
  post: async (data: any) => {
    const resp = await axios.post(data.baseUrl, data.body, {
      headers: data.headers ?? headers(),
    });
    return resp;
  },

  put: async (data: any) => {
    const resp = await axios.put(data.baseUrl, data.body, {
      headers: data.headers ?? headers(),
    });

    return resp;
  },

  patch: async (data: any) => {
    const resp = await axios.patch(data.baseUrl, data.body, {
      headers: data.headers ?? headers(),
    });

    return resp;
  },

  delete: async (data: any) => {
    const resp = await axios.delete(data.baseUrl, {
      headers: data.headers ?? headers(),
    });

    return resp;
  },
};

export default HttpGateway;
