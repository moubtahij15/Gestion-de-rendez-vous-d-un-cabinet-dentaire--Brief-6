<template>
  <navBar /><!-- Showcase -->

  <!-- <form action="#" @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Refference"
          v-model="reff"
        />
      </div>
    </div>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" class="btn btn-primary" @click="signInNow()">
          Login
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          class="btn btn-primary"
          @click="redirectTo({ val: 'Sign-up' })"
        >
          Sign Up
        </button>
      </div>
    </div>
    <br />
  </form> -->

  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your Refference!</p>

                <div class="form-outline form-white mb-4">
                  <input
                    v-model="reff"
                    type="email"
                    id="typeEmailX"
                    class="form-control form-control-lg"
                    placeholder="Refference"
                  />
                  <span class="error-feedback" v-if="v$.reff.$error">{{
                    v$.reff.$errors[0].$message
                  }}</span>
                  <!-- <label class="form-label" for="typeEmailX">Reference</label> -->
                </div>

                <!-- <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Forgot password?</a>
                </p> -->

                <button
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  @click="signInNow()"
                >
                  Login
                </button>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <a
                    href="#!"
                    class="text-white-50 fw-bold"
                    @click="redirectTo({ val: 'Sign-up' })"
                    >Sign Up</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import navBar from "@/components/navBar.vue";
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
export default {
  name: "SignInForm",
  components: {
    navBar,
  },
  data() {
    return {
      v$: useValidate(),
      reff: "",
    };
  },
  validations() {
    return {
      reff: { required, maxLength: maxLength(10) },
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async signInNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("form validate successfully");
        let result = await axios.post(
          "http://localhost/backend/public/Client/login",
          {
            id_client: this.reff,
          }
        );
        if (result.status == 200) {
          console.log(" Login successfully");

          // save user data in local storage
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result.data);
        } else {
          console.log(" login failed");
        }
      } else {
        console.log("form validate failed");
      }
    },
  },
};
</script>

<style>
gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );
}
.error-feedback {
  color: red;
  font-size: 0.85em;
}
</style>
