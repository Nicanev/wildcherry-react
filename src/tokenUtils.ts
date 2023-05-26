import exp from "constants";

const refreshToken = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
        const decodedToken = parseJwt(token);

        axios
            .post(`${config.apiUrl}/auth/refresh/${decodedToken.id}`, {refreshToken})
            .then((response) => {
                const {token: newToken} = response.data;
                localStorage.setItem('token', newToken);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
};

export default refreshToken()