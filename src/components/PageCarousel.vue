<template lang="">
  <div class="nejree-fullpage-carousel select-none" style="direction:ltr;">
    <Carousel
      :value="items"
      :numVisible="1"
      :numScroll="1"
      :circular="true"
      :autoplayInterval="3500"
      :showNavigators="false"
      v-if="!loading"
    >
      <template #header>
        <div class="absolute car-item-icon-bg left-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="49"
            height="49"
            viewBox="0 0 49 49"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="0.59"
                y1="0.248"
                x2="-0.684"
                y2="1.354"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stop-color="#ffa31a" stop-opacity="0" />
                <stop offset="1" stop-color="#7f5a13" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-2"
                x1="0.334"
                x2="-0.684"
                y2="1.354"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stop-color="#ffa31a" stop-opacity="0.184" />
                <stop offset="1" stop-color="#7f5a13" stop-opacity="0.396" />
              </linearGradient>
            </defs>
            <g
              id="Group_2807"
              data-name="Group 2807"
              transform="translate(-170 -725.903)"
            >
              <g
                id="bg"
                transform="translate(170 725.903)"
                stroke="rgba(255,255,255,0.06)"
                stroke-width="1"
              >
                <rect width="49" height="49" rx="12" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="48"
                  height="48"
                  rx="11.5"
                  fill="none"
                />
              </g>
              <g
                id="bg-2"
                data-name="bg"
                transform="translate(170 725.903)"
                stroke="rgba(255,255,255,0.06)"
                stroke-width="1"
                fill="url(#linear-gradient)"
              >
                <rect width="49" height="49" rx="12" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="48"
                  height="48"
                  rx="11.5"
                  fill="none"
                />
              </g>
              <rect
                id="bg-3"
                data-name="bg"
                width="47"
                height="19"
                rx="9.5"
                transform="translate(218 744.903) rotate(180)"
                fill="url(#linear-gradient-2)"
              />
            </g>
          </svg>
        </div>
      </template>
      <template #item="car">
        <div class="car-item p-5">
          <div class="car-content text-center">
            <div class="car-image mx-auto my-5" v-html="car.data.icon"></div>
            <div class="text-center mb-4 car-details" v-if="lang == 'ar'">
              <h3 class="car-title">{{ car.data.title_ar }}</h3>
              <div class="car-subtitle" v-html="car.data.content_ar"></div>
            </div>
            <div class="text-center mb-4 car-details" v-else>
              <h3 class="car-title">{{ car.data.title }}</h3>
              <div class="car-subtitle" v-html="car.data.content"></div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script>
import axios from "axios";
import Carousel from "primevue/carousel";

