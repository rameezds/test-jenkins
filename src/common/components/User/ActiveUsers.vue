<template>
  <div>
    <!-- main row  -->
    <v-row class="mt-4 ml-1 mr-1">
      <!-- main col  -->
      <v-col cols="12" md="7" lg="7">
        <v-row no-gutters>
          <v-col cols="12" md="4" lg="4" sm="4">
            <div class="users-data">
              <p class="pt-3 text-center appBlack--text subtitle-2">
                {{total}}
                <v-progress-circular
                      indeterminate
                      color="#212945"
                      size="20"
                      width="2"
                      v-if="totalUser=='-1'"
                      ></v-progress-circular>
                <span v-else class="subtitle-1 font-weight-medium"
                  >&nbsp;{{ totalUser }}</span>
                <span class="float-right d-none d-sm-block">
                  <img width="1" :src="require('/src/assets/divider.png')" />
                </span>
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4" lg="4" sm="4">
            <div class="users-data">
              <p class="pt-3 text-center appBlack--text subtitle-2">
                {{active}}
                <v-progress-circular
                      indeterminate
                      color="#35C11E"
                      size="20"
                      width="2"
                      v-if="activeUser=='-1'"
                      ></v-progress-circular>
                <span v-else class="subtitle-1 successColor--text font-weight-medium"
                  >&nbsp;{{ activeUser }}</span
                >
                <span class="float-right d-none d-sm-block">
                  <img width="1" :src="require('/src/assets/divider.png')" />
                </span>
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="4" lg="4" sm="4">
            <div class="users-data">
              <p class="pt-3 text-center appBlack--text subtitle-2">
                {{inactive}}
                <v-progress-circular
                      indeterminate
                      color="#C11E1E"
                      size="20"
                      width="2"
                      v-if="inactiveUser=='-1'"
                      ></v-progress-circular>
                <span v-else class="subtitle-1 errorColor--text font-weight-medium"
                  >&nbsp;{{ inactiveUser }}</span
                >
              </p>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <!-- second main col  -->
      <v-col cols="12" md="5" lg="5">
        <div class="users-data">
          <v-text-field
            solo
            placeholder="Search by name, ID..."
            v-model="searchBox"
            class="subtitle-2 search-field appGray--text"
          >
            <template slot="prepend-inner">
              <img width="14" :src="require('/src/assets/light_search.png')" />
            </template>
          </v-text-field>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["totalUser", "activeUser", "inactiveUser", "searchField", "total", "active", "inactive"],
  data() {
    return {
      searchBox: "",
    };
  },
  watch: {
    searchBox: {
      handler(newVal) {
        this.$emit("setEvent", newVal);
      },
    },
  },
  mounted(){
  },
   methods:{

   }
};
</script>

<style scoped>
.theme--light.v-input.search-field input::placeholder {
  color: #8692a6;
  font-weight: 400;
}
.search-field input {
  color: #8692a6 !important;
  font-size: 14px;
  font-weight: 400;
}
.users-data {
  background-color: white;
  height: 50px;
  /* border-radius: 4px; */
}
</style>