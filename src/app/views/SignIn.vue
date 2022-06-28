<template>
  <v-row no-gutters style="height: 100%">
    <div class="col-sm-6 col-md-6 col-lg-6 d-none d-md-block">
      <v-img :src="require('/src/assets/login.png')" height="100vh"></v-img>
    </div>
    <div
      class="
        col-xs-12 col-sm-12 col-md-6 col-lg-6
        bg-white
      "
      :class="{
        'd-flex align-center justify-center': $vuetify.breakpoint.smAndUp,
      }"
    >
      <SignIn />
    </div>
  </v-row>
</template>

<script>
import SignIn from "../components/Auth/SignIn.vue";
export default {
  name: "signin",
  components: {
    SignIn,
  },
};
</script>

<style>
</style>