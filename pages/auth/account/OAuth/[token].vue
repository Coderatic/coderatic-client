<template>
  <div>
    <h1>Activate Account</h1>
    <!-- TODO: Redesign -->
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/auth";
import { onMounted } from "vue";

onMounted(async () => {
  const { token } = useRoute().params;

  if (!token) {
    navigateTo("/");
    return;
  }
  try {
    const res = await useNitroFetch("/api/OAuth/", {
      method: "POST",
      body: {
        token: token,
      },
    });
    const userStore = useUserStore();
    //@ts-ignore
    userStore.setUser(res.data._rawValue.user);
    //@ts-ignore
    userStore.setToken(res.data._rawValue.token);
  } catch (error) {
    // TODO: Use custom component
    alert(error);
  } finally {
    navigateTo("/");
  }
});

definePageMeta({
  title: "Activate Account",
  description: "Activate your account",
  layout: "empty",
});
</script>
