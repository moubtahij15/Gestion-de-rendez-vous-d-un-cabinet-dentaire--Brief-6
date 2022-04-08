<template>
  <div class="container">
    <h1 class="text-center text-white">choose your creneaux :</h1>
    <!-- show success message -->
    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="errMsg"
    >
      {{ errMsg }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="close"
      ></button>
    </div>
    <div
      class="alert alert-success alert-dismissible fade show"
      role="alert"
      v-if="successMsg"
    >
      {{ successMsg }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="close"
      ></button>
    </div>
    <!-- show creneau details : table  -->
    <!-- show add rdv Button -->

    <div class="col-lg-12 mt-5">
      <input
        type="text"
        placeholder="date Creneau"
        class="form-control form-control-lg"
        onfocus="(this.type = 'date')"
        v-model="date_creneau"
        required
      />
    </div>
    <!-- <span class="error-feedback" v-if="v$.date_creneau.$error">{{
      v$.date_creneau.$errors[0].$message
    }}</span> -->
    <hr class="bg-info" />

    <table class="table table-dark">
      <thead class="table-dark">
        <tr>
          <th>heure_debut</th>
          <th>heure_fin</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="elem in creneuax" :key="elem.id" class="text-center mx-auto">
          <td>{{ elem.heure_debut }}</td>
          <td>{{ elem.heure_fin }}</td>

          <td>
            <button
              class="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="passingData(elem)"
            >
              RDV
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- show add creneau modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sujet rendez-vous</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-outline form-white mb-4">
            <form action="" @click.prevent>
              <input
                type="text"
                id="typeEmailX"
                class="form-control form-control-lg"
                placeholder="Sujet de votre rendez-vous "
                v-model="sjt_RDV"
                required
              />
              <span class="error-feedback" v-if="v$.sjt_RDV.$error">{{
                v$.sjt_RDV.$errors[0].$message
              }}</span>

              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="validerRdv()"
                >
                  valider rendez vous
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "creneau",

  data() {
    return {
      v$: useValidate(),
      date_creneau: "",
      creneuax: [],
      sjt_RDV: "",
      id_client: "",
      id_creneau: "",
      successMsg: "",
      errMsg: "",
    };
  },
  validations() {
    return {
      // date_creneau: { required },
      sjt_RDV: { required },
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async getCreneaux() {
      this.errMsg = "";
      if (this.date_creneau) {
        let result = await axios.post(
          "http://localhost/backend/public/Creneau/read",
          {
            date: this.date_creneau,
          }
        );
        if (result.status == 200) {
          this.creneuax = result.data;
          console.log(this.date_creneau);

          // save user data in local storage
          // console.log(JSON.parse(localStorage.getItem("user-info"))[0][0]["nom"]);
        } else {
          console.log(" login failed");
        }
      } else {
        this.errMsg = "choose date please";
      }
    },
    passingData(elem) {
      this.sjt_RDV = "";
      this.client_info = JSON.parse(localStorage.getItem("user-info"))[0][0];
      this.id_client = this.client_info["id_client"];
      this.id_creneau = elem.id_creneau;
      console.log(elem);
    },
    async validerRdv() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("form validate successfully");

        let result = await axios.post(
          "http://localhost/backend/public/Rdv/create/",
          {
            date_creneau: this.date_creneau,
            id_client: this.id_client,
            id_creneau: this.id_creneau,
            sjt_RDV: this.sjt_RDV,
          }
        );
        if (result.status == 200) {
          // save user data    local storage
          console.log(result.data);
          this.sjt_RDV = "";
          this.date_creneau = "";
          // location.reload();

          // console.log(JSON.parse(localStorage.getItem("user-info"))[0][0]["nom"]);
          this.successMsg = "Bien passe le rendez-Vous";
        } else {
          console.log(" login failed");
        }
      } else {
        console.log("form  failed");
        this.errMsg += " && enter sjt ";
      }
    },
  },

  watch: {
    date_creneau(value) {
      this.getCreneaux(value);
    },
  },

  mounted() {
    // this.client_info = JSON.parse(localStorage.getItem("user-info"))[0][0];
    // this.reff = this.client_info["id_client"];

    this.getCreneaux();

    // console.log(this.date_creneau);
  },
};
</script>
