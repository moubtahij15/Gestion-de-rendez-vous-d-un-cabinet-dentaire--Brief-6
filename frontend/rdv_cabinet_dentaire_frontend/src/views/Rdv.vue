<template>
  <div class="container">
    <navBar />
    <br />
    <crudRdvTable />
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";

import crudRdvTable from "@/components/crudRdv/crudRdv.vue";
export default {
  name: "crudRdv",
  components: { crudRdvTable, navBar },
  mounted() {
    let client = localStorage.getItem("user-info");
    if (!client) {
      this.redirectTo({ val: "sign-in" });
    }
  },
};
</script>
