<template>
  <v-container>
    <v-row class="py-4">
      <span
        class="default-heading"
        style="font-size: 16px"
      >
        Profile Overview
      </span>
    </v-row>
    <v-row class="pb-14">
      <v-col cols="12" lg="2" md="2" class="d-flex pa-0">
        <v-card height="310px" elevation="0" class="bg-white" rounded="lg">
          <v-card-title class="d-flex justify-center pt-6">
            <v-avatar color="#F7F7F9" size="140" rounded>
              <span style="font-size: 50px">
                {{ avatar }}
              </span>
            </v-avatar>
          </v-card-title>

          <v-card-subtitle class="d-flex justify-center py-3">
            <span class="main-heading">
              {{ getUser.name }}
            </span>
          </v-card-subtitle>

          <v-card-text class="">
            <span class="default-heading d-flex justify-center pt-4 pb-1">
              Available balance
            </span>
            <div class="balance-div d-flex justify-center align-center">
              <span> $23,4560000 </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="10" md="10" class="pa-0 pl-3">
        <v-card elevation="0" class="bg-white mb-6 py-2" rounded="lg">
          <v-card-text class="">
            <v-row class="ml-1 mr-1">
              <v-col
                cols="12"
                md="6"
                lg="6"
                v-for="item in textFields"
                :key="item.label"
              >
                <label class="label-font">{{ item.label }}</label>
                <span
                  class="label-font float-right"
                  v-if="item.label == 'IBAN'"
                >
                  Request IBAN Change
                </span>
                <v-text-field
                  class="default-font"
                  style="background-color: #f7f7f9 !important"
                  :placeholder="item.placeholder"
                  dense
                  outlined
                  hide-details
                  readonly
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <span class="default-heading" style="font-size: 16px"> API Keys </span>
        <v-card elevation="0" class="bg-white mb-6 mt-2 py-2" rounded="lg">
          <v-card-text class="">
            <v-row class="ml-1 mr-1">
              <v-col
                cols="12"
                md="6"
                lg="6"
                v-for="item in apiFields"
                :key="item.label"
              >
                <label class="label-font">{{ item.label }}</label>
                <!-- style=" width: 375px" -->
                <v-text-field
                  class="default-font ma-0"
                  background-color="#f7f7f9"
                  :placeholder="item.placeholder"
                  outlined
                  dense
                  readonly
                  hide-details
                >
                  <template slot="append">
                    <img
                      width="16"
                      class="mt-1"
                      :src="require('/src/assets/eye-grey.png')"
                    />
                  </template>
                  <template slot="append-outer" class="ma-0">
                    <div class="share-icon d-flex justify-center align-center">
                      <img width="16" :src="require('/src/assets/share.png')" />
                    </div>
                  </template>
                </v-text-field>

                <!-- <div class="share-icon d-flex justify-center align-center">
                  <img width="16" :src="require('/src/assets/share.png')" />
                </div> -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <span class="default-heading" style="font-size: 16px">
          Change Password
        </span>
        <v-card elevation="0" class="bg-white mt-2 py-2" rounded="lg">
          <v-card-text class="">
            <v-row class="ml-1 mr-1">
              <v-col cols="12" md="4" lg="4">
                <!-- v-for="item in passwordFields"
                :key="item.label" -->
                <label class="label-font">Old Password</label>
                <v-text-field
                  class="default-font mt-1"
                  placeholder="Enter old password"
                  v-model="old_password"
                  :rules="[rules.required, rules.length]"
                  dense
                  outlined
                  height="42px"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <label class="label-font">New Password</label>
                <v-text-field
                  class="default-font mt-1"
                  placeholder="Enter new password"
                  :rules="[rules.required, rules.length]"
                  v-model="new_password"
                  dense
                  outlined
                  height="42px"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" lg="4">
                <label class="label-font">Confirm New Password</label>
                <v-text-field
                  class="default-font mt-1"
                  placeholder="Re-enter new password"
                  :rules="[rules.required, rules.length]"
                  v-model="confirm_password"
                  :rule="passwordRule"
                  dense
                  outlined
                  height="42px"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-end px-7 py-3">
              <v-btn
                class="appBlack white--text caption"
                width="136px"
                @click="updatePassword"
              >
                Update Password
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../../constants/Store";

export default {
  data() {
    return {
      textFields: [
        {
          label: "User Name",
          placeholder: this.$store.getters.getUser.name,
        },
        {
          label: "Email",
          placeholder: this.$store.getters.getUser.email,
        },
        {
          label: "Account Reference",
          placeholder: "",
        },
        {
          label: "IBAN",
          placeholder: "",
        },
      ],
      apiFields: [
        {
          label: "Public API Key",
          placeholder: this.$store.getters.getUser.public_key,
        },
        {
          label: "Private API Key",
          placeholder: this.$store.getters.getUser.private_key,
        },
      ],
      old_password: "",
      new_password: "",
      confirm_password: "",

      rules: {
        required: (value) => !!value || "Required.",
        length: (value) =>
          /[A-Za-z0-9]{7,}/.test(value) || "Minimum 7 character required",
      },

      role: null,
      adminRight: null,
    };
  },

  methods: {
    updatePassword() {
      console.log("updatePassword");

      this.$store
        .dispatch(types.UPDATE_PASSWORD, {
          current_password: this.old_password,
          password: this.new_password,
          password_confirmation: this.confirm_password,
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },

  computed: {
    ...mapGetters(["getUser"]),

    avatar() {
      let name = this.getUser.name.split(" ");
      if (name.length > 1) {
        return (
          name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase()
        );
      } else {
        return name[0].charAt(0).toUpperCase();
      }
    },

    passwordRule() {
      return (
        this.new_password === this.confirm_password ||
        "Password does not matched"
      );
    },
  },

  mounted() {
    this.role = this.$store.getters.getRoleAndPermission.role;
    this.role[0].name == "admin"
      ? (this.adminRight = true)
      : null;
  },
};
</script>

<style scoped>
.label-font {
  font-family: "Inter" !important;
  font-weight: 600;
  font-size: 12px;
  color: #484848;
}
::v-deep .v-text-field fieldset,
.v-text-field .v-input__control {
  border: none;
  /* background: #f7f7f9; */
  border-radius: 4px;
  /* width: 370px; */
}

::v-deep
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  border: 1px solid #e8ebf6 !important;
  border-radius: 4px !important;
}
.v-application .rounded {
  border-radius: 12px !important;
}
.balance-div {
  background-color: #242424 !important;
  color: #ffffff !important;
  /* width: 160px; */
  width: 100%;
  height: 40px;
  border-radius: 4px;
}
.share-icon {
  width: 42px;
  height: 42px;
  border: 1px solid #f7f7f9;
  border-radius: 4px;
}
::v-deep .v-input__append-outer {
  margin-top: 0px !important;
}
</style>