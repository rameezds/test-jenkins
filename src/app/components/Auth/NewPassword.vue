<template>
  <div>
    <v-card
      class="main-card"
      :class="{
        'pa-5 ': $vuetify.breakpoint.smAndDown,
      }"
      elevation="0"
    >
      <v-card-title class="px-0">
        <span class="font-weight-bold main-heading"> New Password </span>
      </v-card-title>
      <v-card-title class="pa-0">
        <span class="default-font" style="line-height: 20px">
          Input your new desired password in the input fields below to create a
          new password.
        </span>
      </v-card-title>
      <v-card-text class="pa-0 mt-6">
        <label class="default-font" style="font-weight: 500 !important"
          >New password</label
        >
        <v-text-field
          outlined
          dense
          color="appGray"
          class="mt-2 default-font input-size"
          v-model="password"
          placeholder=" e.g.: X Æ A-12"
          :rules="[rules.required, emptyPassword]"
        >
          <template slot="prepend-inner">
            <img
              width="12"
              :src="require('/src/assets/lock.png')"
              class="mt-1"
            />
          </template>
        </v-text-field>
        <label class="default-font" style="font-weight: 500 !important"
          >Comfirm new password</label
        >
        <v-text-field
          outlined
          dense
          color="appGray"
          class="mt-2 default-font input-size"
          v-model="confirmPassword"
          placeholder=" e.g.: X Æ A-12"
          :rules="[rules.required, emptyPassword]"
        >
          <template slot="prepend-inner">
            <img
              width="12"
              :src="require('/src/assets/lock.png')"
              class="mt-1"
            />
          </template>
        </v-text-field>
        <span class="caption red--text">{{ message }}</span>
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          @click="onSubmit()"
          class="default-heading appBlack white--text input-size mt-2"
          >Change Password</v-btn
        >
        <v-row class="mt-1">
          <v-col lg="6">
            <v-row>
              <v-col lg="10" md="10" sm="10" cols="10">
                <v-icon size="14" color="#8692A6">mdi-arrow-left</v-icon>
                 <a class="caption appBlack--text" href="/signin"
                  >Back to login</a
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="6">
            <span class="caption float-right appDisable--text">
              Need <a class="appBlack--text">Help?</a>
            </span>
          </v-col>
        </v-row>
        <div class="mt-2 input-size"></div>
      </v-card-text>
      <v-card-text class="px-0">
        <p class="text-left caption footer">
          <a class="appGray--text">Privacy &nbsp; | &nbsp; terms & condition</a>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import * as types from "../../../constants/Store";

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      checkbox: false,
      isLoading: false,
      message: "",
      emptyPassword: (v) =>
        /[A-Za-z0-9]{7,}/.test(v) || "Minimum 7 character required",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      if (this.password == "" || this.confirmPassword == "") {
        this.message = "All fields are required";
          setTimeout(() => {
            this.isLoading = false;
            this.message = "";
          }, 5000);
      }
      else if(this.password != this.confirmPassword)
      {
           this.message = "Password does not match";
              setTimeout(() => {
              this.isLoading = false;
              this.message = "";
            }, 5000);
      }
       else {
         this.message = "",
        this.$store
          .dispatch(types.NEW_PASSWORD, {
           password: this.password,
           password_confirmation: this.confirmPassword,
           token: this.$route.params.token,
           email:this.$route.params.email,
          })
          .then((res) => {
            if(res.status==201){
              this.isLoading = false
            }
          })
          .catch((err) => {
            this.isLoading = false;
            console.log("error", err);
          });
      }
    },
  },
};
</script>

<style scoped>
.main-heading {
  font-size: 24px !important;
  font-weight: 600 !important;
}
.input-size {
  width: 100% !important;
}
label {
  color: #161c27;
}
</style>