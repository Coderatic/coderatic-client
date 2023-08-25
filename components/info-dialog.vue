<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="q-dialog-plugin" flat>
			<q-card-section class="flex flex-row mt-3">
				<q-avatar
					v-if="!props.plain"
					:icon="icon"
					:text-color="iconColor"
					:color="iconBg"
					class="justify-self-center self-center"
				/>
				<div class="flex flex-col ml-5 mr-5">
					<q-card-section v-if="props.title" class="p-0">
						<div class="text-h6 font-bold">{{ props.title }}</div>
					</q-card-section>
					<span class="mt-2 font-light text-gray-500">
						{{ props.message }}
					</span>
				</div>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					flat
					:label="props.cancelText"
					color="primary"
					v-close-popup
					@click="onDialogCancel"
				/>
				<q-btn
					flat
					:label="props.confirmText"
					color="primary"
					v-close-popup
					@click="onDialogOK"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
	plain: Boolean,
	title: String,
	message: String,
	confirmText: {
		type: String,
		default: "OK",
	},
	cancelText: {
		type: String,
		default: "Cancel",
	},
	type: "success" | "warning" | "error" | "info",
	...useDialogPluginComponent.props,
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
	useDialogPluginComponent();

const iconMap = {
	success: "mdi-check-circle-outline",
	warning: "mdi-alert-outline",
	error: "mdi-alert-circle-outline",
	info: "mdi-information-outline",
};

const iconColorMap = {
	success: "green-5",
	warning: "orange-5",
	error: "red-5",
	info: "blue-5",
};

const iconBgMap = {
	success: "green-1",
	warning: "orange-1",
	error: "red-1",
	info: "blue-1",
};

const icon = computed(() => iconMap[props.type] || "mdi-help-box-outline");
const iconColor = computed(() => iconColorMap[props.type] || "grey-5");
const iconBg = computed(() => iconBgMap[props.type]);
</script>
