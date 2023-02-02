<template>
  <div class="nejree-carousel select-none" v-if="!loading">
    <div class="carousel-header p-5 md:p-6">
      <div class="flex justify-content-between text-white-alpha-40">
        <span
          v-for="item of items"
          :key="item.title"
          class="carousel-item text-center cursor-pointer w-2"
          :class="{ active: item.title === active_item.title }"
          @click="active_item = item"
        >
          <span
            class="carousel-item-icon align-items-center flex justify-content-center m-auto mb-2"
            v-html="item.icon"
          ></span>
          <span class="carousel-item-label text-xs" v-if="lang=='ar'">{{ item.title_ar }}</span>
          <span class="carousel-item-label text-sm" v-else>{{ item.title }}</span>
        </span>
      </div>
    </div>

    <div v-if="active_item.content" class="active-carousel-item-content p-4 text-center bg-white m-3 border-round-xl">
      <div
        class="active-carousel-item-icon mx-auto mt-2 p-4 bg-gray-100"
        v-html="active_item.icon"
      ></div>
      <h3 class="mb-2">{{ active_item.title }}</h3>
      <div class="text-sm" v-html="active_item.content"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "TopCarousel",
  props: {
    carousel_id: String,
    lang: String,
  },
  data() {
    return {
      loading: true,
      items: [],
      active_item: {},
      active_item_timer: 5000,
    };
  },
  mounted() {
    this.getCarousel(this.carousel_id)
    setTimeout(() => {
      this.autoSwitchSlides();
    }, this.active_item_timer);
  },
  methods: {
    getCarousel(id){
      axios
        .get(`https://cms.nejree.com/items/icon_carousels/${id}`)
        .then((r) => {
          this.items = r.data.data.items.sort((a, b) => {return a.sort-b.sort})
          this.active_item = r.data.data.items[0];
          this.loading = false
        })
        .catch((e) => {
          this.loading = false
        })
    },
    autoSwitchSlides() {

      setTimeout(() => {
        this.autoSwitchSlides();
      }, this.active_item_timer);

      const maxCount = this.items.length;
      let activeSlideIndex = this.items.findIndex(
        (itm) => itm.title === this.active_item.title
      )
        ? this.items.findIndex((itm) => itm.title === this.active_item.title)
        : 0;
      if (activeSlideIndex + 1 === maxCount) {
        this.active_item = this.items[0];
      } else {
        this.active_item = this.items[activeSlideIndex + 1];
      }
    },
  },
};
</script>
<style>
.carousel-header {
  position: relative;
  background: #000;
}
.carousel-header:after {
  content: " ";
  position: absolute;
  left: 50%;
  margin-left: -35%;
  z-index: 1;
  width: 70%;
  bottom: 60%;
  height: 1px;
  border-bottom: 2px dotted #f3f3f326;
}
.carousel-item-icon {
  display: block;
  position: relative;
  z-index: 44;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #242424;
  transition: all 0.15s linear;
}
.carousel-item-icon svg{
  fill: rgba(255, 255, 255, 0.65);
}
.active .carousel-item-icon {
  box-shadow: 0 0 0 1px #fbad1b;
}
.active .carousel-item-icon svg{
  fill: white;
}
.active .carousel-item-label {
  color: #fff;
}
.active-carousel-item-icon {
  width: 30px;
  height: 30px;
  line-height: 50px;
  overflow: hidden;
  border-radius: 100%;
}
.active-carousel-item-icon svg {
  width: 30px;
  height: 30px;
}
</style>
