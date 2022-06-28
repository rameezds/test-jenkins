<template>
  <div>
    <v-card elevation="0" rounded="lg">
      <v-card-text>
        <v-row>
          <v-col md="3" sm="3" lg="3" cols="3">
            <v-img :src="require('/src/assets/users.png')" width="56px"></v-img>
          </v-col>
          <v-col md="7" sm="7" lg="7" cols="7">
            <div class="appBlack--text subtitle-1">{{ role }}</div>
            <br />
            <div class="caption fontLite--text font-weight-medium mt-n6">
              Total Users with this role: {{ numberOfUsers }}
            </div>
          </v-col>
          <v-col md="2" sm="2" lg="2" cols="2">
            <v-img
              :src="require('/src/assets/more.png')"
              width="22px"
              class="ml-3"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="appLiteGray"></v-divider>
      <v-card-text>
        <v-row>
          <v-col md="1" sm="1" lg="5" cols="5"> </v-col>
          <v-col md="9" sm="9" lg="5" cols="5">
            <v-btn
              class="
                appLiteGray
                appBlack--text
                caption
                font-weight-medium
                mt-n2
                mb-n2
              "
              text
              @click="manageRoles = true"
            >
              View users against role
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- <ManageRole
      v-if="manageRoles"
      :role="role"
      :numberOfUsers="numberOfUsers"
    /> -->
  </div>
</template>

<script>
import ManageRole from "./ManageRolesPermissions.vue";
export default {
  props: ["role", "numberOfUsers"],
  components: {
    ManageRole,
  },
  data() {
    return {
      manageRoles: false,
    };
  },
};
</script>

<style>
</style>