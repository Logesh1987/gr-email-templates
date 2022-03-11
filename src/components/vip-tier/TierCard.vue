<template>
  <div class="amvip--tierCol" :class="getTierClass(tierData)">
    <div class="outerWrapper" :style="{ 'background-color': tierData.color }">
      <div class="innerWrapper">
        <header>
          <div
            class="amvip--cardImg"
            v-if="tierData.icon.length > 0"
            :class="validURL(tierData.icon) ? '' : tierData.icon"
            v-bind:style="
              validURL(tierData.icon)
                ? {
                    backgroundImage: 'url(' + getCDNImage(tierData.icon) + ')',
                    backgroundSize: '100% 100%',
                    backgroundColor: tierData.color,
                  }
                : { backgroundColor: tierData.color }
            "
          >
            <span
              class="far fa-edit"
              @click="editTierIcon($event, tierData)"
            ></span>
          </div>
          <div class="amvip--cardImg" v-else>
            <span
              class="far fa-edit"
              @click="editTierIcon($event, tierData)"
            ></span>
          </div>
          <h3>{{ tierData.name }}</h3>
          <h5 v-if="tierData.goal !== 0">{{ tierData.description }}</h5>
          <div class="amvip--cardAction">
            <md-menu md-size="small" md-align-trigger>
              <!-- <md-button md-menu-trigger>Align with trigger</md-button> -->
              <span md-menu-trigger class="far fa-ellipsis-h"></span>
              <md-menu-content>
                <md-menu-item @click="editTier($event, tierData)"
                  >Edit</md-menu-item
                >
                <md-menu-item
                  v-if="isDeleteEnabled"
                  @click="deleteTier($event, tierData)"
                  >Delete</md-menu-item
                >
              </md-menu-content>
            </md-menu>

            <!-- <span
              class="far fa-edit"
              @click="editTier($event, tierData)"
            ></span>
            <span
              v-if="isDeleteEnabled"
              class="far fa-trash-alt"
              @click="deleteTier($event, tierData)"
            ></span> -->
          </div>
        </header>
        <span class="hrRuler"></span>
        <div class="amvip--tierDetails">
          <h4 v-if="tierData.goal !== 0">Eligibility</h4>
          <ul class="amvip--bulletList" v-if="tierData.goal !== 0">
            <li>{{ tierData.goaltxt }} annually</li>
          </ul>
          <div v-else class="eligibilityDesc">{{ tierData.description }}</div>
          <span v-if="tierData.goal !== 0" class="hrRuler"></span>
          <h4 v-if="tierData.rewards.length > 0">Benefits</h4>
          <ul class="amvip--bulletList" v-if="tierData.rewards.length > 0">
            <li
              v-for="benefit of tierData.rewards"
              :key="benefit.index"
              class="rewardItem"
            >
              {{ benefit.name }}
              <span
                class="far fa-edit rewardEdit"
                @click="editRewardIcon($event, benefit, tierData.id)"
              ></span>
            </li>
            <li v-if="tierData.rewards.length == 0" class="info">
              Rewards yet to be added!!!
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.amvip--tierDetails.pt-20 {
  padding-top: 20px;
}
li.info {
  color: rgb(252, 76, 76);
}
li.rewardItem {
  .rewardEdit {
    display: none;
    cursor: pointer;
    padding: 0 10px;
  }
  &:hover {
    .rewardEdit {
      display: inline-block;
    }
  }
}
.eligibilityDesc {
  margin: 15px 0;
}
.hrRuler {
  border: 0;
  display: inline-block;
  width: 75%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}
</style>
<script>
export const TierType = {
  Bronze: "Bronze",
  Silver: "Silver",
  Gold: "Gold",
  Diamond: "Diamond",
  Platinum: "Platinum",
};
export default {
  name: "VipTierCard",
  props: ["tierData", "isDeleteEnabled"],
  model: {
    event:
      "editClicked, deleteClicked, editTierIconClicked, editRewardIconClicked",
  },
  data: () => ({}),
  methods: {
    getImgUrl(image) {
      return require("./../../assets/vip-tier/images/" + image);
    },
    editTier(eve, data) {
      this.$emit("editClicked", { context: this, data: data, eventObj: eve });
    },
    editTierIcon(eve, data) {
      this.$emit("editTierIconClicked", {
        context: this,
        data: data,
        event: eve,
      });
    },
    editRewardIcon(eve, data, tierId) {
      this.$emit("editRewardIconClicked", {
        context: this,
        data: data,
        event: eve,
        tierId: tierId,
      });
    },
    deleteTier(eve, data) {
      this.$emit("deleteClicked", { context: this, data: data, eventObj: eve });
    },
    getTierClass(data) {
      let tierClass = "";
      const title = data.title;
      const isPaused = data.paused;
      switch (title) {
        case TierType.Gold:
          tierClass = "amvip--gold";
          break;
        case TierType.Diamond:
          tierClass = "amvip--diamond";
          break;
        case TierType.Platinum:
          tierClass = "amvip--platinum";
          break;
        case TierType.Bronze:
          tierClass = "amvip--bronze";
          break;
        case TierType.Silver:
          tierClass = "amvip--silver";
          break;
        default:
          break;
      }
      if (isPaused == 1) {
        tierClass += "paused";
      }
      return tierClass;
    },
  },
};
</script>
