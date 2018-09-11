<template>
    <div id="channel-placeholder">
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
                <div class="recomm" v-if="isShowRecommend">
                    <img src="../../styles/images/v3icon/recom@3x.png">
                    <marquee>
                        <li v-for="item in recommendList" :key="item.prdName">
                            <a href="javascript:;">
                                <div class="left">
                                    <p>{{item.prdTitle}}</p>
                                     <div class="price">￥<span>{{item.prdTuniuPrice}}</span>起</div>
                                </div>
                                <div class="right"><li></li></div>
                            </a> 
                        </li>                   
                    </marquee>
                </div>
                <activity-new :activity-list="activityList" v-if="!!activityList"></activity-new>
                <div class="select-scenic" v-if="hotScenic && isChina">
                    <span class="o-title">精选人气景点</span>
                    <selected :hot-scenic="hotScenic" :is-app="isApp"></selected>
                </div>
                <div class="hot-scenic-new">
                    <div class="bar-top clearfix">
                        <div class="title"><span>上海精选</span></div>
                        <a class="all">全部景点</a>
                    </div>
                    <div class="search-list-inner">
                        <section class="search-list-container">
                            <hot-scenic :list="result"
                                        :is-app="isApp"
                                        :list-loading='listLoading'
                                        :no-result="noResult"
                            ></hot-scenic>
                        </section>
                    </div>
                    <div v-if="noResult" class="no-result">暂无景点</div>
                    <div class="check-more">
                        <a :href="currentCity | moreScenic(isApp)" class="check-more-link">查看更多</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import bus from '../../bus';
import cache from "../../lib/cache";
import { checkStatus, parseJSON, exHandler } from "../../util/fetch";
import GPS from "../../util/gps";
import { query } from "../../util/stringify";
import BI from "../../util/BI";
import Toast from "../vue-components/components/toast/index";

import Emitter from "../../mixins/emitter";
import MHeader from "../common/Header.vue";
import Loading from "../common/Loading.vue";
import wrapper from "../vue-components/components/wrapper/index.vue";
import CityPicker from "../vue-components/city-picker/index.vue";
import SearchPanel from "../common/SearchPanel.vue";
import SwipeLazy from "../vue-components/components/swipe-lazy/index.vue";
import Marquee from "../common/Marquee.vue"
import ActivityNew from './ActivityNew.vue';
import selected from './Selected.vue';
import HotScenic from './HotScenic.vue'

const DEST_DATA = "TICKET_DEST_DATA";
const DEST_FOREIGN_DATA = "TICKET_DEST_FOREIGN_DATA";
const HISTORY_CITY_ONLOCAL = "TICKET_HISTORY_CITY_ONLOCAL";
const SELECTED_CITY = "TICKET_SELECTED_CITY";
const CITY_SWITCH_TS = "TICKET_CITY_SWITCH_TS";
const MAX_HISTORY_CITIES_NUM = 10;
const EXPIRED = 3 * 60 * 60 * 1000;
import DOMESTIC_CITIES from "../../cached-data/domestic-cities";
import FOREIGN_CITIES from "../../cached-data/foreign-cities";


