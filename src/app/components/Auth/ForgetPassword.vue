<template>
  <div>
    <v-card
      class="main-card mx-auto"
      :class="{
        'pa-5 mobile-main-card': $vuetify.breakpoint.smAndDown,
      }"
      elevation="0"
    >
      <v-card-title class="pa-0">
        <span class="font-weight-bold text-lg-h5 text-md-h5 text-sm-h6 text-subtitle-1"> Forgot Password? </span>
      </v-card-title>
      <v-card-title class="pa-0">
        <span class="default-font text-wrapping" style="line-height: 20px">
          Don’t worry we can help you out! if you still remember your email
          address you can quickly reset your password.
        </span>
      </v-card-title>
      <!-- Input fields -->
      <v-card-text class="pa-0 mt-6">
        <label class="default-font" style="font-weight: 500 !important">
          Email
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
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          @click="onSubmit"
          block
          class="default-heading appBlack white--text mt-2"
          >Request Password Change</v-btn
        >
        <!-- back to login need help  -->
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
              Need <a class="appBlack--text help-tag">Help?</a></span
            >
          </v-col>
        </v-row>
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
      isLoading: false,
      emptyEmail: (v) =>
        /[A-Za-z0-9_]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}/.test(v) ||
        "E-mail must be valid",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      if (this.email == "") {
        this.message = "All fields are required";
        setTimeout(() => {
          this.isLoading = false;
          this.message = "";
        }, 5000);
      } else {
        this.$store
          .dispatch(types.FORGOT_PASSWORD, {
            email: this.email,
          })
          .then((res) => {
            if(res.status==200){
              this.isLoading = false;
            }
          })
          .catch((err) => {
            console.log("error", err);
            this.isLoading = false;
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
label {
  color: #161c27;
  /* font-size: 12px; */
  /* font-weight: 500; */
}
.help-tag {
  text-decoration: underline;
}
</style>