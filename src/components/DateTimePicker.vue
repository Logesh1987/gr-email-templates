<template>
  <v-date-picker v-model="dtime" mode="dateTime">
    <template v-slot="{ inputValue, inputEvents }">
      <input
        class="bg-white border px-2 py-1 rounded"
        :value="inputValue"
        v-on="inputEvents"
      />
    </template>
  </v-date-picker>
</template>
<script>
import Vue from "vue";
import VCalendar from "v-calendar";
Vue.use(VCalendar);
export default {
  name: "DateTimePicker",
  props: ["title", "onChange", "mode"]
};
</script>
