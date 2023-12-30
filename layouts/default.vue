<template>
	<div class="overflow-x-clip">
		<q-layout>
			<q-header class="bg-primary-btn" elevated>
				<q-toolbar>
					<q-btn
						flat
						no-caps
						label="Coderatic"
						class="text-xl"
						:to="`/`"
					></q-btn>
					<q-space />
					<template v-if="!sm">
						<q-btn-toggle
							v-model="button"
							flat
							stretch
							no-caps
							toggle-text-color="yellow"
							:options="options"
						/>
						<template v-if="userStore.isLoggedIn">
							<profile-menu />
						</template>
						<template v-else>
							<q-btn
								no-caps
								label="Login"
								color="accent"
								:to="`/auth/login?redirect=${$route.fullPath}`"
							/>
							<span class="mx-2">or</span>
							<q-btn
								no-caps
								label="Signup"
								color="secondary"
								:to="`/auth/signup?redirect=${$route.fullPath}`"
							/>
						</template>
					</template>
					<q-btn
						v-else
						flat
						no-caps
						icon="mdi-menu"
						@click="drawer = !drawer"
					/>
					<q-drawer
						v-model="drawer"
						show-if-above
						:mini="miniState"
						@mouseover="miniState = false"
						@mouseout="miniState = true"
						bordered
						:class="'text-primary'"
					>
						<q-list>
							<q-item>
								<q-item-section>
									<q-item-label class="text-xl"
										>Coderatic</q-item-label
									>
									<hr />
								</q-item-section>
							</q-item>
							<q-item
								clickable
								v-ripple
								v-for="item in options"
								:key="item.label"
								:to="item.to"
							>
								<q-item-section>
									<q-btn
										flat
										no-caps
										:icon="item.icon_sm"
										:label="item.label"
									/>
								</q-item-section>
							</q-item>
							<template v-if="!userStore.isLoggedIn">
								<q-item>
									<q-btn
										no-caps
										flat
										icon="mdi-login"
										label="Login"
										color="accent"
										:to="`/auth/login?redirect=${$route.fullPath}`"
									/>
								</q-item>
								<q-item>
									<q-btn
										no-caps
										flat
										icon="mdi-account-plus-outline"
										label="Signup"
										color="secondary"
										:to="`/auth/signup?redirect=${$route.fullPath}`"
									/>
								</q-item>
							</template>
						</q-list>
					</q-drawer>
				</q-toolbar>
			</q-header>
			<q-page-container style="padding-left: 10px">
				<div class="h-[calc(100vh-52px)]">
					<slot />
				</div>
			</q-page-container>
		</q-layout>
	</div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { useUserStore } from "../store/auth.js";
const $q = useQuasar();

const drawer = ref(false);
const button = ref(false);
const miniState = ref(true);
const sm = ref($q.screen.width < 768);
const userStore = useUserStore();

watch(
	() => $q.screen.width,
	(width) => {
		sm.value = width < 768;
	}
);

let options = [
	{
		icon_sm: "mdi-trophy-variant-outline",
		label: "Contests",
		value: "Contests",
		to: "/contests",
	},
	{
		icon_sm: "mdi-clipboard-account-outline",
		label: "Problems",
		value: "Problems",
		to: "/problems",
	},
	{
		icon_sm: "mdi-information-outline",
		label: "About",
		value: "About",
		to: "/about",
	},
];
</script>
