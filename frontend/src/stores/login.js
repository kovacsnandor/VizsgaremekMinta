import { defineStore } from "pinia";

export const useLoginStore = defineStore({
  id: "login",
  state: () => ({
    userName: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    userId: 0,
    number: 0,
    loginTime: 15,
    timerId: null,
    leftTime: null,
    accessTime: 0,
    loginSuccess: 0,
    
  }),
  actions: {
    clearLogin() {
      this.userName= null;
      this.password= null;
      this.accessToken= null;
      this.refreshToken= null;
      this.userId= 0;
      this.number= 0;
      this.loginTime= 15;
      this.timerId= null;
      this.leftTime= null;
      this.accessTime= 0;
      this.loginSuccess = 0;
    },
    decreaseCount() {
      this.count--;
    },
  },
  getters: {
    oddOrEven() {
      return this.count % 2 === 0 ? "even" : "odd";
    },
  },
});
