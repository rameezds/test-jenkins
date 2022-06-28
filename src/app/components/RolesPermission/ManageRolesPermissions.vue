<template>
  <div class="ma-5">
    <v-row no-gutters>
      <v-col cols="12" lg="2" md="3" sm="4" class="pa-0">
        <v-card
          width="200px"
          height="744px"
          elevation="0"
          class="bg-white"
          rounded="lg"
        >
          <v-card-title class="d-flex justify-center">
            <v-row>
              <v-col md="3" sm="3" lg="3" cols="3" class="pa-2">
                <v-img
                  :src="require('/src/assets/users.png')"
                  width="32px"
                ></v-img>
              </v-col>
              <v-col md="7" sm="7" lg="7" cols="7" class="pa-0">
                <p class="default-font black--text ma-0" style="height: 15px">
                  <b>{{ role }}</b>
                </p>
                <p class="default-font ma-0" style="height: 15px">
                  Assigned users {{ numberOfUsers }}
                </p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-subtitle class="pa-3">
            <p class="main-heading ma-0" style="font-size: 12px">Permissoins</p>
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text class="pa-3">
            <v-checkbox dense label="Add Merchant" color="#161C27">
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="10" md="9" sm="8" class="pa-0">
        <v-card
          width="1183px"
          height="744px"
          elevation="0"
          class="bg-white"
          rounded="lg"
        >
          <v-card-title>
            <v-row>
              <v-col md="7" cols="12" lg="9">
                <span class="subtitle-1 appBlack--text ml-4">
                  Users with {{ role }} role
                </span>
              </v-col>
              <v-col md="5" cols="12" lg="3">
                <v-text-field
                  class="search-field-modal search-field mt-1"
                  dense
                  clearable
                  v-model="searchValue"
                  placeholder="Search user by name, ID"
                  outlined
                  color="#E8EBF6"
                  height="42px"
                >
                  <template slot="prepend-inner">
                    <img
                      width="16px"
                      class="mt-1"
                      :src="require('/src/assets/light_search.png')"
                    />
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-data-table
              fixed-header
              hide-default-footer
              height="45vh"
              :loading="loader"
              loader-height="2"
              :headers="headers"
              :items="item"
              :mobile-breakpoint="0"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  style="font-size: 16px"
                  color="appColor"
                  class="mr-1"
                  @click="deleteModal(item.id, item.merchant_name)"
                >
                  mdi-trash-can-outline
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["role", "numberOfUsers"],
  data() {
    return {
      searchValue: null,
      loader: false,
      headers: [
        {
          text: "Full name",
          value: "full_name",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "User ID",
          value: "user_id",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Username",
          value: "username",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Register date",
          value: "register_date",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Last login",
          value: "last_login",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "User rights",
          value: "user_rights",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Actions",
          value: "action",
          class: "fontLite--text",
          sortable: false,
        },
      ],
      item: [
        {
          full_name: "asd",
          user_id: "asd",
          username: "asd",
          register_date: "asd",
          last_login: "asd",
          user_rights: "asd",
        },
      ],
    };
  },

  methods: {
    getData() {
      this.loader = false;
    },
  },

  mounted() {
    this.loader = true;
    this.getData();
  },
};
</script>

<style scoped>
::v-deep .v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
  font-family: "Inter";
  font-weight: 500;
  font-size: 12px;
  color: #99a0b5;
}
</style>
