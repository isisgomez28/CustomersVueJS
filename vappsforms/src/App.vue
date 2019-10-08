<template>
  <div id="app">
    Test
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      modalOpen: false
    }
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    }
  }
}
</script>

<style>

</style>
