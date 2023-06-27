<template>
  <div>
    <h1>Activate Account</h1>
    <!-- Add your activation logic here -->
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/auth";
import { onMounted } from "vue";

onMounted(() => {
  const { token } = useRoute().params;

  if (token) {
    const userStore = useUserStore();
    userStore.setToken(token);
    userStore.activateAccount();
    // Redirect the user to home page
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
