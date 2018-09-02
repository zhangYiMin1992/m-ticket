<template>
    <div>
        <m-header :title="'景点门票'" :type="''" v-if="!isApp" :is-app="isApp"></m-header>
        <Loading v-show="loading"></Loading>
        <wrapper :wid="'CITY_PICKER'">
            <city-picker></city-picker>
        </wrapper>
        <search-panel></search-panel>
        <div calss="channel-container" id="main-container">
            <div class="search-channel-v2">
                <div class="scv2-box">
                    <span class="destination">上海<i></i></span>  
                    <div class="search-input-ctn">
                        <i class="icon-search5 search_btn"></i>
                        <p class="search-channel-box">搜索目的地/主题/关键字</p>
                    </div> 
                </div>
            </div>
            <div class="content-container">
                <swipe-lazy :ad-list="adList"></swipe-lazy>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
// import cache from '../../lib/catch'
import {query} from '../../until/stringify';
import {checkStatus, parseJSON, exHandler} from '../../until/fetch';
import Toast from '../vue-components/components/toast/index';

import Emitter from "../../mixins/emitter";
import MHeader from "../common/Header.vue";
import Loading from "../common/Loading.vue";
import wrapper from "../vue-components/components/wrapper/index.vue";
import CityPicker from "../vue-components/city-picker/index.vue";
import SearchPanel from "../common/SearchPanel.vue";
import SwipeLazy from "../vue-components/components/swipe-lazy/index.vue";
window.Event = new Vue();
export default {
  name: "Channel",
  componentName: "Channel",
  props: {
    isApp: {
      type: Boolean,
      default: false
    },
    currentCity: {
      type: Object,
      default() {
        return {
          name: "",
          code: 0
        };
      }
    }
  },
  components: {
    "m-header": MHeader,
    Loading: Loading,
    wrapper: wrapper,
    "city-picker": CityPicker,
    "search-panel": SearchPanel,
    "swipe-lazy": SwipeLazy
  },
  data: function() {
    return {
      // loading: false,
      // adList: [
      //   {
      //     adAppLinkUrl: "https://m.tuniu.com/menpiao/t_1994829",
      //     adEventFlag: 0,
      //     adGaTrack: null,
      //     adImgUrl:
      //       "https://m3.tuniucdn.com/fb2/t1/G5/M00/D6/DA/Cii-s1t2bv2IIaRRAACM_8ctklEAAMLWAO0uiQAAI0X92_w755_h0_c0_t0.jpeg",
      //     adLinkUrl: "",
      //     adMLinkUrl: "",
      //     adMainTitle: "开学错峰",
      //     adSubTitle: "",
      //     adTagType: 0
      //   },
      //   {
      //     adAppLinkUrl: "https://m.tuniu.com/menpiao/t_16734",
      //     adEventFlag: 0,
      //     adGaTrack: null,
      //     adImgUrl:
      //       "https://m2.tuniucdn.com/fb2/t1/G5/M00/77/0B/Cii-s1tEa7-IQlmBAAKQNLqwpfQAAJ9QAP7RYQAApBM09_w755_h0_c0_t0.jpeg",
      //     adLinkUrl: "",
      //     adMLinkUrl: "",
      //     adMainTitle: "长隆欢乐世界",
      //     adSubTitle: "",
      //     adTagType: 0
      //   },
      //   {
      //     adAppLinkUrl: "https://m.tuniu.com/menpiao/t_16934",
      //     adEventFlag: 0,
      //     adGaTrack: null,
      //     adImgUrl:
      //       "https://m.tuniucdn.com/fb2/t1/G5/M00/30/15/Cii-slpPTQmINr4zAADbkH_rARYAABtvQCTK6YAANuo20_w755_h0_c0_t0.jpeg",
      //     adLinkUrl: "",
      //     adMLinkUrl: "",
      //     adMainTitle: "深圳欢乐谷",
      //     adSubTitle: "",
      //     adTagType: 0
      //   },
      //   {
      //     adAppLinkUrl: "https://m.tuniu.com/menpiao/t_37794",
      //     adEventFlag: 0,
      //     adGaTrack: null,
      //     adImgUrl:
      //       "https://m4.tuniucdn.com/fb2/t1/G5/M00/30/15/Cii-s1pPTQmIAyDvAADqXiZXwfwAABtvQCUB04AAOp240_w755_h0_c0_t0.jpeg",
      //     adLinkUrl: "",
      //     adMLinkUrl: "",
      //     adMainTitle: "深圳世界之窗",
      //     adSubTitle: "",
      //     adTagType: 0
      //   },
      //   {
      //     adAppLinkUrl: "https://m.tuniu.com/menpiao/t_1994828",
      //     adEventFlag: 0,
      //     adGaTrack: null,
      //     adImgUrl:
      //       "https://m3.tuniucdn.com/fb2/t1/G5/M00/2C/0C/Cii-tFsaEZKILkx5AAJzT0mSfA0AAILAQH-2BAAAnNn857_w755_h0_c0_t0.png",
      //     adLinkUrl: "",
      //     adMLinkUrl: "",
      //     adMainTitle: "美女与野兽",
      //     adSubTitle: "",
      //     adTagType: 0
      //   }
      // ]
      loading: false,
      listLoading: true,
      adList: [],
      hotThemes: null,
      activityList: null,
      hotScenic: null,
      recommendList: [],
      // BI: BI,

      /**
       * 地理位置
       * */
      geoCity: {
        name: "上海",
        letter: "sh", //url会用到
        code: 2500,
        lat: "", // GPS 纬度
        lng: "", // GPS 经度
        isChina: true
      },
      /**
       * City Picker 相关数据
       */
      // isShowCityPicker: false,
      // isShowChannel: true,
      // domesticCities: Object.freeze(DOMESTIC_CITIES),
      // overseaCities: Object.freeze(FOREIGN_CITIES),
      // historyCities: cache.store.get(HISTORY_CITY_ONLOCAL) || [],
      // cityPickerInit: true,
      // desData: null,

      /**
       * Search Panel 相关数据
       */
      result: [],
      noResult: false,
      page: 1,
      isChina: true,
      countryCode: 0,
      isShowMore: true,
      isShowSwipe: true
    };
  },
  mounted() {
    this.swipe();
    let self = this;
    this.$nextTick(function() {
      // let city = cache.store.get(SELECTED_CITY); // 先获取本地选择城市

      //let name = self.currentCity.name || (city && city.name) || __('上海')
      //let code = self.currentCity.code || (city && city.code) || 2500
      self.getTicketInfo({
        name: "上海",
        code: 2500
      });
    });
  },

  methods: {
    swipe: function() {
      this.$emit("init", "");
    },
    getTicketInfo(city) {
      const self = this;

      if (city) {
        this.currentCity.code = city.code;
        this.currentCity.name = city.name;
      }

      this.loading = false;

      fetch(
        GDATA.urls.getCmsTicketChannelInfoAjax +
          query({
            cityCode: this.currentCity.code,
            isNearby: 0,
            internalFlag: this.isChina * 1,
            countryCode: city.countryCode || 0
          })
      )
        .then(checkStatus)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (!json) throw new Error("请求错误!");
          if (
            Object.prototype.toString.call(json) === "[object Array]" &&
            json.length == 0
          ) {
            self.loading = false;
            self.adList = [];
            self.recommendList = [];
            self.isShowSwipe = false;
            //self.broadcastCus('SwipeLazy','DESTROYED');
            //self.broadcastCus('Marquee','DESTROYED');
            return;
          }
          self.handleTicketInfo(json);
        })
        .catch(exHandler);
    },
    andleTicketInfo({ adList }) {
      this.adList = adList;
    }
  }
};
</script>
<style scoped lang="scss">
/*flexible*/
$fontWhite: #fff;
$global_bg: #f0f0f0;
$gray_2: #222;
$gray_9: #999;
$gray_b: #bbb;
$gray_d: #ddd;
$gray_bg: #f8f9fc;
$priceOrange: #f60;
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  background-color: #edf0f5 !important;
  font-family: "Helvetica";
  font-size: 20px; /*px*/
}