export default {
  props: {
    id: String,
    lang: String,
  },
  components: {
    Carousel,
  },
  mounted() {
    this.getCarousel()
  },
  data() {
    return {
      loading: true,
      items: [],
      // slides: [
      //   {
      //     title: "Become a Creator",
      //     description:
      //       "Creating content as a creator on VEEDz is a great way to express yourself, showcase your skills and make a statement! <br/> With VEEDz, you can tell stories that inspire and engage, while earning rewards along the way. So get creative, and start creating today!",
      //     image: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
      //                   <g id="Group_2808" data-name="Group 2808" transform="translate(-8919 -2590)">
      //                       <g id="plus.app" transform="translate(8932.872 2603.905)">
      //                       <rect id="Rectangle_1385" data-name="Rectangle 1385" width="17.256" height="17.191" opacity="0"/>
      //                       <path id="Path_1114" data-name="Path 1114" d="M16.161,1.142c-.955-.953-2.3-1.1-3.9-1.1H4.969c-1.572,0-2.92.15-3.874,1.1S0,3.432,0,4.993v7.216c0,1.6.14,2.926,1.095,3.879s2.3,1.1,3.893,1.1h7.271c1.6,0,2.948-.15,3.9-1.1s1.095-2.281,1.095-3.879V5.021C17.256,3.423,17.116,2.086,16.161,1.142Zm-.412,3.617v7.7a3.609,3.609,0,0,1-.692,2.533,3.666,3.666,0,0,1-2.536.692H4.735a3.706,3.706,0,0,1-2.545-.692,3.653,3.653,0,0,1-.683-2.533V4.787A3.676,3.676,0,0,1,2.19,2.236a3.707,3.707,0,0,1,2.573-.692h7.758a3.666,3.666,0,0,1,2.536.692A3.6,3.6,0,0,1,15.749,4.759ZM4.3,8.6a.747.747,0,0,0,.8.766H7.851v2.757a.744.744,0,0,0,.767.794.756.756,0,0,0,.8-.794V9.367h2.761a.744.744,0,0,0,.8-.766.761.761,0,0,0-.8-.795H9.414V5.058a.763.763,0,0,0-.8-.8.747.747,0,0,0-.767.8V7.806H5.1A.758.758,0,0,0,4.3,8.6Z" transform="translate(0 0)"/>
      //                       </g>
      //                   </g>
      //               </svg>`,
      //   },
      //   {
      //     title: "Promote",
      //     description:
      //       "Crafting engaging videos can be a great way to engage your users and grow your following. Share your creativity with the world by creating short videos with VEEDZ. <br/> With the latest video editing tools, you can unlock the potential of video creation and make something truly special to share with your followers. Start creating today and watch your audience grow!",
      //     image: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
      //                   <g id="Group_2610" data-name="Group 2610" transform="translate(0.211 0)">
      //                       <g id="iphone.gen2.badge.play" transform="translate(17.221 14.138)">
      //                       <rect id="Rectangle_1394" data-name="Rectangle 1394" width="11.841" height="16.411" opacity="0"/>
      //                       <path id="Path_1214" data-name="Path 1214" d="M0,15.251a1.732,1.732,0,0,0,1.878,1.783H4.716a3.784,3.784,0,0,1-.559-1.1H2.023a.8.8,0,0,1-.911-.857V4.48a.8.8,0,0,1,.911-.857h.884c.11,0,.166.055.166.158v.158a.453.453,0,0,0,.476.48H5.33a.45.45,0,0,0,.476-.48V3.781c0-.1.055-.158.166-.158h.884a.8.8,0,0,1,.9.857l.007,5.581a3.838,3.838,0,0,1,.559-.041,4.875,4.875,0,0,1,.552.034V4.3A1.737,1.737,0,0,0,6.994,2.52H1.878A1.732,1.732,0,0,0,0,4.3Zm8.327,2.681a3.483,3.483,0,1,0-3.507-3.483A3.533,3.533,0,0,0,8.327,17.932Zm-1.132-2.1V13.057c0-.288.29-.4.539-.254L9.99,14.127a.344.344,0,0,1,.041.617l-2.3,1.344C7.484,16.239,7.194,16.122,7.194,15.834Z" transform="translate(0 -1.521)"/>
      //                       </g>
      //                   </g>
      //               </svg>`,
      //   },
      //   {
      //     title: "Earn",
      //     description:
      //       "Create content and engage with users on VEEDz to start earning points and cash rewards! Earn money from Veedz (short videos) when others make purchases through them. You earn a commission on each purchase made. Sign up today and start building your future.",
      //     image: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
      //                   <g id="Group_2610" data-name="Group 2610" transform="translate(0.211 0)">
      //                       <path id="Icon_awesome-coins" data-name="Icon awesome-coins" d="M0,10.928v1.151C0,13.031,2.319,13.8,5.177,13.8s5.177-.774,5.177-1.726V10.928a9.8,9.8,0,0,1-5.177,1.151A9.8,9.8,0,0,1,0,10.928ZM8.628,3.451c2.858,0,5.177-.774,5.177-1.726S11.486,0,8.628,0,3.451.774,3.451,1.726,5.77,3.451,8.628,3.451ZM0,8.1V9.491c0,.952,2.319,1.726,5.177,1.726s5.177-.774,5.177-1.726V8.1A8.683,8.683,0,0,1,5.177,9.491,8.683,8.683,0,0,1,0,8.1Zm11.216.3C12.761,8.1,13.8,7.541,13.8,6.9V5.751a6.621,6.621,0,0,1-2.588.93ZM5.177,4.314C2.319,4.314,0,5.279,0,6.471S2.319,8.628,5.177,8.628s5.177-.965,5.177-2.157S8.035,4.314,5.177,4.314Zm5.913,1.518c1.618-.291,2.715-.863,2.715-1.518V3.163A8.778,8.778,0,0,1,9.472,4.29,3.019,3.019,0,0,1,11.089,5.832Z" transform="translate(15.387 15.598)"/>
      //                   </g>
      //               </svg>`,
      //   },
      // ],
    };
  },
  methods: {
    getCarousel(){
      axios
        .get(`https://cms.nejree.com/items/icon_carousels/${this.id}`)
        .then((r) => {
          this.items = r.data.data.items.sort((a, b) => {return a.sort-b.sort})
          this.active_item = r.data.data.items[0];
          this.loading = false
        })
        .catch((e) => {
          this.loading = false
        })
    },
  },
};
</script>
<style>
.nejree-fullpage-carousel .p-component {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.nejree-fullpage-carousel .car-item-icon-bg {
  width: 100px;
  height: 100px;
  margin-top: 64px;
  margin-left: -50px;
}
.nejree-fullpage-carousel .car-item-icon-bg svg {
  width: 100%;
  height: 100%;
  animation: shadow-pulse 2s infinite;
  border-radius: 24px;
}
.nejree-fullpage-carousel .car-item .car-image svg {
  width: 100px;
  height: auto;
  margin: 0 auto;
  transform: scale(0);
  transition: all 0.5s 0.5s ease-in-out;
  opacity:0;
  fill: #fbad1b;
}
.nejree-fullpage-carousel .p-carousel-item-active .car-item .car-image svg {
  opacity:1;
  transform: scale(1);
}
.nejree-fullpage-carousel .p-carousel-indicator {
  border-radius: 20px;
  overflow: hidden;
  height: 4px;
  transition: all 0.15s ease-in-out;
}
.nejree-fullpage-carousel
  .p-carousel
  .p-carousel-indicators
  .p-carousel-indicator
  button {
  background-color: rgba(0, 0, 0, 0.103);
  width: 10px;
  transition: all 0.15s ease-in-out;
}
.nejree-fullpage-carousel
  .p-carousel
  .p-carousel-indicators
  .p-carousel-indicator.p-highlight
  button {
  background-color: black;
  width: 20px;
}

@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(251, 173, 27, 0.5);
  }
  100% {
    box-shadow: 0 0 0 35px rgba(251, 173, 27, 0);
  }
}

@keyframes shadow-pulse-big {
  0% {
    box-shadow: 0 0 20px 0px #fbad1b;
  }
  100% {
    box-shadow: 0 0 0 70px rgba(0, 0, 0, 0);
  }
}
</style>
