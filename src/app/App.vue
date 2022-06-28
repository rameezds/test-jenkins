<template>
  <v-app style="background-color: #f7f7f9 !important">
    <div style="height: 100%">
      <router-view />

      <snack-bar />
    </div>
  </v-app>
</template>

<script>
import SnackBar from "../common/components/snackbar/SnackBar.vue";

export default {
  name: "App",
  components: {
    SnackBar,
  },
}
</script>

<style>
@font-face {
  font-family: "Inter";
  src: local("Inter"),
   url(../fonts/Inter-VariableFont_slnt,wght.ttf) format("truetype");
}
</style>

