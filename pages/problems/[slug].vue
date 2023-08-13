<template>
	<div class="flex md:flex-row sm:flex-col h-full gap-1 flex-nowrap py-5">
		<div class="md:basis-1/2 sm:w-full max-h-full">
			<q-card>
				<q-card-section class="p-3">
					<q-skeleton
						v-if="!problem_data"
						type="text"
						height="60px"
						width="50%"
					/>
					<h1
						v-else
						class="mb-3 md:text-4xl sm:text-3xl font-semibold"
					>
						{{ problem_data.name }}
					</h1>
					<div class="m-0 p-0 flex flex-row">
						<q-skeleton
							v-if="!problem_data"
							v-for="i in 3"
							type="QChip"
							class="mr-3 mt-2"
						/>
						<q-chip
							v-else
							v-for="chip in chips"
							:color="chip.color"
							class="mr-3 pt-2"
						>
							<q-avatar v-if="chip.icon" :icon="chip.icon" />
							<span>{{ chip.label }}</span>
						</q-chip>
					</div>
				</q-card-section>
			</q-card>
			<q-card
				class="mt-3 md:basis-1/2 sm:w-full max-h-[87.5%] min-h-[87.5%] pb-5 overflow-y-auto"
			>
				<q-tabs
					v-model="active_tab"
					dense
					class="text-grey"
					active-color="primary"
					indicator-color="accent"
					inline-label
					align="justify"
					narrow-indicator
				>
					<q-tab
						v-for="tab in tabs"
						:name="tab.name"
						:label="tab.label"
						:icon="tab.icon"
						no-caps
					/>
				</q-tabs>
				<q-tab-panels v-model="active_tab" animated>
					<q-tab-panel name="statement">
						<q-card-section>
							<q-skeleton
								v-if="!problem_data"
								v-for="i in getRandomNumberInRange(10, 20)"
								type="text"
								:height="
									getRandomNumberInRange(20, 30).toString() +
									'px'
								"
								:width="
									getRandomNumberInRange(50, 90).toString() +
									'%'
								"
							/>
							<template v-else>
								<h3 class="text-2xl mb-3 font-semibold">
									Statement
								</h3>
								<markdown-component
									:content="problem_data.statement as any"
								/>
							</template>
						</q-card-section>
						<q-card-section>
							<q-skeleton
								v-if="!problem_data"
								type="text"
								height="50px"
								width="20%"
							/>
							<q-skeleton
								v-if="!problem_data"
								v-for="i in 2"
								type="text"
								:height="
									getRandomNumberInRange(20, 30).toString() +
									'px'
								"
								:width="
									getRandomNumberInRange(50, 90).toString() +
									'%'
								"
							/>
							<template v-else>
								<h3 class="text-2xl mb-3 font-semibold">
									Input Format
								</h3>
								<markdown-component
									:content="problem_data?.input_format as any"
								/>
							</template>
						</q-card-section>
						<q-card-section>
							<q-skeleton
								v-if="!problem_data"
								type="text"
								height="50px"
								width="20%"
							/>
							<q-skeleton
								v-if="!problem_data"
								v-for="i in 2"
								type="text"
								:height="
									getRandomNumberInRange(20, 30).toString() +
									'px'
								"
								:width="
									getRandomNumberInRange(50, 90).toString() +
									'%'
								"
							/>
							<template v-else>
								<h3 class="text-2xl mb-3 font-semibold">
									Output Format
								</h3>
								<markdown-component
									:content="problem_data?.output_format as any"
								/>
							</template>
						</q-card-section>
						<q-card-section
							v-for="(
								sample, index
							) in problem_data?.sample_tests"
						>
							<q-skeleton
								v-if="!problem_data"
								type="text"
								height="50px"
								width="20%"
							/>
							<h5 v-else class="text-2xl mb-5 font-semibold">
								{{ `Sample ${index + 1}: ` }}
							</h5>
							<div class="flex flex-row justify-center">
								<q-skeleton
									v-if="!problem_data"
									type="rect"
									height="200px"
									width="100%"
								/>
								<sample-box
									v-else
									class="min-w-full"
									:input="sample.test_input.toString()"
									:output="sample.test_output.toString()"
								/>
							</div>
							<template v-if="sample?.explanation">
								<h3 class="text-xl mb-3 mt-5 font-semibold">
									Explanation for Sample {{ index + 1 }}:
								</h3>
								<markdown-component
									:content="sample?.explanation as any"
								/>
							</template>
						</q-card-section>
					</q-tab-panel>
					<q-tab-panel name="submissions">
						<submissions
							:problem_id="(problem_data?.problem_id as string)"
						/>
					</q-tab-panel>
				</q-tab-panels>
			</q-card>
		</div>

		<!-- ! Code editor section from here on -->

		<q-card
			class="flex flex-col flex-grow max-h-full md:ml-3 md:mt-0 sm:mt-5 md:pr-[1px] sm:pr-3"
		>
			<div class="flex flex-row items-center justify-between w-full p-3">
				<language-selector />
				<q-btn
					color="primary"
					label="Upload"
					no-caps
					icon="mdi-upload"
					@click="showUploader"
				/>
			</div>
			<div
				class="w-full flex-grow md:max-h-[75.32vh] md:min-h-[75.32vh] sm:min-h-[65vh] sm:max-h-[65vh]"
			>
				<client-only>
					<codemirror
						v-model="code"
						placeholder="Write your code here"
						:style="{
							height: '100%',
							width: '100%',
						}"
						autofocus
						auto-destroy
						indent-with-tab
						:tab-size="2"
						:extensions="extensions"
					/>
				</client-only>
			</div>
			<q-card-section class="max-h-full">
				<div class="flex flex-row-reverse w-full gap-5">
					<q-btn
						color="secondary"
						label="Submit"
						no-caps
						@click="Submit"
					/>
					<q-btn
						icon="mdi-play"
						color="primary"
						label="Run on samples"
						no-caps
					/>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { Dialog } from "quasar";
