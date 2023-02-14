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
          input-class="mt-1 rounded-lg"
          @model="getEmail"
        />
        <Textbox
          placeholder="Password"
          default-type="password"
          toggled-type="text"
          autocomplete="password"
          input-class="mt-1 rounded-l-lg"
          has-icon
        />
        <button
          type="submit"
          class="btn bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 active:shadow-blue-900"
        >
          Sign in
        </button>
      </form>
      <a href="/pile/password-reset" class="text-xs font-medium text-neutral-500"
        >Forgot your password?</a
      >
      <div class="space-y-2">
        <p class="text-sm font-medium text-neutral-700">
          Don't have a Packill account?
        </p>
        <div>
          <a href="/pile/register">
            <button
              class="btn bg-white text-sm font-medium text-neutral-700 hover:bg-slate-400/20 active:shadow-slate-300"
            >
              Create new account
            </button>
          </a>
        </div>
      </div>
    </div>
    <div class="relative hidden overflow-hidden sm:block sm:h-full sm:w-5/12 lg:w-7/12">
      <img
        src="@/assets/img/login.jpg"
        class="h-full w-full bg-center object-cover"
        alt="Sign in to Packill"
      />
      <div class="absolute bottom-8 left-8 space-y-4 text-white">
        <h1 class="font-semibold drop-shadow-xl">Welcome back,</h1>
        <p class="leading-5 drop-shadow-xl">Continue your journey at Packill.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Textbox from "@/components/textbox/textbox.vue";
import { ref } from "vue";

let email = ref("");

function getEmail(value) {
  email = value;
  console.log(email);
}
</script>
