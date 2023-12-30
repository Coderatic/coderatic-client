<template>
	<div class="flex justify-center items-center w-screen mt-10">
		<q-card class="flex flex-col gap-1 w-[30%]">
			<q-card-section class="flex flex-row items-end">
				<q-space />
			</q-card-section>
			<q-card-section>
				<ProblemCard
					v-for="problem in problems_list"
					:key="problem?.name"
					:problem="problem"
				>
					<template v-slot:header>
						<q-separator inset />
					</template>
				</ProblemCard>
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup lang="ts">
//Reactive State
const loading = ref(false);
const filter = reactive({
	difficulty: "Difficulty",
});
const toggle = ref(false);
let problems_list = reactive([]);

//Immutable State
const columns = [
	{
		name: "name",
		required: true,
		label: "Title",
		align: "left",
		field: "name",
	},
	{
		name: "difficulty",
		required: true,
		label: "Difficulty",
		align: "left",
		field: "difficulty",
	},
] as const;

//Computed State
const formattedTableData = computed(() => {
	return problems_list;
});

//Methods
const getProblems = async (
	startingRow: Number,
	fetchCount: Number,
	sortBy: "desc" | "asc"
) => {
	try {
		return useAPIFetch("/api/problems", {
			method: "GET",
			params: {
				startingRow: startingRow,
				count: fetchCount,
				sortBy: sortBy,
			},
			credentials: "omit",
		});
	} catch (error: any) {
		notifyUser({
			type: "negative",
			message: error.data.message || "Couldn't fetch the problem list.",
		});
	}
};

try {
	problems_list = (await getProblems(0, 10, "desc")).problems;
} catch (err) {
	console.log(err);
}
</script>

<style scoped></style>
