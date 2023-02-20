<script setup></script>

<template>
  <link
    href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap"
    rel="stylesheet"
  />
  <div id="app" class="flex h-screen min-h-[392px] flex-col">
    <router-view />
  </div>
</template>
