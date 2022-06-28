<template>
  <div>
    <v-row class="mt-10 ml-3 mr-3" v-if="!manageRoles">
      <v-col lg="3" md="3" sm="3" cols="12">
        <CreateRole />
      </v-col>
      <v-col
        lg="3"
        md="3"
        sm="3"
        cols="12"
        v-for="item in roles"
        :key="item.roleName"
      >
        <!-- <Roles :role="item.roleName" :numberOfUsers="item.totalUser" /> -->
        <v-card elevation="0" rounded="lg">
          <v-card-text>
            <v-row>
              <v-col md="3" sm="3" lg="3" cols="3">
                <v-img
                  :src="require('/src/assets/users.png')"
                  width="56px"
                ></v-img>
              </v-col>
              <v-col md="7" sm="7" lg="7" cols="7">
                <div class="appBlack--text subtitle-1">{{ item.roleName }}</div>
                <br />
                <div class="caption fontLite--text font-weight-medium mt-n6">
                  Total Users with this role: {{ item.totalUser }}
                </div>
              </v-col>
              <v-col md="2" sm="2" lg="2" cols="2">
                <span class="float-right" style="background-color: #F7F7F9; border-radius: 4px;">
                  <v-menu offset-y offset-x left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        :src="require('/src/assets/more.png')"
                        class="img-pointer"
                        width="20px"
                        height="20px"
                      ></v-img>
                    </template>
                    <v-list width="128px" height="81px" class="pa-0">
                      <v-list-item dense>
                        <v-list-item-title
                          class="img-pointer"
                          @click="editBrand(brands)"
                        >
                          <v-img
                            :src="require('/src/assets/edit.png')"
                            width="11px"
                            height="12px"
                            class="float-left mt-1"
                          ></v-img>
                          <span class="caption appGray--text ml-3"
                            >Edit Brand</span
                          >
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item dense>
                        <v-list-item-title
                          class="img-pointer"
                          @click="deleteBrand(brands)"
                        >
                          <v-img
                            :src="require('/src/assets/delete.png')"
                            width="11px"
                            height="12px"
                            class="float-left mt-1"
                          ></v-img>
                          <span class="caption appGray--text ml-3"
                            >Delete Brand</span
                          >
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
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
                  @click="viewUsers(item.roleName, item.totalUser)"
                >
                  View users against role
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <ManageRole
      v-if="manageRoles"
      :role="seletedRole"
      :numberOfUsers="seletedNumOfUsers"
    />
  </div>
</template>

<script>
// import Roles from "./RolesCard.vue";
import CreateRole from "./CreateRole.vue";
import ManageRole from "./ManageRolesPermissions.vue";

export default {
  components: {
    // Roles,
    CreateRole,
    ManageRole,
  },
  data() {
    return {
      manageRoles: false,
      seletedRole: null,
      seletedNumOfUsers: null,
      roles: [
        {
          roleName: "Administrator",
          totalUser: 1,
        },
        {
          roleName: "Manager",
          totalUser: 8,
        },
        {
          roleName: "Payment Ops",
          totalUser: 8,
        },
      ],
    };
  },

  methods: {
    getRoles() {},

    viewUsers(role, users) {
      console.log("role", role, users);
      this.manageRoles = true;
      this.seletedRole = role;
      this.seletedNumOfUsers = users;
    },
  },
};
</script>

<style>
</style>