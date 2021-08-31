<template>
  <div class="list">
    <md-list :md-expand-single="expandSingle" class="amvip--landingList">
      <md-list-item
        v-for="data in dataSource"
        :key="data.key"
        :md-expand="data.listType === 'expansionlist'"
        @click="listItemclick($event, data)"
      >
        <div class="md-list-item-text">
          <span>{{ data.title }}</span>
          <i
            class="fas fa-chevron-right routeIcon"
            v-if="data.listType === 'routeList'"
          ></i>
        </div>
        <section
          slot="md-expand"
          class="list-content-wrapper"
          v-if="data.listType === 'expansionlist'"
        >
          <div class="list-content">
            {{ data.content }}
          </div>
          <router-link
            :to="data.moreBtnLink"
            class="moreBtn"
            v-if="data.showMoreBtn"
            >{{ data.moreBtnText }}</router-link
          >
        </section>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "ExpansionList",
  model: {
    event: "listItemClicked",
  },
  props: ["expandSingle", "dataSource"],
  methods: {
    listItemclick(eve, data) {
      if (data.listType === "routeList") {
        this.$router.push(data.routeLink).catch(err => {
          this.responseData = JSON.stringify(err);
          this.showSnackbar = true;
        });
      }
      this.$emit("listItemClicked", { context: this, data: data });
    },
  },
};
</script>

<style lang="less" scoped>
@list-width: 450px;

.full-control {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.full-control > .md-list {
  width: @list-width;
  max-width: 100%;
  height: 400px;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}

.control {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.amvip--landingList {
  .md-list-item-text {
    justify-content: space-around;
    align-items: center;
  }
  .routeIcon {
    width: auto;
  }
}
</style>
