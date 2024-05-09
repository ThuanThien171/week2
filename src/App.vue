<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    created() {
    this.$store.dispatch('auth/tryLogin');
  },
  }
</script>

<style>

</style>
