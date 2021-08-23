import Vue from "vue";
import VueRouter from "vue-router";
import EmailListing from "../views/EmailListing.vue";
import EmailEdit from "../views/EmailEdit.vue";
import VueMaterial from "vue-material";
import VueSimpleAccordion from "vue-simple-accordion";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";
import Shell from "./../views/vip-tier/Shell.vue";
import Home from "./../views/vip-tier/Home.vue";
import Intro from "./../views/vip-tier/Intro.vue";
import Setup from "./../views/vip-tier/Setup.vue";
import ManageTier from "./../views/vip-tier/ManageTier.vue";
import EditReward from "./../views/vip-tier/EditReward.vue";
import AddReward from "./../views/vip-tier/AddReward.vue";
import AddTier from "./../views/vip-tier/AddTier.vue";
import EditTier from "./../views/vip-tier/EditTier.vue";

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
    path: "/view/tiers",
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
        component: Home,
      },
      {
        path: "intro",
        name: "Intro",
        component: Intro,
      },
      {
        path: "setupProgram",
        component: Setup,
      },
      {
        path: "editProgram",
        name: "Setup",
        component: Setup,
      },
      {
        path: "manage-tier",
        name: "ManageTier",
        component: ManageTier,
      },
      {
        path: "manage-reward/:currentRewardId",
        name: "EditReward",
        component: EditReward,
        props: true,
      },
      {
        path: "add-reward",
        name: "AddReward",
        component: AddReward,
        props: true,
      },
      {
        path: "add-tier",
        name: "AddTier",
        component: AddTier,
      },
      {
        path: "edit-tier/:currentTierId",
        name: "EditTier",
        component: EditTier,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
