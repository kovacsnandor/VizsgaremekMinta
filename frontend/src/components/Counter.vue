<template>
  <span class="fw-bold text-warning fs-2">
    {{ storeCounter.count }}
  </span>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
const storeCounter = useCounterStore();
</script>

<style>
</style>