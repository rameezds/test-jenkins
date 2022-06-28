import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({

  theme: {
    themes: {
      light: {
        appDisable: "#98989E",
        grayButton: "#EFEFEF",
        appBackground:'#ECECEC',
        appBlack: "#161C27",
        liteGreen:"#4B8799",
        grayBackground:"#E5E5E5",
        appGray: '#8692A6',
        appLiteGray: "#F7F7F9",
        appAvatar:"#E8EBF6",
        fontLite: "#99A0B5",
        appChip:"#CBE7F0",
        appColor: "#6397A8",
        appSearch: "#212632",
        activeColor: "#64BC44",
        successColor: "#35C11E",
        errorColor: "#C11E1E",
        pendingColor: "#E79800",
        filterColor: "rgba(203, 231, 240, 0.26)",
        backgroundColor: "#FFFFFF",
        avatarColor: "#dad3ff",
        borderColor: "#D8D8D8",
        chipBack: "#F3F3F8",
        avatarbgColor: "#E4E4EA",
        textColor: "#ABACBE",
        crossColor: "#808192",
        headerColor: "#484964",
        snackbarColor: "#EBEEF7",
        failedColor: "#F30707",
        notRegisteredColor: "#e44a43",
        dividerColor: "#EFF1F8",
        newMerchantColor: "#808192",
        modalBlack :"#1D1D1D",
        modalGray: "#566477"
      },
    },
   options : {
      customProperties: true
    },
  },
});
