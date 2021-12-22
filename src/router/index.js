import Vue from "vue";
import VueRouter from "vue-router";
import EmailListing from "../views/EmailListing.vue";
import EmailEdit from "../views/EmailEdit.vue";
import EmbedLanding from "../views/embed/EmbedLanding.vue";
import EmbedStyle from "../views/embed/EmbedStyle.vue";
import EmbedEdit from "../views/embed/EmbedEdit.vue";
import EmbedFo from "../views/embed/EmbedFo.vue";
import VueMaterial from "vue-material";
import VueSimpleAccordion from "vue-simple-accordion";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";
import "vue-simple-accordion/dist/vue-simple-accordion.css";

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
    path: "/view/embed/landing/",
    name: "EmbedLanding",
    component: EmbedLanding,
  },
  {
    path: "/view/embed/style/",
    name: "EmbedStyle",
    component: EmbedStyle,
  },
  {
    path: "/view/embed/style/:id",
    name: "EmbedEdit",
    component: EmbedEdit,
  },
  {
    path: "/view/embed/Fo/",
    name: "EmbedFo",
    component: EmbedFo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