import { useUserStore } from "../../store/auth.js";
import uploadDialog from "../../components/upload-dialog.vue";
const config = useRuntimeConfig();
const route = useRoute();
const userStore = useUserStore();

//Interfaces
interface SampleTests {
	test_input: String;
	test_output: String;
	explanation?: String;
}

interface Problem {
	name: String | null;
	problem_id: String | null;
	time_lim: Number | null;
	mem_lim: Number | null;
	statement: String | null;
	input_format: String | null;
	output_format: String | null;
	difficulty: "Easy" | "Medium" | "Hard" | null | undefined;
	sample_tests: SampleTests[] | null;
}

//Utils
const difficultyColor = (
	difficulty: "Easy" | "Medium" | "Hard" | null | undefined
): string => {
	switch (difficulty) {
		case "Easy":
			return "blue-3";
		case "Medium":
			return "orange-3";
		case "Hard":
			return "red-3";
		default:
			return "grey-4";
	}
};

const getRandomNumberInRange = (a: number, b: number): number => {
	if (a >= b) {
		throw new Error(
			"Invalid range. The start value must be less than the end value."
		);
	}

	const range = b - a;
	const random = Math.random() * range;

	return Math.floor(a + random);
};

//Reactive
const code = ref("");
const extensions = [cpp(), oneDark];
const problem_data = ref<Problem>();
const chips = reactive({
	difficulty: {
		label: "",
		icon: "mdi-star-outline",
		color: "",
	},
	time: {
		label: "",
		icon: "mdi-timer-outline",
		color: "orange-2",
	},
	memory: {
		label: "",
		icon: "mdi-memory",
		color: "red-2",
	},
});
const active_tab = ref("statement");

// Non-reactive state
const tabs = [
	{
		label: "Statement",
		name: "statement",
		icon: "mdi-file-document-outline",
	},
	{
		label: "My Submissions",
		name: "submissions",
		icon: "mdi-file-send-outline",
	},
];

const Submit = async () => {
	try {
		const result = await useAPIFetch("/api/submission/code", {
			method: "POST",
			body: {
				problem_id: problem_data.value?.problem_id,
				user_id: userStore.user?.id,
				lang: {
					name: "cpp",
					extension: "cpp",
					is_compiled: true,
				},
				source_code: code.value,
			},
			credentials: "include",
		});
		console.log(result);
	} catch (error) {
		console.log(error);
	}
};

const fetchProblem = async () => {
	try {
		const result = await useAPIFetch(`/api/problems/get-problem`, {
			params: {
				slug: route.params.slug,
			},
		});
		problem_data.value = result.problem_data;
	} catch (error: any) {
		throw createError({
			statusCode: error.statusCode,
			statusMessage: error.data.message,
			fatal: true,
		});
	}
};

const showUploader = () => {
	Dialog.create({
		component: uploadDialog,
		componentProps: {
			title: "Upload your code",
		},
	});
};

try {
	await fetchProblem();

	const difficulty = problem_data.value?.difficulty;
	chips["difficulty"] = {
		...chips["difficulty"],
		label: difficulty ? String(difficulty) : "",
		color: difficultyColor(difficulty),
	};
	chips["time"].label = problem_data.value?.time_lim + " s";
	chips["memory"].label = problem_data.value?.mem_lim + " MB";
} catch (error: any) {
	console.log(error);
}

definePageMeta({
	title: "Problems",
	description: "Problems",
	layout: "default",
});
</script>

<style scoped></style>
