<template>
  <div class="flex justify-center items-center h-screen">
    <div class="max-w-md w-full p-10 shadow-xl bg-dialog">
      <h1 class="text-3xl text-center mb-10 text-primary">Sign up</h1>
      <q-form class="q-gutter-md">
        <q-input
          v-model="username"
          filled
          unmasked-value
          label="Username *"
          hint="This should be unique"
          lazy-rules
          :rules="[validation.empty, validation.username as any]"
        />
        <q-input
          v-model="email"
          filled
          label="Email *"
          type="email"
          hint="It should previously have not been registered with"
          lazy-rules
          :rules="[
          validation.empty,
          validation.email as any
        ]"
        />
        <q-input
          v-model="pass"
          filled
          label="Password *"
          type="password"
          hint="A password of length above 8 is recommended"
          lazy-rules
          :rules="[validation.empty]"
        />
        <q-input
          v-model="conf_pass"
          filled
          label="Confirm Password *"
          type="password"
          hint="It should match with the password above"
          :rules="[validation.empty, validation.match_pass]"
          :reactive-rules="true"
        />
        <q-toggle
          v-model="accept"
          label="I accept the license and terms"
          color="secondary"
        />
        <div class="flex justify-center items-center">
          <q-btn
            label="Submit"
            type="submit"
            color="secondary"
            @click="signUp"
          />
          <q-btn
            label="Reset"
            type="reset"
            flat
            color="secondary"
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref("");
const email = ref("");
const pass = ref("");
const conf_pass = ref("");
const accept = ref(false);

const validation = {
  empty: (val: string) =>
    (val && val.length > 0) || "This field can't be left empty",

  username: (val: string) =>
    val.match(/^[a-zA-Z0-9_]{3,16}$/) ||
    "Must be 3-16 characters. Alphanumeric and underscores only.",

  email: (val: string): any =>
    val.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ||
    "Not a valid email address",

  match_pass: (val: string): any =>
    val === pass.value || "The passwords do not match",
};

const signUp = () => {
  submitToServer()
    .then((res) => {
      console.log(res.data);
      alert("Sent");
      alert(res.data.value);
    })
    .catch((err) => {
      alert(err);
    });
};

const submitToServer = async () => {
  return await useAPIFetch("/api/auth/pre-signup", {
    method: "POST",
    body: {
      username: username.value,
      email: email.value,
      password: pass.value,
    },
  });
};

definePageMeta({
  layout: "empty",
});
</script>

<style scoped></style>
