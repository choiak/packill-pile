<template>
  <div class="flex h-full w-full items-center bg-stone-50 shadow">
    <div
      class="w-full space-y-10 px-6 text-center sm:w-7/12 lg:w-5/12 lg:px-12 xl:px-32"
    >
      <h6 class="font-semibold">Sign in</h6>
      <form class="mt-6 space-y-6">
        <Textbox
          placeholder="Email"
          default-type="email"
          autocomplete="email"
          input-class="rounded-lg"
          @model="getEmail"
        />
        <Textbox
          placeholder="Password"
          default-type="password"
          toggled-type="text"
          autocomplete="current-password"
          input-class="rounded-l-lg"
          button-class="rounded-r-lg border-l-0"
          has-icon
          toggleable
          @model="getPassword"
        />
        <div class="space-y-2">
          <button
            type="submit"
            class="btn-accent"
            @click.prevent="loginHandler"
          >
            Sign in
          </button>
          <p
            @click.prevent="router.push('/pile/forget-password')"
            class="text-xs font-medium text-neutral-500 hover:text-blue-700 active:text-blue-900"
          >
            Forgot your password?
          </p>
        </div>
      </form>
      <div class="space-y-2">
        <p class="text-sm font-medium text-neutral-700">
          Don't have a Packill account?
        </p>
        <div>
          <button
            type="button"
            @click.prevent="router.push('/pile/register')"
            class="btn-light"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
    <div
      class="relative hidden overflow-hidden sm:block sm:h-full sm:w-5/12 lg:w-7/12"
    >
      <img
        src="@/assets/img/login.jpg"
        class="h-full w-full bg-center object-cover"
        alt="Sign in to Packill"
      />
      <div class="absolute bottom-8 left-8 space-y-4 text-white">
        <h1 class="font-semibold drop-shadow-xl">Welcome back,</h1>
        <p class="leading-5 drop-shadow-xl">
          Continue your journey at Packill.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Textbox from "@/components/venust/input/venustInput.vue";
import { ref } from "vue";
import { login } from "@/api/user.js";
import router from "@/router/index.js";
import UserImg from "@/components/userimg/userImg.vue";

let email = ref("");
let password = ref("");

function getEmail(value) {
  email = value;
}

function getPassword(value) {
  password = value;
}

async function loginHandler() {
  await login(email, password);
}
</script>
