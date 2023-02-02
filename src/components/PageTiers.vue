<template>
  <div
    class="nejree-teirs pb-4 select-none relative"
    style="direction: ltr"
    v-if="!loading"
  >
    <div class="top-0 z-4 sticky w-full">
      <div
        class="tier-bg tier-bg-profile-summary absolute left-0 tier-bg top-0 z-0 w-full shadow-2 overflow-hidden"
        style="height: 210px"
        v-html="
          items.find((itm) => {
            return itm.name === active_tier;
          }).bg
        "
      ></div>

      <div
        class="relative z-1 header flex justify-content-between align-items-center pt-8 px-3"
      >
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
            class="ml-2 mr-4"
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

          <div
            class="align-items-start flex flex-column justify-content-start text-white"
          >
            <div class="text-center font-medium text-xl mt-0">
              {{ fullname }}
            </div>
            <div
              class="align-items-center bg-black bg-black-alpha-70 border-round-3xl border-white-alpha-20 capitalize inline-flex line-height-2 px-1 text-xs"
            >
              <span
                v-if="items.length > 1"
                class="header-tier-progress-reached-icon mr-1 mt-1"
                v-html="
                  items.find((itm) => {
                    return itm.name === active_tier;
                  }).badge
                "
              ></span>
              <span class="mr-1" style="font-size: 10px !important">{{
                active_tier
              }}</span>
            </div>
          </div>
        </div>

        <a
          class="align-items-center bg-black-alpha-30 border-round-xl flex justify-content-center ml-2 no-underline pr-1 py-2 text-center text-white"
          href="CMSCALLBACK://points-earned"
        >
          <div class="px-3">
            <div class="text-800 text-xs text-white-alpha-80">
              <span v-if="lang == 'ar'" class="block mb-2">نقاطي</span>
              <span v-else>My Points</span>
            </div>
            <div class="font-semibold text-sm">{{ earnings }}</div>
          </div>
          <div class="pr-3">
            <div class="text-800 text-xs text-white-alpha-80">
              <span v-if="lang == 'ar'" class="block mb-2">مجموع منشئي %</span>
              <span v-else>You are in</span>
            </div>
            <div class="font-semibold text-sm">{{ progress }}%</div>
          </div>
          <div class="mr-2 mt-2 icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="max-width: 8px"
              width="9.872"
              height="15.157"
              viewBox="0 0 9.872 15.157"
            >
              <g
                id="Group_2809"
                data-name="Group 2809"
                transform="translate(-1275.706 1604.872) rotate(-90)"
              >
                <g
                  id="Path_1240"
                  data-name="Path 1240"
                  transform="matrix(0.966, 0.259, -0.259, 0.966, 1591.867, 1276.012)"
                  fill="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M.2.888A3.05,3.05,0,0,1,3.308.169a3.988,3.988,0,0,1,1.4.874C6.031,2.308,7.3,3.628,8.589,4.926c.1.1.211.2.357.336.334.386.209.644-.075.955a2.866,2.866,0,0,1-2.015.914,3.133,3.133,0,0,1-2.464-.983C3.127,4.868,1.952,3.665.687,2.383.51,2.171.43,2.106.2,1.827A.66.66,0,0,1,.2.888Z"
                    stroke="none"
                  />
                  <path
                    d="M 2.345904350280762 3.814697265625e-06 C 1.579185009002686 3.814697265625e-06 0.8637275695800781 0.3266901969909668 0.1994571685791016 0.888338565826416 C -0.1421527862548828 1.224498748779297 0.02148723602294922 1.589598655700684 0.1994571685791016 1.826568603515625 C 0.4303073883056641 2.10624885559082 0.510167121887207 2.171308517456055 0.687347412109375 2.383138656616211 C 1.952147483825684 3.664628744125366 3.127387523651123 4.868398666381836 4.393047332763672 6.148828506469727 C 5.073047637939453 6.83690881729126 5.880159378051758 7.171238422393799 6.856667518615723 7.131818771362305 C 7.667547225952148 7.099228858947754 8.078287124633789 6.888118743896484 8.871597290039062 6.21747875213623 C 9.154757499694824 5.905958652496338 9.280067443847656 5.648428916931152 8.9461669921875 5.262138366699219 C 8.799607276916504 5.124598503112793 8.69086742401123 5.028448581695557 8.588797569274902 4.925658702850342 C 7.299367427825928 3.627588510513306 6.030677318572998 2.307928562164307 4.710467338562012 1.042098522186279 C 4.319417476654053 0.6670784950256348 3.817667484283447 0.3457088470458984 3.307957172393799 0.1685686111450195 C 2.978656768798828 0.05410909652709961 2.658110618591309 3.814697265625e-06 2.345904350280762 3.814697265625e-06 M 2.345907211303711 -0.2499914169311523 C 2.690497398376465 -0.2499914169311523 3.041797161102295 -0.1886215209960938 3.390037536621094 -0.06757116317749023 C 3.920507431030273 0.1167788505554199 4.450907230377197 0.4467887878417969 4.883507251739502 0.8616585731506348 C 5.827897071838379 1.767158508300781 6.760097503662109 2.714438438415527 7.661607265472412 3.630538702011108 C 8.023137092590332 3.997918605804443 8.396977424621582 4.377818584442139 8.766167640686035 4.749468803405762 C 8.83023738861084 4.814008712768555 8.899627685546875 4.878098487854004 8.97996711730957 4.952308654785156 C 9.02222728729248 4.991338729858398 9.067586898803711 5.033238410949707 9.117247581481934 5.079838752746582 C 9.123587608337402 5.085788726806641 9.129617691040039 5.092068672180176 9.135307312011719 5.098648548126221 C 9.603957176208496 5.640838623046875 9.35850715637207 6.053488731384277 9.056597709655762 6.38563871383667 C 9.049237251281738 6.393728733062744 9.041347503662109 6.401338577270508 9.032997131347656 6.408398628234863 C 8.256876945495605 7.064508438110352 7.784337043762207 7.344738483428955 6.866707324981689 7.381618499755859 C 5.825446605682373 7.423527240753174 4.959632873535156 7.077810764312744 4.215227127075195 6.324558734893799 C 3.539707183837891 5.641148567199707 2.878357410430908 4.967788696289062 2.238787174224854 4.316608428955078 C 1.669637203216553 3.737118721008301 1.09926700592041 3.156388521194458 0.5094175338745117 2.558748722076416 C 0.5045976638793945 2.553868770599365 0.4999876022338867 2.548798561096191 0.4955873489379883 2.543538570404053 C 0.4195871353149414 2.452678680419922 0.3617973327636719 2.389488697052002 0.3006076812744141 2.322598457336426 C 0.2243375778198242 2.239218711853027 0.1378974914550781 2.144718647003174 0.006657600402832031 1.985708713531494 C 0.004217147827148438 1.982758522033691 0.001847267150878906 1.979758739471436 -0.0004425048828125 1.976698398590088 C -0.3414230346679688 1.522678852081299 -0.3324728012084961 1.061038494110107 0.02410697937011719 0.710148811340332 C 0.02858734130859375 0.7057385444641113 0.03323745727539062 0.7014884948730469 0.03804779052734375 0.6974287033081055 C 0.7815675735473633 0.06876850128173828 1.558047294616699 -0.2499914169311523 2.345907211303711 -0.2499914169311523 Z"
                    stroke="none"
                    fill="rgba(0,0,0,0.2)"
                  />
                </g>
                <g
                  id="Path_1241"
                  data-name="Path 1241"
                  transform="matrix(-0.966, 0.259, -0.259, -0.966, 1604.566, 1282.904)"
                  fill="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M.2,6.247a3.05,3.05,0,0,0,3.108.72,3.988,3.988,0,0,0,1.4-.874C6.031,4.827,7.3,3.507,8.589,2.209c.1-.1.211-.2.357-.336.334-.386.209-.644-.075-.955A2.866,2.866,0,0,0,6.857,0,3.133,3.133,0,0,0,4.393.986C3.127,2.267,1.952,3.47.687,4.752.51,4.964.43,5.029.2,5.308A.66.66,0,0,0,.2,6.247Z"
                    stroke="none"
                  />
                  <path
                    d="M 2.345903873443604 7.134931564331055 C 2.658109903335571 7.13495397567749 2.978656053543091 7.080826282501221 3.307956457138062 6.966366767883301 C 3.817666292190552 6.78922700881958 4.319416522979736 6.467846870422363 4.710466384887695 6.092836856842041 C 6.030676364898682 4.827006816864014 7.299366474151611 3.507347106933594 8.588796615600586 2.20928692817688 C 8.690866470336914 2.106487035751343 8.799606323242188 2.010336875915527 8.946166038513184 1.872797012329102 C 9.28006649017334 1.486506938934326 9.154756546020508 1.228976964950562 8.871596336364746 0.9174569845199585 C 8.078286170959473 0.2468169927597046 7.667546272277832 0.03570698946714401 6.856666564941406 0.003126987721771002 C 5.88014554977417 -0.03630329668521881 5.073046207427979 0.2980272769927979 4.393046379089355 0.9861069917678833 C 3.127386331558228 2.266536951065063 1.952146410942078 3.470306873321533 0.6873463988304138 4.751797199249268 C 0.510166347026825 4.963626861572266 0.4303063750267029 5.028687000274658 0.1994663774967194 5.308366775512695 C 0.02148637548089027 5.545337200164795 -0.1421536207199097 5.910437107086182 0.1994663774967194 6.246596813201904 C 0.8637299537658691 6.808245182037354 1.579185009002686 7.13487720489502 2.345903873443604 7.134931564331055 M 2.346166372299194 7.384926795959473 L 2.346166372299194 7.134926795959473 L 2.346086263656616 7.384926795959473 C 2.346076488494873 7.384926795959473 2.345896482467651 7.384926795959473 2.345886468887329 7.384926795959473 C 1.557976365089417 7.38487720489502 0.781506359577179 7.066116809844971 0.03804637491703033 6.437507152557373 C 0.03324637562036514 6.433446884155273 0.02860637567937374 6.429206848144531 0.02411637455224991 6.424787044525146 C -0.3324836194515228 6.073896884918213 -0.3414236307144165 5.612246990203857 -0.0004336248675826937 5.15822696685791 C 0.001866375096142292 5.155177116394043 0.00422637490555644 5.152176856994629 0.006656375247985125 5.149227142333984 C 0.1379163712263107 4.990207195281982 0.2243563681840897 4.895697116851807 0.3006263673305511 4.81231689453125 C 0.3618063628673553 4.745427131652832 0.4195963740348816 4.682247161865234 0.4955863654613495 4.591396808624268 C 0.4999863803386688 4.586136817932129 0.5045963525772095 4.581067085266113 0.509416401386261 4.576187133789062 C 1.099266409873962 3.978547096252441 1.669636368751526 3.397816896438599 2.238786458969116 2.818326950073242 C 2.878356456756592 2.167146921157837 3.539706468582153 1.493786931037903 4.215246200561523 0.8103569746017456 C 4.95962381362915 0.05714345350861549 5.824551105499268 -0.2885881960391998 6.866746425628662 -0.2466730177402496 C 7.784336566925049 -0.2098030149936676 8.256866455078125 0.07042698562145233 9.03299617767334 0.7265369892120361 C 9.041346549987793 0.7335969805717468 9.049236297607422 0.7412070035934448 9.056596755981445 0.7492969632148743 C 9.358506202697754 1.081447005271912 9.60395622253418 1.494096994400024 9.135306358337402 2.036287069320679 C 9.129616737365723 2.042866945266724 9.123586654663086 2.049146890640259 9.117246627807617 2.055097103118896 C 9.06761646270752 2.101676940917969 9.022275924682617 2.143557071685791 8.980036735534668 2.18256688117981 C 8.899676322937012 2.256797075271606 8.830265998840332 2.3209068775177 8.766206741333008 2.38543701171875 C 8.396916389465332 2.757186889648438 8.023015975952148 3.137146949768066 7.661416530609131 3.504586935043335 C 6.759976387023926 4.42061710357666 5.827836513519287 5.367836952209473 4.883486270904541 6.273286819458008 C 4.450886249542236 6.688147068023682 3.920486450195312 7.018157005310059 3.390026330947876 7.202517032623291 C 3.041796445846558 7.323556900024414 2.69058632850647 7.384926795959473 2.346166372299194 7.384926795959473 Z"
                    stroke="none"
                    fill="rgba(0,0,0,0.16)"
                  />
                </g>
              </g>
            </svg>
          </div>
        </a>
      </div>

      <div
        class="flex flex-wrap justify-content-between py-4 -mt-4 tiers-progress capitalize mx-3"
      >
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
            <span
              class="select-none text-white-alpha-30 tier-badge mt-2 bg-white-alpha-10"
            ></span>
            <span
              class="-ml-2 align-items-center flex justify-content-start text-white-alpha-70"
              :class="{
                '': tier.name === active_tier,
                '-ml-4': i === items.length - 2,
                '-ml-3': i === items.length - 1,
              }"
            >
              <span v-if="lang == 'ar'">{{ tier.name_ar }}</span>
              <span v-else>{{ tier.name }}</span>
            </span>
          </div>
        </div>
        <div
          class="tier-progress-bar absolute border-round-xl bg-white-alpha-20 left-0 w-full z-1"
          style="top: 30px; height: 4px"
        >
          <div
            v-if="items.length > 1"
            class="tier-bg border-round-xl absolute left-0 top-0 z-1 progress-bar-tier-bg bg-white"
            :style="{ width: progress + '%' }"
            style="height: 4px; transition: 1s all ease"
          ></div>
          <div
            class="tier-progress-reached"
            :style="{ width: progress + '%' }"
            style="height: 4px"
          >
            <span
              v-if="unlocked_items"
              class="tier-progress-reached-icon -mt-2 absolute"
              style="padding-top: 1px"
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
    </div>

    <PageContentGroup
      v-if="content_group"
      :group_id="content_group"
      :override_styles="true"
      :lang="lang"
      class="my-3 mx-3"
    />

    <div
      v-for="tier of items"
      :key="tier.id"
      :class="{ ar: lang == 'ar' }"
      class="mx-3"
    >
      <div
        class="bg-white border-round-top-xl overflow-hidden border-none font-medium relative capitalize tier-details"
        :class="{
          'border-round-bottom-xl mb-3': !tier.isOpen,
          'border-black-alpha-10 border-3 active-tier-scaled':
            tier.name === active_tier,
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
          <div
            class="align-items-center flex justify-content-start"
            :class="{ 'mr-2': lang != 'ar', 'ml-2': lang === 'ar' }"
          >
            <span
              class="inline-flex select-none"
              :class="{ 'mr-2': lang != 'ar', 'ml-2': lang === 'ar' }"
              v-html="tier.badge"
            ></span>
            <div class="select-none w-3">
              <span v-if="lang == 'ar'">{{ tier.name_ar }}</span>
              <span v-else>{{ tier.name }}</span>
            </div>
          </div>

          <div
            v-if="tier.name === active_tier"
            class="w-3 flex align-items-center justify-content-start text-left text-sm"
          >
            <span
              class="block bg-black-alpha-10 py-1 px-2 border-round-3xl"
              style="font-size: 8px"
              v-if="lang == 'ar'"
              >نشطة</span
            ><span
              class="block bg-black-alpha-10 py-1 px-2 border-round-3xl"
              style="font-size: 8px"
              v-else
              >Active</span
            >
          </div>
          <div
            v-else
            class="w-3 flex align-items-center justify-content-start text-left text-sm"
          >
            <span class="block py-1 px-2">&nbsp;</span>
          </div>

          <div
            class="flex align-items-center justify-content-end text-center relative text-white w-7 text-sm"
          >
            <div class="px-2 text-center">
              <span class="block font-light text-xs mb-1" v-if="lang == 'ar'"
                >مجموع منشئي %</span
              >
              <span class="block font-light text-xs" v-else>Top</span>
              {{ tier.factor_rate }}%
            </div>

            <div class="px-2 text-center">
              <span class="block font-light text-xs mb-1" v-if="lang == 'ar'"
                >العمولة</span
              >
              <span class="block font-light text-xs" v-else>Commission</span>
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
    lang: String,
  },
  components: {
    PageContentGroup,
  },
  data() {
    return {
      loading: true,
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
        this.loading = false;
      });
    },
  },
};
</script>
<style>
.header {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.256);
}
.nejree-teirs .user-avatar {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.353);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 100%;
  object-fit: contain;
}
.nejree-teirs .user-avatar img {
  width: calc(100%);
  height: calc(100%);
  object-fit: cover;
}
.nejree-teirs .tier-badge svg {
  /* transform: scale(.85); */
}
.nejree-teirs .active-tier .tier-badge {
  /* transform: scale(1.4); */
}
.nejree-teirs .tier-details {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
.progress-bar-tier-bg svg {
  top: 0;
  position: absolute;
}
.active-tier-scaled {
  transform: scale(1.05);
}
.nejree-teirs .tiers-progress {
  position: relative;
}
.nejree-teirs .tiers-progress .tier-item {
  font-size: 8px;
  text-transform: capitalize;
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
  /* background: rgb(0 0 0 / 20%); */
  text-transform: capitalize;
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
.nejree-teirs .tier-progress-reached-icon:before {
  position: absolute;
  content: " ";
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  margin-top: -5px;
  margin-left: -5px;
  border-radius: 100%;
  z-index: -1;
  box-shadow: 0 0 9px rgb(0 0 0 / 70%);
}
.nejree-teirs .header-tier-progress-reached-icon svg {
  width: 12px;
  height: 12px;
}
.nejree-teirs .second-last-tier {
  margin-left: -17px !important;
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
.tier-bg-profile-summary:after {
  content: " ";
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 1;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  background: -moz-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 120%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 120%
  );
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 120%
  );
}
</style>
