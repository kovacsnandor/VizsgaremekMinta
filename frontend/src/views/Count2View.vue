
<template>
  <div class="home">
    <h1>About</h1>
    <button class="btn btn-outline-secondary"
    @click="storeCounter.increaseCount"
    >
      <Counter/>
    </button>
  </div>
</template>

<script setup>
import Counter from "@/components/Counter.vue";
import { useCounterStore } from "@/stores/counter";
const storeCounter = useCounterStore();
</script>


<style>
.counter-button {
  font-size: 50px;
}
</style>
