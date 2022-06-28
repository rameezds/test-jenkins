<template>
  <div>
    <v-card
      elevation="0"
      class="password-success mx-auto"
      :class="{
        'pa-5 ': $vuetify.breakpoint.smAndDown,
        
      }"
    >
      <v-card-title>
        <span class="font-weight-bold text-lg-h5 text-md-h5 text-sm-h6 text-subtitle-1">
          Password Successfully Changed!!
        </span>
      </v-card-title>
      <v-card-title>
        <span class="caption appDisable--text mt-n6 text-wrapping">
          We have Successfully created your new password.
        </span>
      </v-card-title>
      <v-card-title class="mt-n4">
        <v-btn block href="/signin" class="appBlack white--text mt-2 subtitle-1"
          >Login</v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-row class="mt-n4">
          <v-col lg="12" md="12" cols="12" sm="12">
            <span class="caption float-right appDisable--text">
              Need <a class="appBlack--text">Help?</a></span
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <p class="text-left caption footer">
          <a class="appGray--text">Privacy &nbsp; | &nbsp; terms & condition</a>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style scoped>
.password-success {
  width: 430px;
  margin: auto;
  /* margin-top: 42%; */
}
.main-heading {
  font-size: 24px !important;
  font-weight: 600 !important;
}

</style>