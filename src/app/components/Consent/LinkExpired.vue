<template>
  <div>
    <div>
      <v-img
        class="logo-style"
        :src="require('/src/assets/incharge-logo.png')"
        width="160px"
        height="54px"
      ></v-img>
      
      <p class="title text-center">Link has expired!!!</p>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.logo-style {
  margin: auto;
  position: relative;
  top: 30px;
}

.title {
  margin: auto;
  position: relative;
  top: 240px;
  font-family: "Inter" !important;
  font-weight: 600;
  font-size: 20px;
}
</style>