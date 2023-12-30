<template>
	<slot name="header" />
	<div
		class="flex flex-row min-h-[60px] min-w-full items-center justify-between p-4"
		flat
	>
		<span class="text-lg font-medium">{{ props?.problem?.name }}</span>
		<router-link :to="`/problems/${problem.slug}`">
			<q-btn label="Solve" color="accent" class="q-px-xl" />
		</router-link>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	problem: {},
});
</script>
