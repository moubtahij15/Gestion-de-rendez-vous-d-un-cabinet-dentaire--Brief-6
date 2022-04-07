<template>
  <div class="navBar">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
      <div class="container">
        <a href="#" class="navbar-brand"
          >Moubtahij <span class="text-warning"> Dental </span>
        </a>

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
            <li class="nav-item">
              <a href="#learn" class="nav-link">Login</a>
            </li>
            <li class="nav-item">
              <a href="#questions" class="nav-link">register</a>
            </li>
            <li class="nav-item">
              <a href="#instructors" class="nav-link">about</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
  </div>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.navBar {
  margin-bottom: 80px;
}
</style>
