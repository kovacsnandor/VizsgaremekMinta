<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"
        @click="onClickMenu(1)"
      >Taxi</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/"
            :class="{active: menuState === 2}"
            @click="onClickMenu(2)"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about"
            :class="{active: menuState === 3}"
            @click="onClickMenu(3)"
            >About</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="{active: menuState === 4}"
              @click="onClickMenu(4)"
            >
              Taxiállomás
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/taxiFuvarjai"
                  >Taxi és fuvarjai</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" to="/taxiKezeles"
                  :class="{ disabled: !storeLogin.loginSuccess }"
                  >Taxik kezelése</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/fuvarBevitel"
                  >Fuvar bevitel</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Counter
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/count1"
                  :class="{active: menuState === 5}"
                  @click="onClickMenu(5)"
                  >Counter1</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/count2"
                  :class="{active: menuState === 6}"
                  @click="onClickMenu(6)"
                  >Counter2</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!storeLogin.loginSuccess">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="storeLogin.loginSuccess" @click="logout()">
            <router-link class="nav-link" to="/login"
              >Logout ({{ storeLogin.userName }})</router-link
            >
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();

const msg = "helo";
let menuState = null;
async function logout() {
  console.log("logout");
  const urlLogout = storeUrl.urlLogout;
  const body = {
    token: storeLogin.refreshToken,
  };
  const config = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(urlLogout, config);
  storeLogin.clearLogin();
}

function onClickMenu(number){
  this.menuState = number
}
// export default {
//   data() {
//     return {
//       storeUrl,
//       storeLogin
//     }
//   }
// };
</script>

<style>
/* .router-link-active {
  color: white !important
}

.navbar-nav > li > .dropdown-menu a:link,
.navbar-nav > li > .dropdown-menu a:hover { background-color: black} */
</style>