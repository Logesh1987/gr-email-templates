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
            <md-menu
              md-size="small"
              md-align-trigger
              md-direction="bottom-end"
              class="tierMenu"
            >
              <span md-menu-trigger class="far fa-ellipsis-h"></span>
              <md-menu-content>
                <md-menu-item @click="editTier($event, tierData)"
                  ><span class="far fa-edit btnIcon"></span
                  ><span> Edit</span></md-menu-item
                >
                <md-menu-item
                  v-if="isDeleteEnabled"
                  @click="deleteTier($event, tierData)"
                  ><span class="far fa-trash-alt btnIcon"></span>
                  <span> Delete</span></md-menu-item
                >
              </md-menu-content>
            </md-menu>
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
          <h4 v-if="tierData.rewards.length > 0">
            Benefits
            <md-button
              class="md-raised secondaryBtn"
              @click="addBenefits($event, tierData)"
            >
              <span class="far fa-plus"></span>
              <span>Add</span>
            </md-button>
          </h4>
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
.amvip--tierCol {
  &.pt-20 {
    padding-top: 20px;
  }

  .md-button.md-raised.secondaryBtn {
    padding: 0;
    height: 28px;
    border-radius: 5px !important;
    min-width: 65px !important;
    > .md-ripple {
      padding: 0;
    }
  }
}
.md-menu-content-bottom-end {
  .md-list-item span.btnIcon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin-right: 10px;
  }
  .md-menu-content-container {
    ul.md-list {
      padding: 0 !important;
    }

    .md-list-item-content.md-ripple {
      padding: 0 10px;
      justify-content: flex-start;
      min-height: 30px;
    }
  }
}
li.info {
  color: rgb(252, 76, 76);
}
li.rewardItem {
  .rewardEdit {
    display: none;
    cursor: pointer;
    padding: 3px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
.amvip--cardAction {
  ul.md-list {
    padding: 0;
  }
  .md-list-item-content {
    min-height: 30px;
    justify-content: flex-start;
    align-items: center;
  }

  .md-list-item-content > * {
    font-size: 14px;
  }
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
    addBenefits(eve, data) {
      this.$emit("addBenefits", { context: this, data: data, eventObj: eve });
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
