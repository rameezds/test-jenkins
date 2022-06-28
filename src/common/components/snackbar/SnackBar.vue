<template>
  <v-snackbar
    transition="scroll-y-reverse-transition"
    v-model="snackbar"
    class="mt-1"
    :color="snackbarType == 'error' ? '#FDE8E6' : '#E4F6EF'"
    top
    right
    timeout="2500"
    height="68px"
    width="200px"
  >
    <v-layout align-center>
      <v-row class="d-flex align-center">
        <v-col cols="1">
          <v-icon
            :color="snackbarType == 'error' ? '#CC493C' : '#3EA279'"
            size="15"
          >
            mdi-information-outline
          </v-icon>
        </v-col>
        <v-col cols="9">
          <p class="ma-0 black--text default-font" style="height: 15px">
            <b>{{ snackbarTitle }}</b>
          </p>
          <p class="ma-0 black--text default-font" style="height: 15px">
            {{ snackbarInfoText }}
          </p>
        </v-col>
      </v-row>
    </v-layout>

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="snackbarType == 'error' ? '#CC493C' : '#3EA279'"
        icon
        v-bind="attrs"
        @click="snackbar = false"
      >
        <v-icon size="15">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import EventBus, { ACTIONS } from "/src/constants/EventBus";

export default {
  name: "SnackBar",
  data: () => ({
    snackbar: false,
    snackbarTitle: "",
    snackbarInfoText: "",
    snackbarType: "",
  }),
  mounted() {
    EventBus.$on(ACTIONS.SNACKBAR, (title, infoText, type) => {
      this.snackbarTitle = title;
      this.snackbarInfoText = infoText;
      this.snackbarType = type;
      this.snackbar = true;
    });
  },
};
</script>
