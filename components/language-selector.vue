<template>
	<q-btn-dropdown color="primary" :label="selected_lang" no-caps>
		<q-list class="p-3">
			<div class="grid grid-flow-col auto-cols-min grid-rows-5">
				<q-item
					clickable
					v-close-popup
					v-for="lang in languages"
					@click="changeLanguage(lang.name)"
				>
					<q-item-section>
						<q-avatar :class="lang.icon" size="2rem" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ lang.name }}</q-item-label>
						<q-item-label v-if="lang.version" :caption="true">{{
							lang.version
						}}</q-item-label>
					</q-item-section>
				</q-item>
			</div>
		</q-list>
	</q-btn-dropdown>
</template>

<script setup lang="ts">
const selected_lang = ref("C++");
const languages = ref([
	{ name: "C", icon: "devicon-c-plain colored" },
	{
		name: "C++",
		icon: "devicon-cplusplus-plain colored",
		version: "11",
	},
	{
		name: "C++",
		icon: "devicon-cplusplus-plain colored",
		version: "17",
	},
	{
		name: "C++",
		icon: "devicon-cplusplus-plain colored",
		version: "20",
	},
	{ name: "C#", icon: "devicon-csharp-plain colored" },
	{ name: "Dart", icon: "devicon-dart-plain colored" },
	{
		name: "Go",
		icon: "devicon-go-original-wordmark colored",
		version: "1.20.6",
	},
	{ name: "Haskell", icon: "devicon-haskell-plain colored" },
	{ name: "Java", icon: "devicon-java-plain colored", version: "JDK 11" },
	{
		name: "JavaScript",
		icon: "devicon-javascript-plain colored",
		version: "Node.js",
	},
	{ name: "Julia", icon: "devicon-julia-plain" },
	{ name: "Kotlin", icon: "devicon-kotlin-plain colored" },
	{ name: "Lua", icon: "devicon-lua-plain colored" },
	{ name: "Perl", icon: "devicon-perl-plain colored" },
	{ name: "PHP", icon: "devicon-php-plain colored" },
	{ name: "Python2", icon: "devicon-python-plain", version: "2.7.18" },
	{ name: "Python", icon: "devicon-python-plain colored", version: "3.11.3" },
	{ name: "R", icon: "devicon-r-original colored" },
	{ name: "Ruby", icon: "devicon-ruby-plain colored" },
	{ name: "Rust", icon: "devicon-rust-plain colored" },
	{ name: "Scala", icon: "devicon-scala-plain colored" },
	{
		name: "Typescript",
		icon: "devicon-typescript-plain colored",
		version: "Node.js",
	},
	{ name: "Zig", icon: "devicon-zig-plain colored" },
]);

defineEmits(["changeLanguage"]);

const changeLanguage = (newLang: string) => {
	selected_lang.value = newLang;
};
</script>

<style scoped></style>
