<template>
  <div class="mt-3 mb-3">
    <div class="d-flex align-items-center mt-3 mb-3">
      <button
        class="btn btn-outline-primary"
        @click="storeCounter.decreaseCount"
      >
        <i class="bi bi-dash"></i>
      </button>

      <span class="fw-bold text-warning fs-2">
        {{ storeCounter.count }}
      </span>
      
      <button
        class="btn btn-outline-primary ms-3"
        @click="storeCounter.increaseCount"
      >
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>

    <hr />

    <div>This counter is: {{ storeCounter.oddOrEven }}</div>

    <hr />

    <div class="d-flex align-items-center">
      <p class="m-0">Edit counter</p>
      <input
        type="number"
        class="form-control my-width-100 ms-3"
        v-model="storeCounter.count"
      />
    </div>
  </div>
</template>

<script>
// import Counter from "@/components/Counter.vue";
import { useCounterStore } from "@/stores/counter";
const storeCounter = useCounterStore();
export default {
  data() {
    return {
      storeCounter,
    };
  },
};
</script>

<style>
</style>
