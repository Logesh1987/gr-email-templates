import Vue from "vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import VueSimpleAccordion from "vue-simple-accordion";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/black-green-light.css";

import EmailContainer from "../views/email/EmailContainer.vue";
import EmailListing from "../views/email/EmailListing.vue";
import EmailEdit from "../views/email/EmailEdit.vue";
import FomoContainer from "../views/fomo/FomoContainer.vue";
import FomoListing from "../views/fomo/FomoListing.vue";
import FomoSummary from "../views/fomo/FomoSummary.vue";
import FomoTemplates from "../views/fomo/FomoTemplates.vue";
import EditFomo from "../views/fomo/EditFomo.vue";

Vue.use(VueMaterial);
Vue.use(VueSimpleAccordion);

Vue.use(VueRouter);

const routes = [
  {
    path: "/view/email",
    component: EmailContainer,
    children: [
      {
        path: "templates",
        name: "EmailListing",
        component: EmailListing,
      },
      {
        path: "templates/:emailId",
        name: "EmailEdit",
        props: true,
        component: EmailEdit,
      },
    ],
  },
  {
    path: "/view/fomo",
    component: FomoContainer,
    children: [
      {
        path: "/",
        name: "FomoListing",
        component: FomoListing,
      },
      {
        path: "summary/:fomoid",
        name: "FomoSummary",
        props: true,
        component: FomoSummary,
      },
      {
        path: "templates/:fomoid",
        name: "FomoTemplates",
        props: true,
        component: FomoTemplates,
      },
      {
        path: "edit/:fomoid",
        name: "EditFomo",
        props: true,
        component: EditFomo,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
