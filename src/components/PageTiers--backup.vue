<template>
  <div class="nejree-teirs mx-3 pt-3 pb-4 select-none">

    <div v-if="items.length > 1"
      class="tier-bg border-round-xl absolute left-0 tier-bg top-0 z-0 w-full"
      style="height: 180px;"
      v-html="items.find((itm) => {
            return itm.name === active_tier;
          }).bg"
    ></div>
    
    <div class="relative z-1 header flex justify-content-between align-items-center">
      
      <div class="text-center flex justify-content-start my-3">

        <div class="user-avatar mr-2" v-if="img">
          <img :src="img" />
        </div>
        <svg
          v-if="!img"
          id="person.crop.circle.fill"
          xmlns="http://www.w3.org/2000/svg"
          width="19.922"
          height="19.932"
          viewBox="0 0 19.922 19.932"
          style="margin: auto; transform: scale(2.2)"
          class="ml-1 mr-4"
        >
          <rect
            id="Rectangle_1437"
            data-name="Rectangle 1437"
            width="19.922"
            height="19.932"
            opacity="0"
          />
          <path
            id="Path_1233"
            data-name="Path 1233"
            d="M9.961,19.922a10.035,10.035,0,0,0,9.961-9.961A10.037,10.037,0,0,0,9.951,0,10.026,10.026,0,0,0,0,9.961,10.041,10.041,0,0,0,9.961,19.922Zm-.01-1.484a8.354,8.354,0,0,1-6-2.51c1.055-1.66,3.35-2.637,6-2.637,2.627,0,4.941.957,6.006,2.637A8.376,8.376,0,0,1,9.951,18.438Zm0-6.807A3.482,3.482,0,0,1,6.6,7.949a3.487,3.487,0,0,1,3.35-3.613A3.487,3.487,0,0,1,13.3,7.949,3.453,3.453,0,0,1,9.951,11.631Z"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>

        <div class="align-items-start flex flex-column justify-content-start text-white">
          <div class="text-center font-medium text-xl mt-0">{{ fullname }}</div>
          <div class="align-items-center bg-black-alpha-10 border-round-3xl capitalize inline-flex line-height-2 px-1 text-xs border-1 border-white-alpha-20">
            <span
              v-if="items.length > 1"
              class="header-tier-progress-reached-icon mr-1 mt-1"
              v-html="
                items.find((itm) => {
                  return itm.name === active_tier;
                }).badge
              "
            ></span>
            <span class="mr-1" style="font-size:10px!important;">{{ active_tier }}</span>
          </div>
        </div>
        
      </div>

      <div class="flex justify-content-center align-items-center bg-black-alpha-10 text-center text-white ml-2 py-2 border-round">
        <div class="px-3">
          <div class="text-800 text-xs text-white-alpha-80">My Points</div>
          <div class="font-semibold text-sm">{{ earnings }}</div>
        </div>
        <div class="px-3">
          <div class="text-800 text-xs text-white-alpha-80">You are in</div>
          <div class="font-semibold text-sm">{{ progress }}%</div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-content-between py-4 tiers-progress capitalize">
      <div
        v-for="(tier, i) of items"
        :key="tier.id"
        class="inline-block tier-item"
        :style="{ width: tier.factor_rate + '%' }"
        :class="{
          'active-tier': tier.name === active_tier,
          'last-tier': i > items.length - 2 && i <= items.length - 1,
        }"
      >
        <div>
          <span class="select-none text-black-alpha-30 tier-badge mt-2"></span>
          <span
            class="-ml-2 align-items-center flex justify-content-start text-600"
            :class="{
              '': tier.name === active_tier,
              '-ml-4': i === (items.length - 2),
              '-ml-3': i === items.length - 1,
            }"
          >
            {{ tier.name }}
          </span>
        </div>
      </div>
      <div
        class="tier-progress-bar absolute bg-black-alpha-10 left-0 w-full z-1"
        style="top: 30px; height: 2px"
      >
        <div v-if="items.length > 1"
          class="tier-bg border-round-xl absolute left-0 top-0 z-2 progress-bar-tier-bg"
          :style="{ width: progress + '%' }"
          style="height:2px;transition: 1s all ease;"
          v-html="items.find((itm) => {
                return itm.name === active_tier;
              }).bg"
        ></div>
        <div
          class="tier-progress-reached"
          :style="{ width: progress + '%' }"
          style="height: 2px"
        >
          <span
            v-if="unlocked_items"
            class="tier-progress-reached-icon -mt-2 absolute"
            :style="{ left: progress + '%' }"
            v-html="
              unlocked_items.find((itm) => {
                return itm.name === active_tier;
              }).badge
            "
          ></span>
        </div>
      </div>
    </div>

    <PageContentGroup v-if="content_group" :group_id="content_group"  :override_styles="true" class="mb-3" />

    <div v-for="tier of items" :key="tier.id">
      <div
        class="bg-white border-round-top-xl overflow-hidden border-none font-medium relative capitalize tier-details"
        :class="{
          'border-round-bottom-xl mb-3': !tier.isOpen,
          'border-black-alpha-10 border-3 active-tier-scaled' : tier.name === active_tier,
          // 'tier-locked': !unlocked_items.includes(tier),
        }"
      >
        <div
          class="tier-bg border-round-xl absolute left-0 tier-bg top-0 z-0 w-full"
          v-html="tier.bg"
        ></div>
        <div
          class="align-items-center text-xl flex justify-content-between text-white relative z-2 py-3 px-3"
        >
          <div class="align-items-center flex justify-content-start mr-2 ">
            <span class="inline-flex mr-2 select-none" v-html="tier.badge"></span>
            <div class="select-none w-3" v-text="tier.name"></div>
          </div>
          
          <div v-if="tier.name === active_tier" class="w-3 flex align-items-center justify-content-start text-left text-sm">
            <span class="bg-black-alpha-10 py-1 px-2 border-round-3xl text-xs">Active</span>
          </div>

          <div
            class="flex align-items-center justify-content-center text-center relative text-white w-6 text-sm"
          >
            <div class="px-2 w-6">
              <span class="block font-light text-xs">Top</span>
              {{ tier.factor_rate }}%
            </div>

            <div class="px-2 w-6">
              <span class="block font-light text-xs">Commission</span>
              {{ tier.payout_rate }}%
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageContentGroup from "./PageContentGroup.vue";
export default {
  name: "PageTiers",
  props: {
    fullname: String,
    earnings: Number,
    max_points: Number,
    active_tier: String,
    progress: Number,
    img: String,
  },
  components:{
    PageContentGroup,
  },
  data() {
    return {
      items: [],
      animateProgress: 0,
      content_group: false,
    };
  },
  mounted() {
    this.getTiers();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    this.content_group = params.con ? params.con : false;
  },
  methods: {
    getTiers() {
      axios.get(`https://cms.nejree.com/items/tiers?sort=sort`).then((r) => {
        this.animateProgress = this.progress;
        this.items = r.data.data.map(({ ...rest }) => ({
          ...rest,
          isOpen: false,
        }));
        this.unlocked_items = this.items.filter((itm) => {
          return (
            itm.sort <=
            this.items.find((active) => {
              return active.name === this.active_tier;
            }).sort
          );
        });
      });
    },
  },
};
</script>
<style>
.header{
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.256)
}
.nejree-teirs .user-avatar{
  width:44px;
  height:44px;
  border:1px solid rgba(255, 255, 255, 0.353);
  box-shadow: 1px 1px 4px rgba(0,0,0,0.25);
  overflow: hidden;
  border-radius:100%;
  object-fit: contain;
}
.nejree-teirs .user-avatar img{
  width:calc(100% - 4px);
  height:calc(100% - 4px);
  margin:2px;
}
.nejree-teirs .tier-badge svg {
  /* transform: scale(.85); */
}
.nejree-teirs .active-tier .tier-badge {
  /* transform: scale(1.4); */
}
.nejree-teirs .tier-details{
  text-shadow:0 1px 2px rgba(0, 0, 0, 0.25)
}
.progress-bar-tier-bg svg{
    top: 0;
    position: absolute;
}
.active-tier-scaled{
  transform: scale(1.05);
}
.nejree-teirs .tiers-progress {
  position: relative;
}
.nejree-teirs .tiers-progress .tier-item {
  font-size: 8px;
  text-transform:capitalize;
}
.tiers-progress-badge {
  transform: scale(0.65);
  display: inline-block;
}
.nejree-teirs .tiers-progress .tier-badge {
  position: relative;
  z-index: 1;
  text-align: left;
  width: 1px;
  height: 10px;
  display: inline-block;
  background: rgb(0 0 0 / 20%);
  text-transform:capitalize;
}
.nejree-teirs .tier-bg svg {
  width: 100% !important;
  height: 100% !important;
}
.nejree-teirs .tier-bg svg rect {
  width: 100% !important;
  height: 100% !important;
}
.nejree-teirs .fill-current {
  fill: white;
}
.nejree-teirs .nejree-teirs {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
.nejree-teirs .tier-progress-reached-icon {
  margin-left: -7.5px;
  z-index: 2;
  position: relative;
}
.nejree-teirs .tier-progress-reached-icon svg {
  width: 15px;
  height: 15px;
}
.nejree-teirs .header-tier-progress-reached-icon svg {
  width: 12px;
  height: 12px;
}
.nejree-teirs .second-last-tier{
  margin-left: -17px!important;
}
.nejree-teirs .tier-locked:after {
  content: "Locked";
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: regular;
  padding-top: 20px;
  font-size: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5) no-repeat center 30px;
  background-image: url('data:image/svg+xml,<svg id="lock" xmlns="http://www.w3.org/2000/svg" width="13.953" height="20.577" viewBox="0 0 13.953 20.577"><rect id="Rectangle_1436" data-name="Rectangle 1436" width="13.953" height="20.577" opacity="0"/><path id="Path_1232" data-name="Path 1232" d="M2.3,20.045h9.353c1.5,0,2.3-.818,2.3-2.433V10.57c0-1.6-.8-2.423-2.3-2.423H2.3C.8,8.147,0,8.965,0,10.57v7.043C0,19.228.8,20.045,2.3,20.045ZM2.351,18.5c-.44,0-.7-.276-.7-.777V10.457c0-.5.256-.767.7-.767H11.6c.45,0,.7.266.7.767v7.268c0,.5-.245.777-.7.777ZM1.789,8.934H3.414V5.489c0-2.586,1.646-3.946,3.557-3.946s3.578,1.36,3.578,3.946V8.934h1.615V5.7C12.164,1.86,9.65,0,6.971,0S1.789,1.86,1.789,5.7Z" fill="rgba(255,255,255,0.85)"/></svg>');
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
