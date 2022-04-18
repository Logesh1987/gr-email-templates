<template>
  <div>
    <div class="table-responsive tableList" v-if="listData.length">
      <table class="table table-striped snap-top">
        <thead>
          <tr>
            <th>FOMO Name</th>
            <th>Category</th>
            <th class="align-center">Clicks</th>
            <!-- <th>Visible to</th> -->
            <th class="align-center">Status</th>
            <th class="align-center">Show/Hide<br />Prompt</th>
            <th class="align-center">Action</th>
          </tr>
        </thead>
        <transition-group name="alist" tag="tbody">
          <tr class="listItem" v-for="data in listData" :key="data.id">
            <td class="font-size-mid">
              {{ data.attributes.name }}
            </td>
            <td class="font-size-mid">
              {{ mapCategory(data.type) }}
            </td>
            <td class="align-center">
              {{ data.attributes.clicks }}
            </td>
            <td class="align-center">
              <label
                class="switch"
                :for="data.id"
                @click="
                  (e) => updateStatus('status', data.id, data.attributes.status)
                "
              >
                <input
                  type="checkbox"
                  name="mainSwitch"
                  :checked="data.attributes.status == 1"
                />
                <i></i>
              </label>
            </td>
            <td class="align-center">
              <label
                :class="[
                  'switch',
                  `${data.attributes.status == 0 ? 'disabled' : ''}`,
                ]"
                :for="data.id"
                @click="
                  (e) =>
                    updateStatus(
                      'is_automatic',
                      data.id,
                      data.attributes.is_automatic
                    )
                "
              >
                <input
                  type="checkbox"
                  name="mainSwitch"
                  :checked="data.attributes.is_automatic == 1"
                />
                <i></i>
              </label>
            </td>
            <td class="align-center">
              <router-link class="mr-10" :to="`/view/fomo/summary/${data.id}`">
                <i class="fal fa-list-alt"></i>
              </router-link>
              <router-link :to="`/view/fomo/edit/${data.id}`">
                <i class="fal fa-edit"></i>
              </router-link>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
    <NoFomoView v-else />
  </div>
</template>
<script>
import NoFomoView from "@/components/fomo/NoFomoView.vue";
export default {
  name: "FomoListTable",
  props: ["listData", "updateStatus"],
  components: { NoFomoView },
  data: function() {
    return {
      categories: {
        signup_bonus: "Signup Bonus",
        new_product_release: "New Product",
      },
    };
  },
  methods: {
    mapCategory: function(type) {
      return this.categories[type];
    },
  },
};
</script>
<style lang="less" scoped>
/* tableList table */
.tableList {
  thead tr th {
    background: #eaeaea;
    font-weight: 500;
    border-bottom: 1px solid #b1b1b1;
    font-size: 12px;
    line-height: 15px;
    color: #000;
    font-weight: bold;
    padding: 10px;
    text-align: left;
  }

  tr:nth-child(odd) > td {
    background-color: #f9f9f9;
  }

  tbody tr td {
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    padding: 10px;

    &:first-child {
      border-left: 1px solid #eee;
    }
    &:last-child {
      border-right: 1px solid #eee;
    }
  }
  .fa-edit,
  .fa-list-alt {
    font-size: 1.2em;
  }
  .fa-edit {
    transform: translateY(-1px);
  }
  .font-size-mid {
    font-size: 12px;
    color: #202020;
  }

  .font-size-small {
    font-size: 10px;
    color: #999;
  }
  .align-center {
    text-align: center;
  }

  .table.table-striped {
    border-collapse: collapse;
  }
}
</style>
