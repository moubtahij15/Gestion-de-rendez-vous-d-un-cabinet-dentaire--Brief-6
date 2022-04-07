<template>
  <div class="navBar">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
      <div class="container">
        <router-link to="/">
          <h5 class="navbar-brand">
            Moubtahij <span class="text-warning"> Dental </span>
          </h5>
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navmenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!client">
              <router-link to="/Sign-in">
                <h5 class="nav-link">Login</h5>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Sign-up" v-if="!client">
                <h5 class="nav-link">register</h5>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Rdv">
                <h5 class="nav-link">appointments</h5>
              </router-link>
            </li>
            <li class="nav-item" v-if="client">
              <h5 class="nav-link" @click="logout()">Logout</h5>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      client: "",
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),

    logout() {
      localStorage.clear();

      this.redirectTo({ val: "home" });
    },
  },
  mounted() {
    this.client = localStorage.getItem("user-info");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.navBar {
  margin-bottom: 80px;
}
a,
router-link {
  text-decoration: none;
}
ul {
  list-style: none;
}
.nav-item {
  cursor: pointer;
}
</style>
