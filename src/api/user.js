import router from "@/router/index.js";
import axios from "axios";
import { useUserStore } from "@/store/index.js";

export async function login(identifier, password) {
  await axios
    .post("http://192.168.1.22:1337/api/auth/local", {
      identifier: identifier,
      password: password,
    })
    .then((res) => {
      const userStore = useUserStore();
      localStorage.setItem("token", res.data.jwt);
      userStore.user.name = res.data.user.username;
      userStore.user.id = res.data.user.id;
      return router.push("/pile/dashboard");
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

export async function logout() {
  localStorage.removeItem("token");
  return router.push("/pile/login");
}

export async function register(username, email, password) {
  await axios
    .post("http://192.168.1.22:1337/api/auth/local/register", {
      username: username,
      email: email,
      password: password,
    })
    .then((res) => {
      const userStore = useUserStore();
      localStorage.setItem("token", res.data.jwt);
      userStore.user.name = res.data.user.username;
      return router.push("dashboard");
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

export async function validate() {
  let isValid = false;
  await axios
    .get("http://192.168.1.22:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        const userStore = useUserStore();
        userStore.user.name = res.data.username;
        userStore.user.id = res.data.id;
        return (isValid = true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return isValid;
}