const PAGE_SIZE = 11;

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
    "Loading": Loading,
    "wrapper": wrapper,
    "city-picker": CityPicker,
    "search-panel": SearchPanel,
    "swipe-lazy": SwipeLazy,
    'marquee':Marquee,
    'activity-new':ActivityNew,
    'selected':selected,
    'hot-scenic':HotScenic
  },
  data: function() {
    return {
      //   控制加载页面显示
      loading: false,
      listLoading: true,
      adList: [],
      hotThemes: null,
      activityList: null,
      hotScenic: null,
      recommendList: [],
      BI: BI,

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
      isShowCityPicker: false,
      isShowChannel: true,
      domesticCities: Object.freeze(DOMESTIC_CITIES),
      overseaCities: Object.freeze(FOREIGN_CITIES),
      historyCities: cache.store.get(HISTORY_CITY_ONLOCAL) || [],
      cityPickerInit: true,
      desData: null,

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
    let self = this;
    this.$nextTick(function() {
      let city = cache.store.get(SELECTED_CITY);
      let name = self.currentCity.name || (city && city.name) || "上海";
      let code = self.currentCity.code || (city && city.code) || 2500;

      self.getTicketInfo({
        name: name,
        code: code
      });
      self.getCurrentPosition(name, code);
    
    });
  },
  computed:{
      isShowRecommend(){
          return this.recommendList.length > 0
      }
  },

  methods: {
    getTicketInfo(city) {
      const self = this;
      if (city) {
        this.currentCity.code = city.code;
        this.currentCity.name = city.name;
      }
      this.loading = true;
      fetch(GDATA.urls.getCmsTicketChannelInfoAjax +
          query({
            cityCode: this.currentCity.code,
            isNearby: 0,
            internalFlag: this.isChina * 1,
            countryCode: city.countryCode || 0,
            keyword: this.currentCity.name
          })
      )
        .then(checkStatus)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (!json) throw new Error("请求错误！");
          if (
            Object.prototype.toString.call(json) === "[object Arrar]" &&
            json.length == 0
          ) {
            self.loading = false;
            self.adList = [];
            self.recommendList = [];
            self.isShowSwipe = false;
            return;
          }
          self.handleTicketInfo(json);
        })
        .catch(exHandler);
    },
    handleTicketInfo({adList,popList,activityList,recommendList}) {
        this.loading = false;
        this.adList = adList;
        this.hotScenic = popList;
        this.activityList = activityList;
        this.recommendList = recommendList;
        this.isShowSwipe = Object.prototype.toString.call(adList) === '[object Array]' && adList.length > 0 ? true : false;
        setTimeout(()=>{
            bus.$emit('swipeLazy','');
        },0)
        
    },
    getGpsCityByCode(citiesObj, code){
        var gpsCity = null;
        for(var key in citiesObj){
            var cities = citiesObj[key];
            for(var i = 0, len = cities.length; i < len; i++){
                if(code = cities[i].code){
                    gpsCity = cities[i];
                    break
                }
            }
        }
        return gpsCity
    },
    getCurrentPosition(initName,initCode){
        const self = this; 
        window.setTimeout(function(){
            try{
                GPS.getAutoGPS(function({name, letter, code, lat ='', lng = ''}){
                    var gpsCity = self.getGpsCityByCode(self.domesticCities,code) || self.getGpsCityByCode(self.overseaCities, code);
                    self.geoCity={
                        name: name,
                        letter: letter,
                        code: code,
                        lat: lat,
                        lng: lng,
                        isChina: gpsCity.isChina
                    };
                    console.log(11)
                    self.getHotTicketInfo(initName, initCode);
                    if(code == self.currentCity.code) return;
                     let curTimestamp = +(new Data),
                        lastTimestamp = cache.store.get(CITY_SWITCH_TS);
                    // 用户选择间隔小于3小时,不提示
                    if(lastTimestamp && (curTimestamp - lastTimestamp < EXPIRED)) return;
                    
                })

            } catch(e){
                self.getHotTicketInfo(initName, initCode);

            }
        },0)
    },
    getHotTicketInfo(name, code){
        const self = this;
        let location =`[${self.geoCity.lat},${self.geoCity.lng}]`;
        if(self.geoCity.lng == "" && self.geoCity.lat == ""){
            location = '[]';
        }
        let queryObj = {
            d: `{"page":${this.page},"limit":${PAGE_SIZE},"keyword":"${name}","location":${location},"showNear":1}`,
            c:`{"cc":${code}}`
        };
        fetch(GDATA.urls.searchInfoAjax + query(queryObj))
            .then(checkStatus)
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                if(!json.success){
                    self.noResult = true;
                    throw new Error(json.msg || '请求失败')
                }
                self.noResult = json.data.list.length === 0 ? true : false;

                if(json.data.list.length <= 10){
                    self.isShowMore = false
                } else {
                    self.isShowMore = true
                    json.data.list.pop()
                }

                if(json.data.list.length){
                    self.result = [json.data.list]
                } else {
                    self.result = []
                }

                self.listLoading = false
            })
            .catch(exHandler)
    },
    citySelect(data){
        if(!data.code) return ;
        let historyCities = cache.store.get(HISTORY_CITY_ONLOCAL) || [];
        for(var i = 0,len = historyCities.length; i < len; i++){
            if(historyCities[i].code === data.code){
                historyCities.splice(i, 1);
                break
            }
        }
        historyCities.unshift(data)
        if(historyCities.length > MAX_HISTORY_CITIES_NUM){
            historyCities.pop()
        }
         cache.store.put(HISTORY_CITY_ONLOCAL,historyCities);
         cache.store.put(SELECTED_CITY,data)

         this.isChina = data.isChina;
         this.getTicketInfo(data);

         this.getHotTicketInfo(data.name, data.code)

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
.recomm{
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 0 20px;
    background: #fff;
    display: flex;
    align-items:center;
    color: #a5a5a5;
    overflow: hidden;
    img{
        width: 160px;
        height: 30px;
        margin-right: 15px;
    }
    li{
        a{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            position: relative;
            .left{
                flex: 1;
                display: flex;
                p{
                    color: #051b28;
                    font-size: 28px;
                }
                .price{
                    color:#f60;
                    margin-left: 5px;
                    span{
                        font-size: 40px;
                    }
                }
            }
            .right{
                width: 16px;
                height: 16px;
                border-right: 1px solid #a5a5a5;
                border-bottom: 1px solid #a5a5a5;
                transform: rotate(-45deg);               
            }
        }
    }
}
.select-scenic{
    background: #fff;
    width: 100%;  
    text-align: center;
    .o-title{
        font-size: 32px;
        font-weight: bold;
        color: #222;
        position: relative;
        height: 100px;
        line-height:100px;
        &:before{
            content: '';
            display: block;
            position: absolute;
            width: 20px;
            height: 1px;
            border-bottom: 1px solid #222;
            top: 50%;
            left: -30px;
        }
        &:after{
            content: '';
            display: block;
            position: absolute;
            width: 20px;
            border-bottom: 1px solid #222;
            top: 50%;
            right: -30px;
        }
    }   
}
.hot-scenic-new{
    width: 100%;
    padding-top: 50px;
    background:#fff;
    margin-top: 20px;
}
.bar-top{
    text-align: center;
    position: relative;
    .title{
        font-size: 32px;
        font-weight: bold;
        color: #222;
        text-align: center;
        span{
            position: relative;
            &:before{
            content: '';
            display: block;
            position: absolute;
            width: 20px;
            height: 1px;
            border-bottom: 1px solid #222;
            top: 50%;
            left: -30px;
            }
            &:after{
                content: '';
                display: block;
                position: absolute;
                width: 20px;
                border-bottom: 1px solid #222;
                top: 50%;
                right:-30px;
            }
        }      
    }
    .all{
        position: absolute;
        color:#33bd61;
        right: 24px;
        font-size: 28px;
        top: 0;
    }
}
.search-list-inner{
    background: #fff;
    
}
.check-more{
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    a{
        color: #33bd61;
        font-size: 26px
    }
}
.no-result {
    font-size: 28px; /*px*/
    width: 100%;
    margin-bottom: 20px;
    color: #bbb;
    text-align: center;
}

</style>
