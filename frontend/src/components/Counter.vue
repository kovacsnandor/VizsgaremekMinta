<template>
  <span class="fw-bold text-warning fs-2">
    {{ storeCounter.count }}
  </span>
</template>

<script>
import { useCounterStore } from "@/stores/counter";
// const storeCounter = useCounterStore();
// export default {
//   data(){
//     return {
//       storeCounter,
//     }
//   }
// }
</script>

<style>
</style>