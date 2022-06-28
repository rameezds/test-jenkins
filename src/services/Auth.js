import ApiService from "./Api";

export const getToken = () => {
    return new Promise((resolve) => {
        ApiService.PostRequest("/url", credentials).then(
            (response) => {
                resolve(response);
                if (response.data._metadata.httpResponseCode === 200) {
                    resolve(response);
                    console.log("from data", response.data);
                    localStorage.setItem("token", response.data.records.token);
                }
            }
        );
    });
};
