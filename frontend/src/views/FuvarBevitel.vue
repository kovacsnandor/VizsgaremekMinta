
<template>
  <div>
    <h1>Fuvar bevitel</h1>
    <hr />
    <div class="row p-3">
      <!-- taxi táblázat -->
      <div class="col-md-5">
        <h2>Aktív taxik</h2>
        <!--#region táblázat -->
        <table class="table table-bordered table-hover w-auto">
          <thead>
            <tr>
              <th>Autó márka</th>
              <th>Rendszám</th>
              <th>Vezető</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(car, index) in cars"
              :key="`car${index}`"
              :class="currentRowBackground(car.id)"
              @click="onClikRow(car.id)"
            >
              <td>{{ car.name }}</td>
              <td>{{ car.licenceNumber }}</td>
              <td>{{ car.driverName }}</td>
            </tr>
          </tbody>
        </table>
        <!--#endregion táblázat -->
      </div>

      <!-- taxi fuvarjai -->
      <div class="col-md-7">
        <h2>Taxi fuvarkezelése</h2>
        <hr />
        <div v-if="currentCarId">
          <h3>Új fuvar</h3>
          <form class="row g-3 needs-validation" novalidate>
            <!-- A fuvar dátumideje -->
            <div class="col-md-6 d-flex align-items-center">
              <label for="date" class="form-label">Mikor</label>
              <input
                type="datetime-local"
                class="form-control ms-2"
                id="date"
                required
                v-model="newTrip.date"
                ref="date"
              />
              <div class="invalid-feedback">A dátum kitöltése kötelező</div>
            </div>
            <!-- Menetidő (perc) -->
            <div class="col-md-6 d-flex align-items-center">
              <label for="numberOfMinits" class="form-label">Menetidő:</label>
              <input
                type="number"
                class="form-control ms-2"
                id="numberOfMinits"
                required
                v-model="newTrip.numberOfMinits"
                ref="numberOfMinits"
              />
              <div class="invalid-feedback">A menetidő kitöltése kötelező</div>
              <button
                type="button"
                class="btn btn-outline-success ms-2"
                @click="onClickSave()"
                ref="save"
                @keyup.enter="onClickSave()"
              >
                <i class="bi bi-save2"></i>
              </button>
            </div>
          </form>
          <hr />

          <h3>Eddigi fuvarok</h3>
          <ul>
            <li v-for="(trip, index) in tripsByCarId" :key="`trip${index}`">
              {{ trip.date }}: {{ trip.numberOfMinits }} perc
              <span
                class="ms-2 my-delete-hover"
                @click="onClickDeleteTrip(trip.id)"
                ><i class="bi bi-trash3-fill"></i
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- delete modal component -->
    <Menu></Menu>
    <YesNo
      v-if="yesNoShow"
      yesNoTitle="Fuvar törlés"
      yesNoMessage="Valóban törölni akarja a fuvart?"
      @yes="onClickDeleteOK()"
      @no="onClickDeleteCancel()"
    ></YesNo>
    
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
import YesNo from "../components/YesNo.vue";
import Menu from "../components/Menu.vue";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();

class Trip {
  constructor(numberOfMinits = null, date = null, carId = null) {
    this.numberOfMinits = numberOfMinits;
    this.date = date;
    this.carId = carId;
  }
}

export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      cars: [],
      currentCarId: null,
      currentTripId: null,
      tripsByCarId: [],
      newTrip: new Trip(),
      yesNoShow: false,
    };
  },
  mounted() {
    this.getCarsWithDriversReal();
  },
  methods: {
    async getCarsWithDriversReal() {
      let url = this.storeUrl.urlCarsWithDriversReal;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.cars = data.data;
    },
    async getTripsByCarId() {
      let url = `${this.storeUrl.urlTripsByCarId}/${this.currentCarId}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.tripsByCarId = data.data;
      this.newTrip = new Trip();
    },
    async postTrip() {
      let url = this.storeUrl.urlTrips;
      this.newTrip.carId = this.currentCarId;
      const body = JSON.stringify(this.newTrip);
      const config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
        body: body,
      };
      const response = await fetch(url, config);
      this.getTripsByCarId();
    },
    async deleteTrip(id) {
      let url = `${this.storeUrl.urlTrips}/${id}`;
      this.newTrip.carId = this.currentCarId;
      const body = JSON.stringify(this.newTrip);
      const config = {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
        body: body,
      };
      const response = await fetch(url, config);
      this.getTripsByCarId();
    },
    currentRowBackground(id) {
      return this.currentCarId == id ? "my-bg-current-row" : "";
    },
    onClikRow(id) {
      this.currentCarId = id;
      this.getTripsByCarId();
      // this.$refs.date.focus();
      // this.$refs.date.showPicker();
    },
    onClickSave() {
      this.postTrip();
    },
    onClickDeleteTrip(id) {
      this.yesNoShow = true;
      this.currentTripId = id;
    },
    onClickDeleteOK() {
      this.deleteTrip(this.currentTripId);
      this.yesNoShow = false;
    },
    onClickDeleteCancel() {
      this.yesNoShow = false;
    },
  },
  components: { YesNo, Menu },
};
</script>


<style>
.my-bg-current-row {
  background-color: lightgrey;
}
tr:hover {
  cursor: pointer;
}
.my-delete-hover:hover {
  color: red;
}
</style>