a {
  color: #000;
  text-decoration: none;
}

ol,
ul,
li {
  list-style: none;
}

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

*,
*:before,
*:after {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*:focus {
  outline: none;
}

input::-moz-placeholder {
  font-size: 24px; /*px*/
  color: $gray_b;
}

input::-webkit-input-placeholder {
  font-size: 24px; /*px*/
  color: $gray_b;
}

input:-ms-input-placeholder {
  font-size: 24px; /*px*/
  color: $gray_b;
}

input {
  font-size: 24px; /*px*/
  color: $gray_9;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
.channel-container {
  width: 100%;
}
.search-channel-v2 {
  position: relative;
  width: 100%;
  padding: 18px 20px;
  box-sizing: border-box;
  background-color: #edf0f5;

  .scv2-box {
    background-color: $fontWhite;
    display: -webkit-box;
    padding: 0 20px;
    position: relative;
    .destination {
      position: relative;
      height: 70px;
      line-height: 70px;
      font-size: 26px;
      color: #666;
      padding: 3px 0;
      box-sizing: border-box;
      padding: 15px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: -10px;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: #a5a5a5;
        opacity: 0.5;
        transform: scale(0.5);
      }
      i {
        width: 10px;
        height: 10px;
        border-bottom: 1px solid #999;
        border-right: 1px solid #999;
        display: inline-block;
        transform: rotate(45deg);
        margin: 0 0 6px 14px;
      }
    }

    .search-input-ctn {
      position: relative;
      left: 20px;
      top: 0;
      height: 70px;
      line-height: 70px;
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      flex: 1;
      .search_btn {
        position: absolute;
        bottom: 0;
        top: 25px;
        margin: auto 0;
        color: #ccc;
        z-index: 2;
        font-size: 25px;
      }
      .search-channel-box {
        height: 50px;
        outline: none;
        color: #ccc;
        -webkit-appearance: none;
        display: inline-block;
        position: relative;
        line-height: 50px;
        margin-left: 40px;
        font-size: 24px;
      }
    }
  }
}
</style>
