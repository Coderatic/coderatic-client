<template>
	<q-table
		:title="props.title"
		class="max-h-[400px]"
		:rows="formattedTableData"
		:columns="(columns as any)"
		:loading="loading"
		separator="horizontal"
		row-key="name"
		v-model:pagination="pagination"
		flat
		bordered
		binary-state-sort
		virtual-scroll
		:table-header-class="
			'sticky top-0 z-10 ' + ($q.dark.isActive ? 'bg-dark' : 'bg-white')
		"
		no-data-label="You haven't made any submissions for this problem"
		@request="onRequest"
	>
		<template v-slot:top>
			<h4 class="q-table__title">
				{{ props.title }}
			</h4>
			<q-space />
			<q-btn
				color="primary"
				@click="
					onRequest({
						pagination,
					})
				"
				icon="mdi-sync"
				no-caps
				rounded
			/>
		</template>
		<template v-slot:loading>
			<q-inner-loading showing color="primary" />
		</template>
		<template v-slot:body-cell-verdict="props">
			<q-td :props="props">
				<q-chip
					:label="(props.value as string)"
					:color="props.value === 'AC' ? 'positive' : 'negative'"
					:icon="props.value === 'AC' ? 'mdi-check' : 'mdi-close'"
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
] as const;

// Computed State
const formattedTableData = computed(() => {
	return submissions.map((sub: Submission) => ({
		...sub,
		submission_id: truncateString(sub.submission_id as string, 10+3),
		cpu_time: `${sub.cpu_time} ms`,
		memory: `${sub.memory} KB`,
		submission_time: formatDate(
			sub.submission_time as string,
			"MMM DD, YYYY hh:mm:ss a"
		),
	}));
});

// Utils
const fetchSubmissions = async (
	startingRow: Number,
	fetchCount: Number,
	sortBy: String
) => {
	try {
		return await useAPIFetch("/api/submission/mine", {
			method: "GET",
			params: {
				problem_id: props.problem_id,
				startingRow: startingRow,
				count: fetchCount,
				sortBy: sortBy,
			},
			credentials: "include",
		});
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
	const res = await fetchSubmissions(startingRow, fetchCount, sortBy);

	// Remove previous
	submissions.splice(0, submissions.length, ...res.submissions);

	// Update reactive pagination state
	pagination.value.page = page;
	pagination.value.rowsPerPage = rowsPerPage;
	pagination.value.sortBy = sortBy;
	pagination.value.descending = descending;

	loading.value = false;
};

const insertNewSubmission = (submission: Submission) => {
	if(submissions.length === 0)
		return submissions.push(submission);
	if (submissions[0].submission_id.toString() === submission.submission_id)
		return;
	submissions.pop();
	submissions.unshift(submission);
};

defineExpose({
	insertNewSubmission,
});

const result = await fetchSubmissions(0, pagination.value.rowsPerPage, "desc");
submissions = result.submissions;
pagination.value.rowsNumber = result.totalSubmissions;
</script>
