<template>
  <div>
    <!-- Payment Success Screen -->
    <div v-if="status == 'Approved'">
      <v-img
        class="logo-style"
        :src="require('/src/assets/incharge-logo.png')"
        width="160px"
        height="54px"
      ></v-img>
      <v-img
        class="success-logo"
        :src="require('/src/assets/success.png')"
        width="128px"
        height=""
      ></v-img>
      <p class="success-title text-center">Payment Confirmed Successfully!!!</p>
    </div>

    <!-- Payment Failed Screen -->
    <div v-if="status == 'Declined'">
      <v-img
        class="logo-style"
        :src="require('/src/assets/incharge-logo.png')"
        width="160px"
        height="54px"
      ></v-img>
      <v-img
        class="success-logo"
        :src="require('/src/assets/failed.png')"
        width="80px"
        height="80px"
      ></v-img>
      <p class="success-title text-center">Payment Failed!</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status"],
};
</script>

<style scoped>
.logo-style {
  margin: auto;
  position: relative;
  top: 30px;
}
.success-logo {
  margin: auto;
  position: relative;
  top: 220px;
}
.success-title {
  margin: auto;
  position: relative;
  top: 240px;
  font-family: "Inter" !important;
  font-weight: 600;
  font-size: 20px;
}
</style>