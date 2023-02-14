<template>
  <div class="flex h-full w-full items-center bg-stone-50 shadow">
    <div
      class="w-full space-y-10 px-6 text-center sm:w-7/12 lg:w-5/12 lg:px-12 xl:px-32"
    >
      <div class="space-y-4">
        <h6 class="font-semibold">Reset password</h6>
        <p class="text-left text-sm">
          For security reasons, we do <strong>NOT</strong> store your password.
          So we will never ask for, or send your password via email
        </p>
      </div>
      <form class="mt-6 space-y-6">
        <Textbox
          placeholder="Email"
          default-type="email"
          autocomplete="email"
          input-class="mt-1 rounded-lg"
        />
        <button
          type="submit"
          class="btn bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 active:shadow-blue-900"
        >
          Send reset instructions
        </button>
      </form>
      <div class="space-y-2">
        <p class="text-sm font-medium text-neutral-700">
          Found your Packill password?
        </p>
        <div>
          <a href="/pile/login">
            <button
              class="btn bg-white text-sm font-medium text-neutral-700 hover:bg-slate-400/20 active:shadow-slate-300"
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
        alt="Reset your Packill password"
      />
      <div class="absolute bottom-8 left-8 space-y-4 text-white">
        <h1 class="font-semibold drop-shadow-xl">Oops,</h1>
        <p class="leading-5 drop-shadow-xl">
          Seems like someone has forgotten her password, <br />
          no worries, we are here to help.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Textbox from "@/components/textbox/textbox.vue";
</script>

<style scoped></style>
