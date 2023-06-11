import axios from 'axios';
import parseJwt from "./jwtUtils";
import config from "./config";

const refreshToken = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (token && refreshToken) {
    const decodedToken = parseJwt(token);

    axios
      .put(`${config.apiUrl}/auth/refresh/${decodedToken.id}`, {}, {
          headers: {
              refreshToken: refreshToken
          }
      })
      .then((response) => {
        const newToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.clear();
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

export default refreshToken;