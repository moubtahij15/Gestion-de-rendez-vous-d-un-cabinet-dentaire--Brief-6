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
          <td><button class="btn btn-danger">delete</button></td>

          <td>
            <button
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
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
            <h5 class="modal-title" id="exampleModalLabel">Edit Rdv</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- corps modal -->
            <form action="#" ref="registerForm" name="myForm" @click.prevent>
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
                    <!-- <span class="error-feedback" v-if="v$.nom.$error">{{
                      v$.nom.$errors[0].$message
                    }}</span> -->
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
                    <!-- <span class="error-feedback" v-if="v$.prenom.$error">{{
                      v$.prenom.$errors[0].$message
                    }}</span> -->
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
                <!-- <span class="error-feedback" v-if="v$.email.$error">{{
                  v$.email.$errors[0].$message
                }}</span> -->
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
                <!-- <span class="error-feedback" v-if="v$.date_naissance.$error">{{
                  v$.date_naissance.$errors[0].$message
                }}</span> -->
              </div>
              <br />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
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
  },

  mounted() {
    this.client_info = JSON.parse(localStorage.getItem("user-info"))[0][0];
    this.reff = this.client_info["id_client"];
    this.getRdv();
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
