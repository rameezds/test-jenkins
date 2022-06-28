<template>
  <div>
    <v-app-bar flat class="justify-center backgroundColorForAll mr-8">
      <!-- Left side - Page Title -->
      <v-toolbar-title class="title" style="font-size: 16px !important">
        {{ getTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Right side -->
      <notifications class="mr-3" />
      <v-divider vertical class="divider"></v-divider>

      <!-- Profile avatar -->
      <v-avatar
        color="avatarColor"
        style="right: 12px"
        size="28px"
        class="ml-6"
      >
        <span class="appColor--text">
          {{ getProfile.name.charAt(0).toLocaleUpperCase() }}
        </span>
      </v-avatar>

      <!-- User name -->
      <span class="hidden-md-and-down profile-name">
        <p class="text-white font-weight-medium">userName</p>
      </span>

      <!-- Dropdown -->
      <v-menu offset-y bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on" style="">
            <v-img
              src="public/icons/logo.png"
              max-width="10px"
              max-height="10px"
            ></v-img>
          </v-btn>
        </template>
        <v-list class="dropdown">
          <v-list-item
            class="dropdown-item"
            @click="setActivePanel('Manage Profile')"
          >
            <icon-base style="margin-top: -9px">
              <Profile />
            </icon-base>
            <v-list-item-content style="margin-top: -9px">
              <v-list-item-title class="profile-font">
                Profile
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import IconBase from "../icon-base/IconBase.vue";
import Notifications from "../notifications/Notifications.vue";
import Profile from "../../../assets/icons/Profile.vue";

export default {
  components: { Notifications, IconBase, Profile },

  data() {
    return {
      activePanel: "Dashboard",
      firstName: "",
    };
  },
  computed: {
    
  },

  methods: {
   
  },
  mounted() {

  },
};
</script>

<style scoped>
.title {
  position: absolute !important;
  height: 19px !important;
  top: 19px !important;
  left: 25px !important;
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: 19px !important;
  color: #484964 !important;
}
.bell-button {
  width: 40px;
  height: 40px;
  right: 11px;
}
.divider {
  min-height: 0px !important;
  height: 22px !important;
  margin-top: 22px !important;
  margin-right: 11px !important;
  background: #ebeef7 !important;
}
.profile-name {
  width: 72px;
  height: 16px;
  top: 21px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  color: #484964;
}
.profile-font {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-left: 15px;
  /* identical to box height */
  color: #484964;
}

.v-toolbar__content {
  padding-top: 0px !important;
  padding-right: 51px !important;
  padding-bottom: 0px !important;
  padding-left: 25px !important;
}

.dropdown {
  width: 123px !important;
  height: 38px !important;
  padding-top: 0px !important;
  overflow: hidden;
  border-radius: 6px !important;
}
</style>
