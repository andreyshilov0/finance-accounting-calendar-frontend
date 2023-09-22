import Charts from "@components/Charts";
import Incomes from "@components/Incomes";
import Payments from "@components/Payments";
import Settings from "@components/Settings";

export const TAB_SCREENS = [
  { label: "Payments", component: Payments },
  { label: "Income", component: Incomes },
  { label: "Charts", component: Charts },
  { label: "Settings", component: Settings },

];

export const LIST_LANGUAGES = ["en", "ru"];