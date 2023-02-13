<template>
  <div class="flex h-full w-full items-center bg-stone-50 shadow">
    <div
      class="w-full space-y-10 px-6 text-center sm:w-7/12 lg:w-5/12 lg:px-12 xl:px-32"
    >
      <h6 class="font-semibold">Create an account</h6>
      <form class="mt-6 space-y-6">
        <div class="flex w-full">
          <div class="w-1/2">
            <Textbox
              placeholder="First name"
              default-type="text"
              input-class="mt-1 rounded-l-lg"
            />
          </div>
          <div class="w-1/2">
            <Textbox
              placeholder="Last name"
              default-type="text"
              input-class="mt-1 rounded-r-lg"
            />
          </div>
        </div>
        <Textbox
          placeholder="Email"
          default-type="email"
          autocomplete="email"
          input-class="mt-1 rounded-lg"
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
          class="btn-white bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 active:shadow-blue-900"
        >
          Create account
        </button>
      </form>
      <div class="space-y-2">
        <p class="text-sm font-medium text-neutral-700">
          Already have a Packill account?
        </p>
        <div>
          <a href="/pile/login">
            <button
              class="btn-white bg-white text-sm font-medium text-neutral-700 hover:bg-slate-400/20 active:shadow-slate-300"
            >
              Sign in
            </button>
          </a>
        </div>
      </div>
    </div>
    <div
      class="relative hidden overflow-hidden sm:block sm:h-full sm:w-5/12 lg:w-7/12"
    >
      <img
        src="@/assets/img/login.jpg"
        class="h-full w-full bg-center object-cover"
        alt="Create a new account at Packill"
      />
      <div class="absolute bottom-8 left-8 space-y-4 text-white">
        <h1 class="font-semibold drop-shadow-xl">Packill,</h1>
        <p class="leading-5 drop-shadow-xl" >Packed with in-depth<br />but straightforward content.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Textbox from "@/components/textbox/textbox.vue";
</script>
