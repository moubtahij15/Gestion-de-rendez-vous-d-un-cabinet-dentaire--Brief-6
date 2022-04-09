<template>
  <div class="container">
    <!-- show add rdv Button -->
    <div class="col-lg-12 mt-5">
      <button
        class="float-end btn btn-info"
        @click="redirectTo({ val: 'creneau' })"
      >
        add new appointment
      </button>
      <button class="float-start btn btn-danger" v-if="RdvClient.length > 0">
        delete all appointment
      </button>
    </div>
    <div class="clearfix"></div>
    <hr class="bg-info" />
    <!-- show success and error message -->
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
    <!-- show rd details : table  -->
    <table class="table table-dark">
      <thead class="table-dark">
        <tr>
          <th>sjt_RDV</th>
          <th>date_creneau</th>
          <th>heure_debut</th>
          <th>heure_fin</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="elem in RdvClient"
          :key="elem.id"
          class="text-center mx-auto"
        >
          <td>{{ elem.sjt_RDV }}</td>
          <td>{{ elem.date_creneau }}</td>
          <td>{{ elem.heure_debut }}</td>
          <td>{{ elem.heure_fin }}</td>
          <td>
            <button
              class="btn btn-danger"
              v-if="RdvClient.length > 0"
              @click="deleteRdv(elem)"
            >
              delete
            </button>
          </td>

          <td>
            <button
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              v-if="RdvClient.length > 0"
              @click="updateRdv(elem)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- show edit rdv modal -->
    <!-- Button trigger modal -->

    <!-- Modal -->
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
            <h5 class="modal-title" id="exampleModalLabel">
              Sujet rendez-vous
            </h5>
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
                <!-- <span class="error-feedback" v-if="v$.sjt_RDV.$error">{{
                  v$.sjt_RDV.$errors[0].$message
                }}</span> -->

                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="affiche()"
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
    <!-- show delete rdv modal -->
    <!-- show delete all rdv model -->
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "crudRdvTable",
  data() {
    return {
      errMsg: "",
      successMsg: "",
      RdvClient: [],
      reff: "",
      client_info: [],
      id_rdv: "",
      sjt_RDV: "",
      id_creneau: "",
      date_creneau: "",
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async getRdv() {
      console.log("form validate successfully");
      let result = await axios.post(
        "http://localhost/backend/public/Rdv/read/",
        {
          reff: this.reff,
        }
      );
      if (result.status == 200) {
        console.log(" Login successfully");
        this.RdvClient = result.data;

        // save user data in local storage
        console.log(this.client_info["nom"]);
        // console.log(JSON.parse(localStorage.getItem("user-info"))[0][0]["nom"]);
      } else {
        console.log(" login failed");
      }
    },
    async deleteRdv(elem) {
      let result = await axios.post(
        "http://localhost/backend/public/Rdv/delete/ " + elem.id_RDV
      );
      if (result.status == 200) {
        console.log("  successfully");
        if (result.data.message == "deleted") {
          this.successMsg = "Bien deleted";
          this.getRdv();
        }
      } else {
        console.log(" delete failed");
      }
    },
    updateRdv(elem) {
      this.id_creneau = elem.id_creneau;
      this.date_creneau = elem.date_creneau;
      this.id_RDV = elem.id_RDV;
      this.sjt_RDV = elem.sjt_RDV;
      // console.log("update");
      // console.log("id RDV " + this.id_RDV);
      // console.log("sjt RDV  " + this.sjt_RDV);
      // console.log("date crene : " + this.date_creneau);
      // console.log("id client " + this.reff);
      // console.log("id crenau" + this.id_creneau);
      // console.log(elem.id_RDV);
      // console.log(this.sjt_RDV);
      // console.log(elem.date_creneau);
      // console.log(this.reff);
      // console.log(elem.id_creneau);
    },
    async affiche() {
      let result = await axios.post(
        "http://localhost/backend/public/Rdv/update",
        {
          id_RDV: this.id_RDV,
          sjt_RDV: this.sjt_RDV,
          date_creneau: this.date_creneau,
          id_client: this.reff,
          id_creneau: this.id_creneau,
        }
      );
      if (result.status == 200) {
        if (result.data.message == "updated") {
          console.log("  successfully");
          this.successMsg = "Bien updated";
          this.getRdv();
        } else {
          console.log("  not");
        }
      } else {
        console.log(" delete failed");
      }
    },
  },

  mounted() {
    this.client_info = JSON.parse(localStorage.getItem("user-info"))[0][0];
    this.reff = this.client_info["id_client"];
    this.getRdv();
    this.$emit("myEvent", "eventValueOne");
  },
  // async created() {
  //   let result = await axios
  //     .get("http://localhost/backend/public/Rdv/read/", {
  //       params: {
  //         reff: this.reff,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //     });

  //   if (result.status == 200) {
  //     // var frm = document.getElementsByName("myForm");
  //     // console.log("add client successfully");
  //     // this.RdvClient = result.data;
  //     // // save user data in local storage
  //     // // localStorage.setItem("user-info", JSON.stringify(result.data));
  //     console.log(result.data);
  //   } else {
  //     console.log("add client failed");
  //   }
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
