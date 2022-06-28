<template>
  <div>
    <v-dialog
      content-class="dialog-style"
      v-model="dialogBox"
      persistent
      width="585px"
      transition="scale-transition"
      :no-click-animation='false'
    >
      <v-card outlined rounded="lg" height="">
        <v-row class="ml-1">
          <v-col lg="10" md="10" cols="9">
            <v-card-title>
              <span class="subtitle-2">Add New Role</span>
            </v-card-title>
          </v-col>
          <v-col lg="1" md="1" cols="2">
            <v-card-title>
              <span>
                <v-img
                  :src="require('/src/assets/modalCross.png')"
                  width="24px" height="24px"
                  class="img-pointer"
                  @click="modalClose()"
                >
                </v-img>
              </span>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider class="appLiteGray"></v-divider>
        <v-card-text class="ml-2 mt-3">
          <label class="caption create-label">Role Name*</label>
          <v-select
            item-text="name"
            item-value="value"
            class="mt-1 search-field-modal"
            background-color="##FFFFFF"
            v-model="rolesName"
            dense
            outlined
            height="42px"
            :items="[
              {
                name: 'Select Role',
                value: '-1',
              },
              {
                name: 'Completed',
                value: '1',
              },
            ]"
          >
            <template slot="selection" slot-scope="data">
              <!-- HTML that describe how select should render selected items -->

              <span class="select-role modalBlack--text">
                {{ data.item.name }}</span
              >
            </template>
            <template slot="item" slot-scope="data">
              <!-- HTML that describe how select should render items when the select is open -->
              <span class="modalBlack--text caption">
                {{ data.item.name }}</span
              >
            </template>
            <template slot="append">
              <img
                width="8"
                :src="require('/src/assets/Polygon.png')"
                class="mt-2"
              />
            </template>
          </v-select>
          <label class="subtitle-2 create-label">Role & Permissions</label>
          <br />
          <br />

          <v-row no-gutters>
            <v-col lg="3" md="3" sm="3" cols="4">
              <label class="subtitle-2 modalGray--text create-label"
                >Admin Access</label
              >
            </v-col>
            <v-col lg="1" md="1" sm="1" cols="1" class="ml-n5 mt-1">
              <v-img
                :src="require('/src/assets/alert-circle.png')"
                width="16px"
                class=""
              ></v-img>
            </v-col>
            <v-col lg="6" md="6" sm="6" cols="6">
              <v-checkbox dense class="mt-n1" color="##D8D8D8">
                <template v-slot:label>
                  <span class="check-label">Select All</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="appLiteGray"></v-divider>
        <v-card-text class="ml-2 mt-3">
          <v-row>
            <v-col lg="3" md="3" cols="4" sm="4">
              <label class="modalBlack--text subtitle-2 create-label"
                >Merchant</label
              >
            </v-col>

            <v-col lg="9" md="9" cols="8" sm="8">
              <v-row>
                <v-col lg="3" md="3" cols="6" sm="3" v-for="(merchantRole ,i) in merchantRoles" :key="i">
                  <v-checkbox dense class="mt-n1" color="##D8D8D8" v-model="merchantRole.mode">
                    <template v-slot:label>
                      <span class="check-label caption ml-n2">{{merchantRole.value}}</span>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
            <v-divider class="appLiteGray mt-n5"></v-divider>
             <v-card-text class="ml-2 mt-3">
          <v-row>
            <v-col lg="3" md="3" cols="4" sm="4">
              <label class="modalBlack--text subtitle-2 create-label"
                >Users</label
              >
            </v-col>

            <v-col lg="9" md="9" cols="8" sm="8">
              <v-row>
                <v-col lg="3" md="3" cols="6" sm="3" v-for="(userRole ,i) in userRoles" :key="i">
                  <v-checkbox dense class="mt-n1" color="##D8D8D8" v-model="userRole.mode">
                    <template v-slot:label>
                      <span class="check-label caption ml-n2">{{userRole.value}}</span>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="appLiteGray mt-n5"></v-divider>
         <v-card-text class="mt-3">
              <v-row class="">
                  <v-col md="7" lg="7" cols="12" sm="7">

                  </v-col>
                  <v-col md="5" lg="5" cols="12" sm=5>
                   <v-row class="">
                       <v-col md="5" lg="5" sm="5" cols="7" class="mt-2">
                             <a class="appBlack--text">Cancel</a>
                       </v-col>
                       <v-col md="6" lg="6" sm="6" cols="3">
                        <v-btn class="appBlack white--text caption"
                         width="120px" height="36px" @click="createUpdate()">Create/update</v-btn>
                       </v-col>
                   </v-row>

                  </v-col>
              </v-row>
            
          </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogBox"],
  data() {
    return {
      rolesName: "-1",
      merchantRoles:[
          {value:"Create" , mode:true},
          {value:"Read", mode:false},
          {value:"Update", mode:false},
          {value:"Delete", mode:false},
      ],
       userRoles:[
          {value:"Create" , mode:false},
          {value:"Read", mode:true},
          {value:"Update", mode:false},
          {value:"Delete", mode:false},
      ]
    };
  },
  methods: {
    modalClose() {
      this.dialogBox = false;
      this.$emit("setEvent", this.dialogBox);
      console.log(this.dial);
    },
    createUpdate(){
        
    }
  },
};
</script>

<style scoped>
.create-label {
  color: #484848;
  font-family: "Inter" !important;
  font-weight: 600 !important;
}
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #e8ebf6;
  font-weight: 900;
}
.select-role {
  font-size: 14px;
  font-family: "Inter" !important;
}
.check-label {
  color: #566477;
  font-size: 16px;
  font-family: "Inter" !important;
  font-weight: 500;
}
</style>