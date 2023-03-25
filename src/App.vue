<template>
  <div id="app">
    <div class="container">
      <SearchComponent />
    </div>
  </div>
</template>

<script>
import SearchComponent from './components/SearchComponent.vue';

export default {
  name: 'App',
  components: {
    SearchComponent
  }
}
</script>

<style lang="scss" src="@/assets/global.scss">

</style>
