<template>
  <v-main>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="appAvatar" dark class="mx-5" size="30">
          <!-- first name first letter  -->
          <span class="appBlack--text caption">
            <!-- AS -->
            {{ avatar }}
          </span>
        </v-avatar>
        <v-btn
          text
          class="black--text nav-btn mx-n2"
          dark
          v-bind="attrs"
          v-on="on"
          width=""
          small
        >
          {{ getUser.name }}
          <v-img
            :src="require('/src/assets/Vector.png')"
            width="8px"
            class="ml-1"
          ></v-img>
        </v-btn>
      </template>
      
      <!-- Profile Dropdown -->
      <v-list>
        <v-list-item>
          <v-list-item-title
            class="cursor"
            border
            @click="userProfile"
          >
            User Profile
          </v-list-item-title>
        </v-list-item>
        <!-- logout list -->
        <v-list-item>
          <v-list-item-title class="cursor" @click="logout">
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser"]),

    avatar(){
      let name = (this.getUser.name).split(" ")
      if(name.length > 1){
        return name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase()
      }else{
        return name[0].charAt(0).toUpperCase() 
      }
    }
  },

  methods: {
    userProfile() {
      this.$router.push({ path: "/user-profile" });
    },
    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("resetState");
      this.$router.push({ path: "/signin" });
    },
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>