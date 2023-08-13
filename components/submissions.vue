<template>
	<q-table
		ref="tableRef"
		:title="props.title"
		:rows="formattedTableData"
		:columns="(columns as any)"
		:loading="loading"
		separator="cell"
		row-key="name"
		@loaded="loading"
		v-model:pagination="pagination"
		binary-state-sort
		@request="onRequest"
	/>
</template>

<script setup lang="ts">
import { date } from "quasar";
const { formatDate } = date;

const props = defineProps({
	title: {
		type: String,
		default: "Submissions",
	},
	problem_id: {
		type: String,
		required: true,
	},
});

//Interfaces
interface Submission {
	submission_id: String;
	submission_time: String;
	lang: String;
	verdict: String;
	cpu_time: String;
	memory: String;
	code_size: String;
}

//Reactive State
const loading = ref(false);
let submissions = reactive<Submission[]>([]);
const pagination = ref({
	sortBy: "desc",
	descending: false,
	page: 1,
	rowsPerPage: 4,
	rowsNumber: 0,
});

//Non-reactive State
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
];

// Computed State
const formattedTableData = computed(() => {
	console.log("computed");
	return submissions
		.map((sub: Submission) => ({
			...sub,
			cpu_time: `${sub.cpu_time} ms`,
			memory: `${sub.memory} KB`,
			code_size: `${sub.code_size} B`,
			submission_time: formatDate(
				sub.submission_time as string,
				"MMM DD, YYYY hh:mm:ss a"
			),
		}))
		.sort((a, b) => {
			return (
				new Date(b.submission_time as string).getTime() -
				new Date(a.submission_time as string).getTime()
			);
		});
});

// Utils
const fetchSubmissions = async (
	startingRow: Number,
	fetchCount: Number,
	sortBy: String
) => {
	try {
		const result = await useAPIFetch("/api/submission/mine", {
			method: "GET",
			params: {
				problem_id: props.problem_id,
				startingRow: startingRow,
				count: fetchCount,
				sortBy: sortBy,
			},
			credentials: "include",
		});
		return result;
	} catch (error: any) {
		if (error.data === "Unauthorized") {
			notifyUser({
				type: "negative",
				message: "You must be logged in to view your submissions.",
			});
		} else {
			notifyUser({
				type: "negative",
				message: error.data,
				closeBtn: true,
			});
		}
	}
};
const onRequest = async (props: any) => {
	const { page, rowsPerPage, sortBy, descending } = props.pagination;

	// get all rows if "All" (0) is selected
	const fetchCount =
		rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

	// calculate starting row of data
	const startingRow = (page - 1) * rowsPerPage;

	loading.value = true;
	const result = await fetchSubmissions(startingRow, fetchCount, sortBy);

	// Remove previous
	submissions.splice(0, submissions.length, ...result.submissions);

	// Update reactive pagination state
	pagination.value.page = page;
	pagination.value.rowsPerPage = rowsPerPage;
	pagination.value.sortBy = sortBy;
	pagination.value.descending = descending;

	loading.value = false;
};

const result = await fetchSubmissions(0, pagination.value.rowsPerPage, "desc");
submissions = result.submissions;
pagination.value.rowsNumber = result.totalSubmissions;
</script>
