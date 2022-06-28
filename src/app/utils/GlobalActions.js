import EventBus, { ACTIONS } from "../../constants/EventBus";

export const showSnackbar = (message, infoText, type) => {
  EventBus.$emit(ACTIONS.SNACKBAR, message, infoText, type);
};
