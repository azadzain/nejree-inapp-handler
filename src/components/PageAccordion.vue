<template>
  <div class="nejree-accordion mx-3 pt-3 pb-4 select-none" v-if="!loading">
    <h4 class="px-2 mt-0 text-right" v-if="lang == 'ar'">لأسئلة المتداولة (FAQs)</h4>
    <h4 class="px-2 mt-0" v-else>FAQs</h4>
    <div
      v-if="categories.length > 1"
      class="category-filters bg-black-alpha-90 border-round-3xl mb-4 mt-2 overflow-x-scroll overflow-y-hidden shadow-2 sticky"
      style="top: 10px;"
    >
      <div class="min-w-max px-4">
        <div
          class="category-filter-tag capitalize py-2"
          :class="{
            'text-white-alpha-30' : activeCategory,
            'text-white' : !activeCategory,
            'category-filter-tag-ar' : lang === 'ar',
            'pr-4' : lang !== 'ar',
            'pl-4' : lang === 'ar'
          }"
          @click="activeCategory = false"
          >
          <span v-if="lang == 'ar'">الكل</span>
          <span v-else>All</span>
          </div
        >
        <div
          v-for="(cat, i) of categories"
          :key="i"
          class="category-filter-tag capitalize py-2"
          :class="{
            'text-white-alpha-30' : activeCategory !== cat,
            'text-white' : activeCategory === cat,
            'category-filter-tag-ar' : lang === 'ar',
            'pr-4' : lang !== 'ar',
            'pl-4' : lang === 'ar'
          }"
          @click="activeCategory = cat"
          >{{ category_labels.find(c => c.key === cat)[lang] }}</div
        >
        <div style="clear:both;"></div>
      </div>
    </div>

    <div v-if="filteredItems.length > 0">
      <div v-for="faq of filteredItems" :key="faq.id">
        <div
          class="bg-white border-round-top-xl border-none font-medium p-3 flex justify-content-between align-items-center"
          :class="{ 'border-round-bottom-xl mb-3': !faq.isOpen }"
          @click="
            filteredItems = filteredItems.map((f) => ({
              ...f,
              isOpen: f.question !== faq.question ? false : !f.isOpen,
            }))
          "
        >
          <div
            v-if="lang == 'ar'"
            class="select-none text-right font-medium line-height-3"
            v-text="faq.question_ar"
            style="width: 90%;"
          ></div>
          <div
            v-else
            class="select-none"
            v-text="faq.question"
            style="width: 90%"
          ></div>
          <svg
            v-show="!faq.isOpen"
            class="fill-current"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              class="heroicon-ui"
              d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm1-9h2a1 1 0 010 2h-2v2a1 1 0 01-2 0v-2H9a1 1 0 010-2h2V9a1 1 0 012 0v2z"
            />
          </svg>
          <svg
            v-show="faq.isOpen"
            class="fill-current"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              class="heroicon-ui"
              d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm4-8a1 1 0 01-1 1H9a1 1 0 010-2h6a1 1 0 011 1z"
            />
          </svg>
        </div>
        <div
          v-if="lang == 'ar'"
          class="select-none text-gray-700 text-sm bg-white border-round-bottom-xl p-3 border-top-1 border-gray-100 text-right line-height-4"
          :class="{ 'mb-3': faq.isOpen }"
          v-html="faq.answer_ar"
          v-show="faq.isOpen"
        ></div>
        <div
          v-else
          class="select-none text-gray-700 text-sm bg-white border-round-bottom-xl p-3 border-top-1 border-gray-100"
          :class="{ 'mb-3': faq.isOpen }"
          v-html="faq.answer"
          v-show="faq.isOpen"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PageAccordion",
  props: {
    category: String,
    lang: String,
  },
  data() {
    return {
      loading: true,
      categories: [],
      category_labels: [
        {
          key: 'general',
          en: "General",
          ar: "العام"
        },
        {
          key: 'creators',
          en: "Creators",
          ar: "المبدعون"
        },
        {
          key: 'earn_points',
          en: "Points",
          ar: "نقاط"
        },
        {
          key: 'veedz',
          en: "VEEDZ",
          ar: "VEEDZ"
        },
        {
          key: 'tiers',
          en: "Tiers",
          ar: "نظام الفئة"
        }
      ],
      activeCategory: false,
      items: [],
      filteredItems: [],
    };
  },
  mounted() {
    this.categories = this.category.split(",");
    console.log(this.categories);
    this.getFAQs();
  },
  watch: {
    activeCategory: function(c){
      console.log(c)
      if(c){
        this.filteredItems = this.items.filter((item) => { return item.categories.includes(c) })
        console.log(this.filteredItems)
      }else{
        this.filteredItems = this.items;
      }
    }
  },
  methods: {
    getFAQs() {
      axios.get(`https://cms.nejree.com/items/faqs?limit=-1`).then((r) => {
        // this.items = r.data.data.sort((a, b) => { return a.sort-b.sort })
        const faqs = r.data.data
          .sort((a, b) => {
            return a.sort - b.sort;
          })
          .map(({ ...rest }) => ({
            ...rest,
            isOpen: false,
          }));
        this.categories.forEach((c) => {
          this.items.push(
            ...faqs.filter((itm) => {
              return itm.categories.includes(c);
            })
          );
          this.filteredItems = this.items
          this.loading = false;
        })
      })
      .catch((e) => {
          this.loading = false;
        })
    },
  },
};
</script>
<style>
.category-filters{
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.category-filters::-webkit-scrollbar {
  display: none;
}
.category-filter-tag{
  float:left;
}
.category-filter-tag.category-filter-tag-ar{
  float:right!important
}
</style>
