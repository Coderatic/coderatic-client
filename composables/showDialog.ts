import { Dialog } from "quasar";
import infoDialog from "../components/info-dialog.vue";

export default function showDialogue(opts: any) {
	Dialog.create({
		component: infoDialog,
		componentProps: {
			...opts,
		},
	})
		.onOk(() => {
			opts.onOk?.();
		})
		.onCancel(() => {
			opts.onCancel?.();
		})
		.onDismiss(() => {
			opts.onDismiss?.();
		});
}
