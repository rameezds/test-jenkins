<template>
  <div>
     <Navbar/>
       <router-view/>
  </div>
</template>

<script>
import Navbar from "../../common/components/nav-bar/Navbar.vue"
export default {
  name: "dashboard",
  components:{
      Navbar
  }
}
</script>

<style>

</style>