<template>
  <div v-if="res">
    <v-container
      v-if="!paymentSent && !linkExpired"
      fluid
      class="d-flex flex-column align-center justify-center"
    >
      <v-img
        :src="require('/src/assets/incharge-logo.png')"
        width="150px"
        height="48px"
        class="mt-13"
      ></v-img>
      <v-row class="mt-7">
        <div
          :class="{
            'content-div': $vuetify.breakpoint.smAndUp,
            'mobile-view': !$vuetify.breakpoint.smAndUp,
          }"
        >
          <p class="default-heading" style="text-align: center">
            <b>Hey! {{ this.$route.query.user_name }},</b> your merchant
            <b>{{ this.$route.query.behalf_of }}</b> wants to make payout on
            your behalf. Payout is not yet been initiated. it requires your
            consent, kindly press <b>Accept button</b> to approve payout and
            press <b>Decline button</b> to reject payout request.
          </p>

          <p
            v-if="
              parseInt($route.query.intergiro_account_balance) <
              parseInt($route.query.transactions_sum)
            "
            style="color: #c11e1e; text-align: center"
          >
            If Transactions sum exceeds Intergiro Account Balance, then the rest
            of the transactions will fail.
          </p>
        </div>
      </v-row>
      <v-row class="mt-12">
        <v-card
          elevation="0"
          class="bg-white"
          rounded="lg"
          :class="{
            'payment-card': $vuetify.breakpoint.smAndUp,
            'mobile-view': !$vuetify.breakpoint.smAndUp,
          }"
        >
          <v-card-title class="d-flex justify-center pt-5 pb-10">
            <span class="main-heading"> Payment Confirmation </span>
          </v-card-title>
          <v-card-text>
            <v-row
              class="px-5"
              style="border-top: solid 1px #f0f0f0"
              v-for="item in rowData"
              :key="item.name"
            >
              <v-col cols="6" lg="6" md="6">
                <span class="default-font">
                  {{ item.name }}
                </span>
              </v-col>
              <v-col cols="6" lg="6" md="6" class="float-right">
                <v-img
                  v-if="item.name == 'Batch ID'"
                  :src="require('/src/assets/copy.png')"
                  class="img-pointer float-right ma-1"
                  width="12"
                  height="12"
                  contain
                  @click="copyText(item.value)"
                ></v-img>
                <span
                  v-if="
                    item.name == 'Intergiro Account Balance' &&
                    parseInt($route.query.intergiro_account_balance) <
                      parseInt($route.query.transactions_sum)
                  "
                  style="color: #c11e1e; font-weight: 600"
                  class="default-font float-right"
                >
                  {{ item.value }}
                </span>
                <span
                  v-else
                  style="color: #212429"
                  class="default-font float-right"
                >
                  {{ item.value }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row
              class="d-flex justify-end pa-6"
              style="border-top: solid 1px #f0f0f0"
            >
              <v-btn class="mx-3" text @click="submit('decline')">
                Decline
              </v-btn>
              <v-btn
                style="width: 90px !important"
                class="default-heading appBlack white--text"
                @click="submit('accept')"
              >
                Accept
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <ConsentApproval :status="status" v-if="paymentSent" />
    <LinkExpired v-if="linkExpired" />
  </div>
</template>

<script>
import ConsentApproval from "./ConsentApproval.vue";
import LinkExpired from "./LinkExpired.vue";
import * as types from "../../../constants/Store";

import { showSnackbar } from "../../utils/GlobalActions";

export default {
  components: {
    ConsentApproval,
    LinkExpired,
  },

  data() {
    return {
      res: false,
      paymentSent: false,
      status: "",
      linkExpired: false,
      // acceptLoader: false,
      // declineLoader: false,
      overlay: false,

      rowData: [
        {
          name: "Batch ID",
          value: this.$route.query.batch_id,
        },
        {
          name: "Brand Name",
          value: this.$route.query.behalf_of,
        },
        {
          name: "Merchant Name",
          value: this.$route.query.user_name,
        },
        {
          name: "Number of Transactions",
          value: this.$route.query.transactions_count,
        },
        {
          name: "Transactions Sum",
          value: this.$route.query.transactions_sum,
        },
        {
          name: "Intergiro Account Balance",
          value: this.$route.query.intergiro_account_balance,
        },
      ],
    };
  },

  methods: {
    submit(status) {
      this.overlay = true;

      this.$store
        .dispatch(types.CONSENT, {
          user_id: this.$route.query.user_id,
          token: this.$route.query.token,
          consent_status: status == "accept" ? "Approved" : "Declined",
        })
        .then((res) => {
          console.log("consent_res", res.data);
          if (res.data.message == "Approved") {
            this.status = "Approved";
            this.paymentSent = true;
            this.overlay = false;
          }
          if (res.data.message == "Provide valid data.") {
            this.overlay = false;
            showSnackbar("Error!", "Provide valid data.", "error");
          }
        })
        .catch((err) => {
          this.paymentSent = true;
          this.status = "Declined";
          console.log("error", err);
          this.overlay = false;
        });
    },

    checkLinkExpiry() {
      this.$store
        .dispatch(types.LINK_EXPIRY, {
          token: this.$route.query.token,
        })
        .then((res) => {
          this.res = true;

          console.log("consent_res", res.data);
          this.linkExpired = false;
        })
        .catch((err) => {
          this.res = true;

          console.log("error", err);
          this.linkExpired = true;
        });
    },

    copyText(batchId) {
      navigator.clipboard.writeText(batchId);
    },
  },

  mounted() {
    this.checkLinkExpiry();
  },
};
</script>

<style scoped>
.payment-card {
  width: 660px;
  /* height: 389px; */
}
.content-div {
  width: 630px;
}
.mobile-view {
  width: 360px;
}
</style>