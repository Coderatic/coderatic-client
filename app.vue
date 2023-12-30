<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
#app {
	font-family: "Lato", sans-serif;
}

dark-mode {
	@apply text-white bg-dark;
}
body.body--dark {
	@apply text-white bg-dark;
}
body.body--light {
	@apply text-black bg-white;
}
</style>
