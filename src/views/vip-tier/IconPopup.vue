<template>
  <transition name="fade">
    <div class="amvip--dialog" v-if="showPopup">
      <div class="amvip--dialogBody">
        <span class="dialogClose" @click="hidePopup">&times;</span>
        <h2>Choose Tier Icon</h2>
        <section>
          <div class="amvip--customRadio amvip--iconGroup">
            <input type="radio" name="selctTierIcon" id="iconGroup1" />
            <label for="iconGroup1">
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-bronze.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-silver.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-gold.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-platinum.png"
                  alt=""
                />
              </div>
            </label>
          </div>
          <div class="amvip--customRadio amvip--iconGroup">
            <input type="radio" name="selctTierIcon" id="iconGroup2" />
            <label for="iconGroup2">
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-bronze.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-silver.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-gold.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="./../../assets/vip-tier/images/icon-platinum.png"
                  alt=""
                />
              </div>
            </label>
          </div>
          <div class="amvip--customRadio amvip--iconCustom">
            <input type="radio" name="selctTierIcon" id="iconGroup3" />
            <label for="iconGroup3"
              ><button class="amvip--btnCommon">
                Upload New Icon<input type="file" name="" id="" /></button
            ></label>
          </div>
        </section>
        <p class="amvip--iconWarning">
          <input type="checkbox" name="" id="iconWarning" />
          <label for="iconWarning">Apply Icon for all 4 Tiers</label>
        </p>
        <footer class="amvip-actionFooter">
          <button class="amvip--btnPri" @click="hidePopup">Select</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="less">
@import url("./../../assets/vip-tier/less/_icon-dialog");
</style>

<script>
export default {
  name: "IconPopup",
  props: ["showPopup"],
  event: ["close-btn-click"],
  data: function() {
    return {
      enablePopup: false,
      active: false,
      value: null,
    };
  },
  components: {},
  onConfirm() {
    this.value = "Agreed";
  },
  onCancel() {
    this.value = "Disagreed";
  },
  methods: {
    hidePopup(event) {
      this.$emit("close-btn-click", event);
    },
  },
};
</script>
