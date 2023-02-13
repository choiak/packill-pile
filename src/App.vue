<script setup></script>

<template>
  <link
    href="https://api.fontshare.com/v2/css?f[]=general-sans@701,200,500,301,201,300,601,600,401,501,400,700&display=swap"
    rel="stylesheet"
  />
  <div id="app" class="flex h-screen min-h-[392px] flex-col">
    <router-view />
  </div>
</template>
