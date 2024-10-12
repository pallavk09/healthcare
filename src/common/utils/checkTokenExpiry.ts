import { jwtDecode } from "jwt-decode";

export function checkTokenExpiry(token: string) {
  //   const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  if (decodedToken) {
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp! - currentTime <= 0) {
      return true;
    } else {
      console.log(
        `Token not expired. ${
          (decodedToken.exp! - currentTime) / 60
        } mins remaining`
      );
      return false;
    }
  } else {
    return true;
  }
}
