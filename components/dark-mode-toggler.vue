<template>
	<q-toggle
		v-model="theme"
		color="secondary"
		keep-color
		checked-icon="mdi-white-balance-sunny"
		unchecked-icon="mdi-moon-waning-crescent"
		:toggle-indeterminate="false"
		@click="changeMode"
	/>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const $q = useQuasar();

const theme = ref(!$q.dark.isActive);
colorMode.preference = $q.dark.isActive ? "dark" : "light";

const changeMode = () => {
	colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
	$q.dark.toggle();
};
</script>
