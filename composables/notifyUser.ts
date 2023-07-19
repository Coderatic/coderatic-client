import { Notify, QNotifyCreateOptions } from "quasar";

Notify.registerType("success", {
  icon: "check_circle",
  color: "positive",
  classes: "rounded-xl",
});

Notify.registerType("error", {
  icon: "error",
  color: "negative",
  classes: "rounded-xl text-md",
});

export default function notifyUser(opts: QNotifyCreateOptions) {
  Notify.create(opts);
}
