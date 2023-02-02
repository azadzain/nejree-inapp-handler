<template>
  <div
    class="nejree-content-group select-none"
    :class="{ 'mx-3 pt-3 pb-4': !override_styles }"
    v-if="!loading"
  >
    <div
      v-if="item"
      class="bg-white border-round-top-xl border-none px-4 py-2 border-round-xl"
    >
      <div v-for="(block, i) of item.blocks" :key="i">
        <div
          v-if="lang === 'ar'"
          v-html="block.content_ar"
          class="content-container pb-3 surface-border line-height-4 text-sm"
          :class="{
            'border-bottom-1': i + 1 < item.blocks.length,
            'mb-5': i + 1 < item.blocks.length,
          }"
        ></div>
        <div
          v-else
          v-html="block.content"
          class="content-container pb-3 surface-border line-height-4 text-sm"
          :class="{
            'border-bottom-1': i + 1 < item.blocks.length,
            'mb-5': i + 1 < item.blocks.length,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PageContentGroup",
  props: {
    group_id: String,
    lang: String,
    override_styles: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      item: false,
    };
  },
  mounted() {
    this.getContentGroup();
  },
  methods: {
    getContentGroup() {
      axios
        .get(
          `https://cms.nejree.com/items/content_groups/?filter[key][_eq]=${this.group_id}&fields=id,key,title,blocks.id,blocks.title,blocks.content,blocks.content_ar,blocks.title_ar`
        )
        .then((r) => {
          this.item = r.data.data[0];
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style>
.content-container h3 {
  margin-bottom: 0 !important;
}
</style>
