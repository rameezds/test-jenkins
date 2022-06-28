<template>
  <div>
    <ActiveUsers
      :totalUser="totalUser"
      :activeUser="activeUser"
      :inactiveUser="inactiveUser"
      :searchField="searchField"
      @setEvent="onSubmit"
      :total="'Total User'" :active="'Active User'" :inactive="'Inactive User'"
      ref="active"
    />
    <!-- table card  -->
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg">
      <v-card-title class="pt-8">
           <v-row>
          <v-col md="7" cols="12" lg="9" sm="7">
            <span class="subtitle-1 appBlack--text ml-4">Users</span>
          </v-col>
          <v-col md="5" cols="12" lg="3" sm="4">
            <v-row>
              <v-col md="6" cols="4" lg="6" sm="8"> 
                <v-select
                  item-text="name"
                  item-value="value"
                  class="caption mt-2"
                  background-color="#F7F7F9"
                  v-model="selectRole"
                  outlined
                  height=""
                  dense
                  :items="[
                    { name: 'Select Roles', value: '-1',},
                    { name: 'Payment Ops', value: 'Payment Ops',},
                  ]"
                >
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->

                    <span class="appBlack--text ma-2">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    <span class="appBlack--text"> {{ data.item.name }}</span>
                  </template>
                  <template slot="append">
                    <img
                      width="10"
                      :src="require('/src/assets/Polygon.png')"
                      class="mt-2"
                    />
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="5" lg="5" sm="4" class="export-col">
                <v-btn
                  class="appBlack white--text caption mt-2"
                  width="145px"
                  @click="inviteUser()"
                >
                  Invite New User
                  <v-icon size="14px" class="pl-1">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <span>
          <InviteUser :dialogBox="inviteNewUser" @setEvent="closeDialog()" />
        </span>
        <v-data-table
          fixed-header
          hide-default-footer
          height="45vh"
          :mobile-breakpoint="0"
          :loading="loader"
          loader-height="2"
          no-data-text="No Record Found"
          :headers="headers"
          :items="item"
          :items-per-page="itemsPerPage.key"
          :page="page.key"
        >
          <template slot="item" slot-scope="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.created_at }}</td>
              <td>{{ props.item.last_login }}</td>
              <td>
                <!-- {{ props.item.roles[0].name }} -->

                <span v-if="props.item.roles.length > 0">
                  {{ props.item.roles[0].name }}
                </span>

              </td>
              <td>
                <v-switch
                  color="#64BC44"
                  dense
                  inset
                  v-model="props.item.status"
                  @click="switchIndex(props.item)"
                >
                </v-switch>
              </td>
              <td>
                <v-btn
                  text
                  width="101px"
                  @click="manageUser(props.item)"
                  class="caption"
                  >Manage Role</v-btn
                >
              </td>
            </tr>
          </template>
        </v-data-table>
        <ManageUser
          :dialogBox="manageUserDialog"
          :object="{ detailObject }"
          @setEvent="closeUserDialog()"
        />
      </v-card-text>
      <!-- <UserTable/> -->
    </v-card>
    <Pagination
      v-if="item.length > 0"
      :count="total"
      :itemsPerPage="itemsPerPage"
      :page="page"
    />
     <UserStatus 
      :switchDialog="switchDialog"
      @setEvent="closeStatus()"     
    />
  </div>
</template>

<script>
// import SEARCH_USER from "../../../constants/Store";
import ActiveUsers from "../../../common/components/User/ActiveUsers.vue";
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";
import UserStatus from "../../../common/components/InactiveStatus/InactiveStatus.vue"

import InviteUser from "./InviteUserModal.vue";
import ManageUser from "./ManageUserModal.vue";
// import UserTable from "./UserTable.vue"
export default {
  components: {
    Pagination,
    InviteUser,
    ManageUser,
    ActiveUsers,
    UserStatus,
    // UserTable
  },
  data() {
    return {
      totalUser: "",
      activeUser: "",
      inactiveUser: "",
      selectRole: "-1",
      searchField: types.SEARCH_USER,
      inviteNewUser: false,
      manageUserDialog: false,
      detailObject: {},
      switchDialog:false,
      headers: [
        { text: "Full Name", value: "fullName", class: "fontLite--text" , sortable:false },
        { text: "Register Date", value: "created_at", class: "fontLite--text" , sortable:false },
        { text: "Last Login ", value: "last_login", class: "fontLite--text", sortable:false },
        { text: "User Roles", value: "roles", class: "fontLite--text", sortable:false },
        { text: "Active/Inactive", value: "active", class: "fontLite--text", sortable:false },
        { text: "Action", value: "action", class: "fontLite--text", sortable:false },
      ],
      item: [],
      page: {
        key: 1,
      },
      itemsPerPage: {
        key: 5,
      },
      total: 0,
      loader: false,
    };
  },

  watch: {
    "page.key"() {
      this.getData();
    },
    "itemsPerPage.key"() {
      this.getData();
    },
  },

  methods: {
    onSubmit(value) {
      this.loader = true;

      this.$store
        .dispatch(types.MERCHANT_DATA, {
          per_page: this.itemsPerPage.key,
          page: this.page.key,
          name: value,
          is_user: "User",
        })
        .then((res) => {
          console.log("user_res", res);
          this.loader = false;
          this.item = res.data.users.data;
          this.total = res.data.users.total;
          this.totalUser= res.data.count;
          this.inactiveUser = res.data.inactive;
          this.activeUser = res.data.active;
          this.item.map((items) => {
            if (items.is_active == "0") {
              items.status = false;
            }
            if (items.is_active == "1") {
              items.status = true;
            }
          });
          this.loader = false;
        })
        .catch((err) => {
          console.log("user_error", err.response);
          this.loader = false;
        });
    },
    switchIndex(index) {
      console.log(index, "index");
      if(index.status=='0')
        {
          this.switchDialog = true;
        }
      this.$store
        .dispatch(types.USER_STATUS, {
          id: index.id,
          status: index.status,
        })
        .then((res) => {
          console.log("res", res);
          this.item = res.data;
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    searchUser(value) {
      console.log("my", value);
    },
    inviteUser() {
      this.inviteNewUser = true;
    },
    closeDialog() {
      this.inviteNewUser = false;
    },
    closeUserDialog() {
      this.manageUserDialog = false;
    },
    manageUser(item) {
      this.detailObject = item;
      this.manageUserDialog = true;
    },
    // close status modal 
      closeStatus(){
      this.switchDialog = false;
    }
  },

  mounted() {
    this.loader = true;

    this.onSubmit();
  },
};
</script>

<style scoped>
.main-div {
  background-color: white;
  height: 52px;
  border-radius: 4px;
}
.v-data-table::v-deep th {
  font-size: 12px !important;
  font-weight: 500 !important;
  font-family: "Inter" !important;
}
.v-data-table::v-deep td {
  font-size: 12px !important;
  font-weight: 500 !important;
  font-family: "Inter" !important;
  color: #212945;
}
/* .v-data-table::v-deep tr {
  height: 48px !important;
} */
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #d8d8d8;
}
::v-deep.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0 12px;
    height: 35px;
}
</style>