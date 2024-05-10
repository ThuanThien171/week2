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
    this.loadUsers();
    },
    methods: {
      async loadUsers(){
            try {
                await this.$store.dispatch('users/getUserApi');
            } catch (error) {
                this.$swal({
                  icon: 'error',
                  title: 'Lỗi',
                  text: error || 'Không thể lấy dữ liệu người dùng!',
                })
            }
        },
    }
  }
</script>

<style>

</style>
