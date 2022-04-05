<template>
  <div class="home bg-dark">
    <navBar /><!-- Showcase -->
    <section
      class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start h-100"
    >
      <div class="container">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div>
            <h1>
              Anything to <span class="text-warning"> make you smile </span>
            </h1>
            <p class="lead my-4">
              We partner with you to make anything possible for your smile
            </p>
            <button
              class="btn btn-primary btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#enroll"
            >
              SCHEDULE APPOINTMENT
            </button>
          </div>
          <img
            class="img-fluid w-50 d-none d-sm-block"
            src="../assets/doctor.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import navBar from "@/components/navBar.vue";

export default {
  name: "HomeView",
  components: {
    navBar,
  },
};
</script>
<style>
body {
  height: 100vh;
  background-color: #065db4;
  background: #065db4;
}
</style>
