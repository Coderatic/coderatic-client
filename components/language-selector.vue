<template>
	<q-btn-dropdown color="primary" :label="selected_lang" no-caps>
		<q-list class="p-3">
			<div class="grid grid-flow-col auto-cols-min grid-rows-5">
				<q-item
					clickable
					v-close-popup
					v-for="lang in languages"
					@click="
						$emit('update:modelValue', lang.name);
						changeLanguage(lang.name);
					"
				>
					<q-item-section>
						<q-avatar :class="lang.icon" size="2rem" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ lang.name }}</q-item-label>
					</q-item-section>
				</q-item>
			</div>
		</q-list>
	</q-btn-dropdown>
</template>

<script setup lang="ts">
const selected_lang = ref("C++ 17");
const languages = ref([
	{ name: "C", icon: "devicon-c-plain colored" },
	{
		name: "C++ 11",
		icon: "devicon-cplusplus-plain colored",
	},
	{
		name: "C++ 17",
		icon: "devicon-cplusplus-plain colored",
	},
	{
		name: "C++ 20",
		icon: "devicon-cplusplus-plain colored",
	},
	{ name: "C#", icon: "devicon-csharp-plain colored" },
	{ name: "Dart", icon: "devicon-dart-plain colored" },
	{
		name: "Golang",
		icon: "devicon-go-original-wordmark colored",
	},
	{ name: "Haskell", icon: "devicon-haskell-plain colored" },
	{ name: "Java", icon: "devicon-java-plain colored" },
	{
		name: "JavaScript",
		icon: "devicon-javascript-plain colored",
	},
	{ name: "Julia", icon: "devicon-julia-plain" },
	{ name: "Kotlin", icon: "devicon-kotlin-plain colored" },
	{ name: "Lua", icon: "devicon-lua-plain colored" },
	{ name: "Perl", icon: "devicon-perl-plain colored" },
	{ name: "PHP", icon: "devicon-php-plain colored" },
	{ name: "Python2", icon: "devicon-python-plain" },
	{ name: "Python", icon: "devicon-python-plain colored" },
	{ name: "R", icon: "devicon-r-original colored" },
	{ name: "Ruby", icon: "devicon-ruby-plain colored" },
	{ name: "Rust", icon: "devicon-rust-plain colored" },
	{ name: "Scala", icon: "devicon-scala-plain colored" },
	{
		name: "Typescript",
		icon: "devicon-typescript-plain colored",
	},
	{ name: "Zig", icon: "devicon-zig-plain colored" },
]);

defineEmits(["update:modelValue"]);
defineProps(["modelValue"]);

const changeLanguage = (newLang: string) => {
	selected_lang.value = newLang;
};
</script>

<style scoped></style>
