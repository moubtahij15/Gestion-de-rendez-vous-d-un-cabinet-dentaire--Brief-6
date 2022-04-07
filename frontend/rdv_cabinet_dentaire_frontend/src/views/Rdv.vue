<template>
  <div class="container">
    <navBar />
    <br />
    <crudRdvTable />
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";
import { mapActions } from "vuex";
import crudRdvTable from "@/components/crudRdv/crudRdv.vue";
export default {
  name: "crudRdv",
  components: { crudRdvTable, navBar },
  methods: {
    ...mapActions(["redirectTo"]),
  },

  mounted() {
    let client = localStorage.getItem("user-info");
    if (!client) {
      this.redirectTo({ val: "Sign-in" });
    }
  },
};
</script>
