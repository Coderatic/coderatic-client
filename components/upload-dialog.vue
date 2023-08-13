<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="q-dialog-plugin">
			<q-card-section>
				<h5 class="text-h5">{{ props.title }}</h5>
				<hr class="mt-5 mb-5" />
				<div class="flex items-center justify-center">
					<q-uploader color="secondary" :url="props.url" />
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
	title: String,
	url: String,
	...useDialogPluginComponent.props,
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
	useDialogPluginComponent();
</script>
