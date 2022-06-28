<template>
  <div>
    <v-card
      class="main-card"
      :class="{
        'pa-5 mobile-main-card': $vuetify.breakpoint.smAndDown,
      }"
      elevation="0"
    >
      <v-card-title class="pa-0">
        <span
          class="font-weight-bold default-font"
          style="font-size: 16px !important"
        >
          Hello!
        </span>
      </v-card-title>
      <v-card-title class="pa-0">
        <span class="font-weight-bold main-heading"> Welcome Back! </span>
      </v-card-title>
      <!-- Input fields -->
      <v-card-text class="pa-0 mt-6">
        <label class="default-font" style="font-weight: 500 !important">
          Email or UserName
        </label>
        <v-text-field
          outlined
          dense
          color="appGray"
          class="mt-2 default-font input-size"
          v-model="email"
          placeholder=" e.g.: elonmusk@mars.com"
          :rules="[rules.required, emptyEmail]"
        >
          <template slot="prepend-inner">
            <img
              width="16"
              :src="require('/src/assets/Email.png')"
              class="mt-1"
            />
          </template>
        </v-text-field>
        <!-- passowrd  -->
        <label class="default-font" style="font-weight: 500 !important">
          Password
        </label>
        <v-text-field
          outlined
          dense
          color="appGray"
          class="mt-2 default-font input-size"
          v-model="password"
          placeholder=" e.g.: X Æ A-12"
          :rules="[rules.required, emptyPassword]"
          :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show4 ? 'text' : 'password'"
          @click:append="show4 = !show4"
          @keyup.enter="onSubmit"
        >
          <template slot="prepend-inner">
            <img
              width="12"
              :src="require('/src/assets/lock.png')"
              class="mt-1"
            />
          </template>
        </v-text-field>
        <!-- on submit button  -->
        <span class="caption red--text">{{ message }}</span>
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          block
          class="default-heading appBlack white--text mt-2"
          @click="onSubmit"
        >
          Login
        </v-btn>
        <!-- remember me -->
        <v-row class="mt-1">
          <v-col lg="6">
            <v-row>
              <v-col lg="1" md="1" sm="2" cols="1">
                <!-- <v-checkbox dense class="mt-n1" color="#8692A6"></v-checkbox> -->
              </v-col>
              <v-col lg="10" md="10" sm="10" cols="10">
                <!-- <span class="caption appGray--text">Remember me</span> -->
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="6">
            <span class="caption float-right">
              <a class="appGray--text" href="/forgot-password">
                Forget Password
              </a>
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
      email: "",
      password: "",
      checkbox: false,
      isLoading: false,
      message: "",
      show3: false,
      show4: false,
      emptyEmail: (v) =>
        /[A-Za-z0-9_]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}/.test(v) ||
        "E-mail must be valid",
      emptyPassword: (v) =>
        /[A-Za-z0-9]{7,}/.test(v) || "Minimum 7 character required",
      rules: {
        required: (value) => !!value || "Required.",
      },

      sidebarItems: [],
    };
  },
  methods: {
    onSubmit() {
      this.isLoading = true;

      if (this.email === "" || this.password === "") {
        this.message = "All fields are required";
        setTimeout(() => {
          this.isLoading = false;
          this.message = "";
        }, 5000);
      } else {
        this.message = "";

        this.$store
          .dispatch(types.LOGIN, {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            // console.log("res", res);
            // this.renderSideBar();

            // this.$store.dispatch("setSideBarItem", {
            //   // dashboard: this.dashboardPermission,
            //   items: this.filterItem,
            // });

            this.isLoading = false;
            this.$router.push("/");
          })
          .catch((err) => {
            console.log("error", err);
            this.isLoading = false;
            this.message = err.response.data.error;
            setTimeout(() => {
              this.message = "";
            }, 5000);
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
.check-box {
  color: aqua !important;
}
</style>