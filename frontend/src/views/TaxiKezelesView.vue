
<template>
  <div>
    <h1>Taxi kezelés</h1>

    <!--#region táblázat -->
    <table class="table table-bordered table-hover w-auto">
      <thead>
        <tr>
          <th>
            <!-- New car -->
            <button
              type="button"
              class="btn btn-outline-success btn-sm"
              @click="onClickNew()"
            >
              Új autó
            </button>
          </th>
          <th>Autó márka</th>
          <th>Rendszám</th>
          <th>Tarifa (Ft/óra)</th>
          <th>Vezető</th>
          <th>Forgalmon kívül</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(car, index) in cars"
          :key="`car${index}`"
          :class="currentRowBackground(car.id)"
          @click="onClikRow(car.id)"
        >
          <td class="text-nowrap">
            <!-- törlés -->
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="onClickDelete(car.id)"
            >
              <i class="bi bi-trash3-fill"></i>
            </button>

            <!-- módosítás -->
            <button
              type="button"
              class="btn btn-outline-primary btn-sm ms-2"
              @click="onClickEdit(car.id)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
          </td>
          <td>{{ car.name }}</td>
          <td>{{ car.licenceNumber }}</td>
          <td>{{ car.hourlyRate }}</td>
          <td>{{ car.driverName }}</td>
          <td>
            <input
              class="form-check-input"
              disabled
              type="checkbox"
              :id="`cb${index}`"
              v-model="car.outOfTraffic"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <!--#endregion táblázat -->

    <!--#region Modal -->
    <div
      class="modal fade"
      id="modalCar"
      tabindex="-1"
      aria-labelledby="modalCarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ stateTitle }}
            </h1>
            <button
              type="button"
              class="btn-close"
              @click="onClickCancel()"
              aria-label="Close"
            ></button>
          </div>

          <!--#region Modal body -->
          <div class="modal-body">
            <!--#region Form -->

            <form class="row g-3 needs-validation" novalidate>
              <!-- Autó név -->
              <div class="col-md-12">
                <label for="name" class="form-label">Autó név</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  required
                  v-model="editableCar.name"
                />
                <div class="invalid-feedback">A név kitöltése kötelező</div>
              </div>

              <!-- Rendszám -->
              <div class="col-md-6">
                <label for="licenceNumber" class="form-label">Rendszám</label>
                <input
                  type="text"
                  class="form-control"
                  id="licenceNumber"
                  required
                  v-model="editableCar.licenceNumber"
                />
                <div class="invalid-feedback">
                  A rendszám kitöltése kötelező
                </div>
              </div>

              <!-- Rendszám -->
              <div class="col-md-6">
                <label for="hourlyRate" class="form-label"
                  >Tarifa (Ft/óra)</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="hourlyRate"
                  required
                  v-model="editableCar.hourlyRate"
                />
                <div class="invalid-feedback">A tarifa kitöltése kötelező</div>
              </div>

              <!-- out of traffic -->
              <div class="col-md-6">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="outOfTraffic"
                  v-model="editableCar.outOfTraffic"
                />
                <label class="form-check-label ms-2" for="flexCheckDefault">
                  Forgalmon kívül
                </label>
              </div>

              <div class="col-md-6">
                <select class="form-select" aria-label="Default select example"
                  v-model="editableCar.driverId"
                >
                <option :value="null">Nincs sofőr</option>
                <option v-for="(driver, index) in driversAbc" :key="`op${index}`"
                  :value="driver.id">
                  {{ driver.driverName }}
                </option>
                </select>
              </div>
            </form>
            <!--#endregion Form -->
          </div>
          <!--#endregion Modal body -->

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="onClickCancel()"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              
              @click="onClickSave()"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--#endregion Modal -->
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();

class Car {
  constructor(
    id = 0,
    name = null,
    licenceNumber = null,
    hourlyRate = null,
    outOfTraffic = false,
    driverId = null
  ) {
    this.id = id;
    this.name = name;
    this.licenceNumber = licenceNumber;
    this.hourlyRate = hourlyRate;
    this.outOfTraffic = outOfTraffic;
    this.driverId = driverId;
  }
}

export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      cars: [],
      editableCar: new Car(),
      modal: null,
      form: null,
      state: "view",
      currentId: null,
      driversAbc: [],
    };
  },
  mounted() {
    this.getCars();
    this.getFreeDriversAbc();
    this.modal = new bootstrap.Modal(document.getElementById("modalCar"), {
      keyboard: false,
    });

    this.form = document.querySelector(".needs-validation");
  },
  methods: {
    async getCars() {
      let url = this.storeUrl.urlCarsWithDrivers;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.cars = data.data;
      // this.cars = data.data.map((car) => {
      //   car.outOfTraffic = car.outOfTraffic === 1;
      //   return car;
      // });
    },
    async getCarById(id) {
      let url = `${this.storeUrl.urlCars}/${id}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.editableCar = data.data;
    },

    async getFreeDriversAbc() {
      let url = this.storeUrl.urlFreeDriversAbc;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.driversAbc = data.data;
    },

    async postCar() {
      let url = this.storeUrl.urlCars;
      const body = JSON.stringify(this.editableCar);
      const config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
        body: body,
      };
      const response = await fetch(url, config);
      this.getCars();
    },
    async putCar() {
      const id = this.editableCar.id;
      let url = `${this.storeUrl.urlCars}/${id}`;
      const body = JSON.stringify(this.editableCar);
      const config = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
        body: body,
      };
      const response = await fetch(url, config);
      this.getCars();
    },
    async deleteCar(id) {
      let url = `${this.storeUrl.urlCars}/${id}`;
      const config = {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      this.getCars();
    },
    onClikRow(id) {
      this.currentId = id;
    },
    onClickNew() {
      this.state = "new";
      this.currentId = null;
      this.editableCar = new Car();
      this.modal.show();
    },
    onClickDelete(id) {
      this.state = "delete";
      this.deleteCar(id);
      this.currentId = null;
    },
    onClickEdit(id) {
      this.state = "edit";
      this.getCarById(id);
      this.getFreeDriversAbc();
      this.modal.show();
    },
    onClickCancel() {
      this.editableCar = new Car();
      this.modal.hide();
    },
    onClickSave() {
      this.form.classList.add("was-validated");
      if (this.form.checkValidity()) {
        if (this.state == "edit") {
          //put
          this.putCar();
          // this.modal.hide();
        } else if (this.state == "new") {
          //post
          this.postCar();
          // this.modal.hide();
        }
        this.modal.hide();
        //frissíti a taxisok listáját
        this.getFreeDriversAbc()
      }
    },
    currentRowBackground(id) {
      return this.currentId == id ? "my-bg-current-row" : "";
    },
    outOfTrafficName(outOfTraffic) {
      return outOfTraffic ? "igen" : "nem";
    },
  },
  computed: {
    stateTitle() {
      if (this.state === "new") {
        return "Új autó bevitele";
      } else if (this.state === "edit") {
        return "Autó módosítása";
      }
    },
  },
};
</script>


<style>
.my-bg-current-row {
  background-color: lightgrey;
}
</style>
