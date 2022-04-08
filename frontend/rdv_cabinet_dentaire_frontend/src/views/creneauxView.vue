<template>
  <navBar />
  <creneau />
</template>
<script>
import navBar from "@/components/navBar.vue";
import creneau from "@/components/creneux/creneaux.vue";

export default {
  name: "creneauxView",
  components: {
    creneau,
    navBar,
  },
};
</script>
