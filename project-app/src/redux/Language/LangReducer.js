import { LOCALES } from "../../i18nProvider/locale";
import { SET_LOCALES } from "./actionType";

export default function locale(state = { lang: LOCALES.ROMANIAN }, action) {
  switch (action.type) {
    case SET_LOCALES:
      return { lang: action.lang };

    default:
      return state;
  }
}
