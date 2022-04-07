<template>
  <div class="container">
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from "@/components/Signup/Signup.vue";
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  components: { SignUpForm },
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
