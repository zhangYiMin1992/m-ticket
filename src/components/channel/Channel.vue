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
                <swipe-lazy></swipe-lazy>
            </div>
        </div>
    </div>
</template>
<script>
import Emitter from "../../mixins/emitter";

import MHeader from "../common/Header.vue";
import Loading from "../common/Loading.vue";
import wrapper from "../vue-components/components/wrapper/index.vue";
import CityPicker from "../vue-components/city-picker/index.vue";
import SearchPanel from "../common/SearchPanel.vue";
import SwipeLazy from '../vue-components/components/swipe-lazy/index.vue'
export default {
  name: "Channel",
  componentName: "Channel",
  components: {
    "m-header": MHeader,
    Loading: Loading,
    wrapper: wrapper,
    "city-picker": CityPicker,
    "search-panel": SearchPanel,
    'swipe-lazy': SwipeLazy
  },
  props: {
    isApp: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      loading: false
    };
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
      &:after {
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
