
<template>
  <div class="container-fluid my-container p-0">
    <!-- Carousel -->
    <Carousel />
    <!-- Menü -->
    <Menu />
    
    <RouterView />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Menu from '@/components/Menu.vue'
// import { useUrlStore } from "./stores/url";
// const storeUrl = useUrlStore();

export default {
  components: { Carousel, Menu},


}
</script>

<style>

</style>

