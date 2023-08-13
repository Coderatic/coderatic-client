<template>
	<q-markup-table separator="vertical" square dense>
		<colgroup>
			<col class="w-1/2" />
			<col class="w-1/2" />
		</colgroup>
		<thead>
			<tr>
				<th>
					<h4 class="text-left text-lg font-bold">Input</h4>
				</th>
				<th>
					<h4 class="text-left text-lg font-bold">Output</h4>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="align-top">
					<div class="float-right">
						<q-btn
							v-if="props.copyButton"
							@click="copyToClipboard(props.input)"
							icon="mdi-content-copy"
							square
							size="sm"
							flat
							dense
							class="float-right"
						>
							<q-tooltip class="bg-secondary">
								Copy to clipboard
							</q-tooltip>
						</q-btn>
					</div>
					<pre class="whitespace-pre-line font-mono">
						{{ props.input }}
					</pre
					>
				</td>
				<td class="align-top">
					<div class="float-right">
						<q-btn
							v-if="props.copyButton"
							@click="copyToClipboard(props.output)"
							icon="mdi-content-copy"
							square
							size="sm"
							flat
							dense
							class="float-right"
						>
							<q-tooltip class="bg-secondary">
								Copy to clipboard
							</q-tooltip>
						</q-btn>
					</div>
					<pre class="whitespace-pre-line font-mono">
						{{ props.output }}
					</pre
					>
				</td>
			</tr>
		</tbody>
	</q-markup-table>
</template>

<script setup>
import { copyToClipboard } from "quasar";
const props = defineProps({
	input: String,
	output: String,
	copyButton: {
		type: Boolean,
		default: true,
	},
});
</script>
