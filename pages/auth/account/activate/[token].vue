<template>
  <div>
    <h1>Activate Account</h1>
    <!-- Add your activation logic here -->
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/auth";
import { onMounted } from "vue";

onMounted(async () => {
  const { token } = useRoute().params;

  if (token) {
    const userStore = useUserStore();
    userStore.setToken(token as string);
    userStore.activateAccount();
    alert("Account activated");
    navigateTo("/");
  }
});

definePageMeta({
  title: "Activate Account",
  description: "Activate your account",
  layout: "empty",
});
</script>
