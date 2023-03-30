import { defineStore } from "pinia";

export const useUrlStore = defineStore({
  id: "url",
  state: () => ({
    urlData: "http://localhost:3000",
    urlAuth: "http://localhost:4000",
  }),
  getters: {
    urlLogin() {
      return `${this.urlAuth}/login`;
    },
    urlLogout() {
      return `${this.urlAuth}/logout`;
    },
    urlToken() {
      return `${this.urlAuth}/token`;
    },
    urlCars(){
      return `${this.urlData}/cars`
    },
    urlCarsWithTrips(){
      return `${this.urlData}/carsWithTrips`
    },
    urlCarsTrips(){
      return `${this.urlData}/carsTrips`
    },
    urlCarsWithDrivers(){
      return `${this.urlData}/carsWithDrivers`
    },
    urlDriversAbc(){
      return `${this.urlData}/driversAbc`
    }
  },
});
