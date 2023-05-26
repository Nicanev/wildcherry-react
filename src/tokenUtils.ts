import axios from 'axios';
import parseJwt from "./jwtUtils";
import config from "./config";

const refreshToken = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (token && refreshToken) {
    const decodedToken = parseJwt(token);

    axios
      .post(`${config.apiUrl}/auth/refresh/${decodedToken.id}`, {}, {
          headers: {
              refreshToken: refreshToken
          }
      })
      .then((response) => {
        const { token: newToken } = response.data;
        localStorage.setItem('token', newToken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

export default refreshToken;