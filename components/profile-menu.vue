<template>
	<q-btn-dropdown flat dense :ripple="false" unelevated rounded>
		<template v-slot:label>
			<q-avatar>
				<img :src="profilePicture" />
			</q-avatar>
		</template>
		<DarkModeToggler></DarkModeToggler>
		<q-list v-for="item in menu_items" :key="item.label" unelevated flat>
			<q-item :to="item.to">
				<q-avatar :icon="item.icon_sm" />
				<q-item-section>{{ item.label }} </q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/auth";
const userStore = useUserStore();

const profilePicture = ref(userStore.profilePicture);

const menu_items = [
	{
		label: "Dashboard",
		icon: "mdi-view-dashboard",
		icon_sm: "mdi-view-dashboard-outline",
		to: "/dashboard",
	},
	{
		label: "Profile",
		icon: "mdi-account",
		icon_sm: "mdi-account-outline",
		to: "/profile",
	},
	{
		label: "Settings",
		icon: "mdi-cog",
		icon_sm: "mdi-cog-outline",
		to: "/settings",
	},
	{
		label: "Logout",
		icon: "mdi-logout",
		icon_sm: "mdi-logout-variant",
		to: "/auth/logout",
	},
];
</script>
