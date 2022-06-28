<template>
  <div>
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg" height="75vh" width="222px">
      <v-card-title class="panel-title"> Brand </v-card-title>
      <v-card-text>
        <v-row>
          <v-col lg="11" cols="11" md="11" sm="11">
            <v-text-field
              dense
              solo
              background-color="#F7F7F9"
              class="secondary-filters brand-search-field"
              placeholder="Search by Brand"
            >
              <template slot="append">
                <img
                  width="38"
                  :src="require('/src/assets/AppendBlack.png')"
                  class="mr-n3"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col lg="11" cols="11" md="11" sm="11">
            <v-checkbox dense class="mt-n5" color="#161C27" v-model="checkBox">
              <template v-slot:label>
                <span class="check-label">All</span>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="appBackground mt-n5"></v-divider>

        <!-- <v-row>
          <v-col lg="11" cols="11" md="11" sm="11"> -->
            <v-expansion-panels accordion flat multiple>
              <v-expansion-panel  v-for="(brand,i) in brands" :key="i">
                <v-expansion-panel-header>
                  <v-checkbox dense color="#161C27" class="ml-n2">
                      <template v-slot:label>
                    <span class="check-label">{{brand.name}}</span>
                  </template>
                      </v-checkbox>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-for="(title, i) in checkList" :key="i">
                  <v-checkbox dense class="mt-n7 ml-n2" color="#161C27" v-model="title.value">
              <template v-slot:label>
                <span class="check-label ml-5">{{title.label}}</span>
              </template>
            </v-checkbox>
                </v-expansion-panel-content>
                 <v-divider></v-divider>
              </v-expansion-panel>
            </v-expansion-panels>
          <!-- </v-col>
        </v-row> -->

    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkBox: false,
      checkList: [
        { label: "Optimization", value: true ,},
        { label: "Legal", value: false },
        { label: "Launch", value: false },
      ],
      brands:[
          {name:"coke"},
          {name:"Nestle Food"}
      ]
    };
  },
};
</script>

<style >
.panel-title {
  font-size: 15px;
  font-weight: 500;
  color: #212632;
  font-family: "Inter" !important;
}
.check-label {
  font-size: 12px;
  color: #444444;
  font-family: "Inter" !important;
}
.v-list .v-list-item--active {
    color: inherit;
    height: 10px;
}
.v-application--is-ltr .v-expansion-panel-header {
    text-align: left;
    height: 50px;
}
</style>