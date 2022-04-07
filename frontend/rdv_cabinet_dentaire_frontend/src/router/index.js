import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Rdv from "../views/Rdv.vue";
import creneauxView from "../views/creneauxView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: Signup,
  },
  {
    path: "/sign-in",
    name: "Sign-in",
    component: Signin,
  },
  {
    path: "/Rdv",
    name: "Rdv",
    component: Rdv,
  },
  {
    path: "/creneau",
    name: "creneau",
    component: creneauxView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
