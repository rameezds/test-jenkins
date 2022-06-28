<template>
  <div>
    <v-app-bar elevation="0" class="d-none d-md-block" height="50px">
      <v-app-bar-title class="">
        <!-- <span class="font-weight-bold black--text mx-6">QB.se</span> -->
        <v-img
          :src="require('/src/assets/incharge-logo.png')"
          width="150px"
          height="48px"
          class="ml-2"
        ></v-img>
      </v-app-bar-title>
      <div v-for="item in items" :key="item.name">
        <router-link :to="{ name: item.path }" class="default-font-navbar" active-class="appBlack--text">
         
            {{ item.name }}
      
        </router-link>
      </div>

      <v-spacer />
      <div>
        <Logout />
      </div>
    </v-app-bar>

    <v-divider class="appAvatar"></v-divider>
    <!-- mobile screen tool bar nav bar  -->
    <v-toolbar
      class="d-flex d-md-none appBackground"
      elevation="0"
      height="50px"
    >
      <v-app-bar-nav-icon @click="openMobileMenu()"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
          :src="require('/src/assets/incharge-logo.png')"
          width="150px"
          height="48px"
          class=""
        ></v-img>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      v-model="dialog"
      absolute
      temporary
      class="appBackground"
    >
      <v-list>
        <v-list-item-group
          active-class="appBlack--text"
          v-for="item in items"
          :key="item.id"
        >
          <v-list-item>
            <v-list-item-title>
              <router-link :to="{ name: item.path }">
                <v-btn text class="subtitle-2 fontLite--text" small>
                  {{ item.name }}
                </v-btn>
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <div class="mt-2">
        <Logout />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Logout from "../nav-bar/Logout.vue";
export default {
  name: "Nav",
  components: {
    Logout,
  },
  data: () => {
    return {
      dialog: false,
      permissions: null,
      role: null,
      items: [
        // {
        //   name: "Overview",
        //   path: "overview",
        // },
        // {
        //   name: "Transactions",
        //   path: "transactions",
        // },
        // {
        //   id: 2,
        //   name: "Payments",
        //   path: "payments",
        // },
        // {
        //   id: 7,
        //   name: "Merchant",
        //   path: "merchant",
        // },
        // {
        //   id: 5,
        //   name: "User",
        //   path: "users",
        // },
        // {
        //   id: 6,
        //   name: "Roles & Permissions",
        //   path: "roles",
        // },
      ],
    };
  },
  methods: {
    openMobileMenu() {
      this.dialog = true;
    },
  },
  mounted() {
    this.permissions = this.$store.getters.getRoleAndPermission.permission;
    this.role = this.$store.getters.getRoleAndPermission.role;

    // Display panels for Admin
    this.role[0].guard_name == "admin_back_office"
      ? this.items.push({ name: "Payments", path: "payments" })
      : null;

    this.role[0].name == "Admin"
      ? this.items.push({ name: "Transactions", path: "transactions" }) &&
        this.items.push({ name: "Users", path: "users" }) &&
        this.items.push({ name: "Merchant", path: "merchant" }) &&
        this.items.push({ name: "Roles & Permissions", path: "roles" }) &&
        this.items.push({ name: "API Key", path: "Api-Key" })
      : null;

    // Roles & permissions for Merchant
    this.permissions.forEach((element) => {
      element.name == "Payment Ops can execute payouts"
        ? this.items.push({ name: "Payments", path: "payments" })
        : null;
    });
  },
};
</script>

<style scoped>
.default-font-navbar {
  font-family: "Inter" !important;
  font-weight: 500;
  font-size: 14px;
  color: #99a0b5;
  margin-left: 18px;
}
/* .btn {

  background-color: #f1f1f1;
  cursor: pointer;
} */
.active-btn :active {
  background-color: black !important;
  color: white !important;
}
</style>
