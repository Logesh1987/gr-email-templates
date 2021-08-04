import Vue from "vue";
import VueRouter from "vue-router";
import EmailListing from "../views/EmailListing.vue";
import EmailEdit from "../views/EmailEdit.vue";
import VueMaterial from "vue-material";
import VueSimpleAccordion from "vue-simple-accordion";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";
import Shell from "./../views/vip-tier/Shell.vue";

Vue.use(VueMaterial);
Vue.use(VueSimpleAccordion);

Vue.use(VueRouter);

const routes = [
  {
    path: "/view/email/templates/",
    name: "EmailListing",
    component: EmailListing,
  },
  {
    path: "/view/email/templates/:emailId",
    name: "EmailEdit",
    props: true,
    component: EmailEdit,
  },
  {
    path: "/vip-tier",
    name: "Shell",
    component: Shell,
    children: [
      {
        path: "",
        redirect: "home",
      },
      {
        path: "home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "./../views/vip-tier/Home.vue"),
      },
      {
        path: "intro",
        name: "Intro",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "intro" */ "./../views/vip-tier/Intro.vue"
          ),
      },
      {
        path: "setupProgram",
        name: "Setup",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "setup" */ "./../views/vip-tier/Setup.vue"
          ),
      },
      {
        path: "editProgram",
        name: "Setup",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "setup" */ "./../views/vip-tier/Setup.vue"
          ),
      },
      {
        path: "manage-tier",
        name: "ManageTier",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "manage tier" */ "./../views/vip-tier/ManageTier.vue"
          ),
      },
      {
        path: "manage-reward",
        name: "ManageReward",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "manage reward" */ "./../views/vip-tier/ManageReward.vue"
          ),
      },
      {
        path: "add-tier",
        name: "AddTier",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "add tier" */ "./../views/vip-tier/AddTier.vue"
          ),
      },
      {
        path: "edit-tier",
        name: "EditTier",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "add tier" */ "./../views/vip-tier/EditTier.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
