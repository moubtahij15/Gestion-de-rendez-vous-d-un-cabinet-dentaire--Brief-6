<template>
  <div class="container">
    <SignInForm />
  </div>
</template>

<script>
import SignInForm from "@/components/Signin/Signin.vue";
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  components: { SignInForm },
  methods: {
    ...mapActions(["redirectTo"]),
  },

  mounted() {
    let client = localStorage.getItem("user-info");
    if (client) {
      this.redirectTo({ val: "Rdv" });
    }
  },
};
</script>
