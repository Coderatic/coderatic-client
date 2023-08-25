<template>
	<q-table
		ref="tableRef"
		title="Current Submission"
		:rows="formattedTableData"
		:columns="(columns as any)"
		:loading="processing"
		separator="cell"
		row-key="submission_id"
		hide-bottom
		bordered
		flat
		no-data-label="Submission was unsuccessful"
	>
		<template v-slot:loading>
			<q-inner-loading showing color="primary" />
		</template>
		<template v-slot:body-cell-verdict>
			<q-td key="verdict">
				<q-chip
					:label="(props.submission?.verdict as string)"
					:color="
						props.submission?.verdict === 'AC'
							? 'positive'
							: 'negative'
					"
					:icon="
						props.submission?.verdict === 'AC'
							? 'mdi-check'
							: 'mdi-close'
					"
				/>
			</q-td>
		</template>
	</q-table>
</template>
<script setup lang="ts">
import { date } from "quasar";
const { formatDate } = date;

//Utils
const truncateString = (str: string, maxLength: number, ellipsis = "...") => {
	if (str.length <= maxLength) {
		return str;
	} else {
		return str.slice(0, maxLength - ellipsis.length) + ellipsis;
	}
};

//Reactive State

//Types
interface Submission {
	submission_id: String;
	submission_time: String;
	lang: String;
	verdict: String;
	cpu_time: String;
	memory: String;
	code_size: String;
}

const props = defineProps({
	submission: {
		type: Object as PropType<Submission | null>,
		required: false,
	},
	processing: {
		type: Boolean,
		required: false,
		default: false,
	},
});

//Immutable State
const columns = [
	{
		name: "submission_id",
		required: false,
		field: "submission_id",
		label: "Submission id",
		align: "left",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
	},
	{
		name: "submission_time",
		required: false,
		align: "left",
		field: "submission_time",
		label: "Submission time",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
		sortable: true,
	},
	{
		name: "language",
		label: "Language",
		field: "lang",
		align: "left",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
	},
	{
		name: "verdict",
		label: "Verdict",
		field: "verdict",
		align: "left",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
	},
	{
		name: "cpu",
		label: "CPU",
		field: "cpu_time",
		align: "left",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
	},
	{
		name: "memory",
		label: "Memory",
		field: "memory",
		align: "left",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
	},
	{
		name: "code_size",
		label: "Code size",
		field: "code_size",
		align: "left",
		headerStyle: "font-weight: bold; font-size: 1.2em;",
	},
] as const;

const formattedTableData = computed(() => {
	return props.submission
		? [
				{
					...props.submission,
					submission_time: formatDate(
						props.submission?.submission_time as string,
						"MMM DD, YYYY hh:mm:ss a"
					),
					submission_id: truncateString(
						props.submission?.submission_id as string,
						10 + 3
					),
					cpu_time: `${props.submission?.cpu_time} ms`,
					memory: `${props.submission?.memory} KB`,
					code_size: `${props.submission?.code_size} B`,
				},
		  ]
		: [];
});
defineExpose({ props });
</script>
