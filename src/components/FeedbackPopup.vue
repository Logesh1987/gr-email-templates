<template>
  <div>
    <md-dialog
      class="feedbackDialog"
      @md-closed="closeDialog"
      :md-active.sync="showDialog"
    >
      <md-dialog-title> Help us to improve FOMO </md-dialog-title>
      <md-dialog-content>
        <md-field :class="{ 'md-invalid': $v.feedback.$error }">
          <label>Feedback</label>
          <md-textarea
            v-model="$v.feedback.$model"
            maxlength="500"
            md-autogrow
          ></md-textarea>
          <div class="md-error" v-if="!$v.feedback.required">
            Field is required
          </div>
          <div class="md-error" v-if="!$v.feedback.minLength">
            Feedback must be atleast 40 charectars
          </div>
        </md-field>
        <div v-if="success">
          <p class="success">
            {{ success }}
          </p>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <div>
          <md-button
            class="md-raised"
            v-if="!loading"
            @click.prevent="showDialog = false"
            >Close</md-button
          >
          <md-button
            class="md-raised md-accent"
            :disabled="!$v.feedback.$dirty || $v.feedback.$error || loading"
            @click="handleSubmit"
            v-if="!success"
          >
            <md-progress-spinner
              v-if="loading"
              md-diameter="15"
              md-stroke="3"
              md-mode="indeterminate"
            ></md-progress-spinner>
            <span v-else> Submit </span>
          </md-button>
        </div>
      </md-dialog-actions>
    </md-dialog>
    <a href="#" class="fbCTA" @click.prevent="showDialog = true">Feedback</a>
  </div>
</template>
<script>
import Axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "FeedbackPopup",
  props: ["url"],
  mixins: [validationMixin],
  data: function() {
    return {
      showDialog: false,
      feedback: "",
      loading: false,
      success: false
    };
  },
  validations: {
    feedback: { required, minLength: minLength(40) }
  },
  methods: {
    closeDialog: function() {
      this.feedback = "";
      this.loading = false;
      this.success = false;
      this.showDialog = false;
      this.$v.$reset();
    },
    handleSubmit: function() {
      this.loading = true;
      const params = {
        review: this.feedback
      };
      Axios.post(this.url, this.createFormData(params)).then(({ data }) => {
        this.loading = false;
        this.success = data.data.message;
        setTimeout(() => {
          this.closeDialog();
        }, 4000);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.fbCTA {
  background: var(--main-blue);
  color: #fff !important;
  padding: 0.2em 1em;
  font-weight: 600;
  border-radius: 1em 1em 0 0;
  position: fixed;
  right: 0;
  bottom: 40%;
  transform: rotate(-90deg);
  transform-origin: right bottom;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: opacity 0.5s;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
}
p.success {
  width: 100%;
  text-align: center;
  background: lightgreen;
  padding: 1em;
  margin: 0;
}
.feedbackDialog::v-deep {
  .md-dialog-container {
    width: 100%;
    max-width: 500px;
  }
  .md-dialog-actions {
    padding: 8px 24px 24px;
  }
}
</style>
