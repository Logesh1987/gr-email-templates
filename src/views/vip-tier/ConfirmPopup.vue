<template>
  <!-- <div class="amvip--dialog" v-if="showPopup">
    <div class="amvip--dialogBody">
      <h2>Confirm Activation</h2>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sequi
          reprehenderit exercitationem culpa fugit optio architecto magni
          temporibus aut perferendis?
        </p>
      </section>
      <footer class="amvip-actionFooter">
        <button class="amvip--btnSec" @click="cancelClick">Cancel</button>
        <button class="amvip--btnPri" @click="confirmClick">Confirm</button>
      </footer>
    </div>
  </div> -->
  <div>
    <md-dialog-confirm
      :md-active.sync="showPopup"
      md-title="Use Google's location service?"
      md-content="Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running."
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
  </div>
</template>
<style lang="less"></style>

<script>
export default {
  name: "ConfirmPopup",
  event: ["confirmed", "canceled"],
  props: ["showPopup"],
  data: function() {
    return {
      active: false,
      value: null,
    };
  },
  methods: {
    onConfirm() {
      this.value = "Agreed";
      this.active = false;
      this.$emit("confirmed");
    },
    onCancel() {
      this.value = "Disagreed";
      this.active = false;
      this.$emit("canceled");
    },
  },
};
</script>
