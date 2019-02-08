import {create} from "apisauce";
export const api = create({
    baseURL: "baseUrl",
    timeout: 40000,
    headers: {
        "Accept-Language": "fa",
    },
});

api.addAsyncRequestTransform(request => async () => {
   // somteting like add token to requests
});
api.addResponseTransform(response => {
    console.log("response", response);
    if (response.status === 200 || response.status === 201) {
        return response;
    } else {
        throw response;
    }
});

