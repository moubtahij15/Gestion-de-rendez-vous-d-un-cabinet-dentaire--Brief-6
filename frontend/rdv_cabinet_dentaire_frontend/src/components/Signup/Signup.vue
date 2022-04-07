<template>
  <navBar />
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2
                  class="fw-bold mb-2 text-uppercase"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Register
                </h2>
                <p class="text-white-50 mb-5">
                  Please enter your information !
                </p>
                <div class="alert alert-success" role="alert" v-if="reff">
                  your refference is {{ reff }}
                </div>
                <form
                  action="#"
                  ref="registerForm"
                  name="myForm"
                  @click.prevent
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          class="form-control"
                          placeholder="First name"
                          v-model="nom"
                        />
                        <span class="error-feedback" v-if="v$.nom.$error">{{
                          v$.nom.$errors[0].$message
                        }}</span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="form3Example2"
                          class="form-control"
                          placeholder="Last name"
                          v-model="prenom"
                        />
                        <span class="error-feedback" v-if="v$.prenom.$error">{{
                          v$.prenom.$errors[0].$message
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div class="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      placeholder="Email "
                      v-model="email"
                    />
                    <span class="error-feedback" v-if="v$.email.$error">{{
                      v$.email.$errors[0].$message
                    }}</span>
                  </div>
                  <br />

                  <div class="form-outline form-white mb-4">
                    <input
                      type="text"
                      placeholder="date naissance"
                      class="form-control form-control-lg"
                      onfocus="(this.type = 'date')"
                      v-model="date_naissance"
                    />
                    <span
                      class="error-feedback"
                      v-if="v$.date_naissance.$error"
                      >{{ v$.date_naissance.$errors[0].$message }}</span
                    >
                  </div>
                  <br />

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    @click="signUpNow()"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Register
                  </button>
                </form>
              </div>

              <div>
                <p class="mb-0">
                  you have an account?
                  <a
                    href="#!"
                    class="text-white-50 fw-bold"
                    @click="redirectTo({ val: 'Sign-in' })"
                    >Sign In</a
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
import { required, email, maxLength } from "@vuelidate/validators";
export default {
  name: "SignUpForm",
  components: {
    navBar,
  },
  data() {
    return {
      v$: useValidate(),
      nom: "",
      prenom: "",
      date_naissance: "",
      email: "",
      reff: "",
      showM: "",
    };
  },
  validations() {
    return {
      nom: { required, maxLength: maxLength(10) },
      prenom: { required, maxLength: maxLength(10) },
      email: { required, email },
      date_naissance: { required },
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async signUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("form validate successfully");
        let result = await axios.post(
          "http://localhost/backend/public/Client/register",
          {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            date_naissance: this.date_naissance,
          }
        );

        if (result.status == 200) {
          // var frm = document.getElementsByName("myForm");

          // frm.reset(); // Reset
          this.nom = "";
          this.prenom = "";
          this.email = "";
          this.date_naissance = "";

          console.log("add client successfully");
          this.reff = result.data.message;
          // save user data in local storage
          // localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result.data.message);
        } else {
          console.log("add client failed");
        }
      } else {
        console.log("form validate failed");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-feedback {
  color: red;
  font-size: 0.85em;
}
</style>
