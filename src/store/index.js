import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  let user = reactive({
    name: "",
    id: "",
  });

  return { user };
});
