<template>
    <div class="search-panel" v-show="visible">
        <div class="search-float-layer">
            <i class="icon-search5 search_btn" style="color:#c2c6cc;"></i>
            <form class="search-form">
                <input v-model="searchKey" type="text" class="search-input" placeholder="搜索目的地/主题/关键字">
                <i class="icon-close clear-btn" @click="clearInput()"></i>
            </form>
            <span class="cancel" @click="cancel()">取消</span>
        </div>
        <div class="search-list-panel" v-show="!!searchKey.length">
            <ul class="result">
                <li v-for="item in suggestion" :key="item.keyId">
                    <template v-if="item.displayType === 1">
                        <a @click="handleResultClick(item)">
                            <i class="icon-city"></i>
                            <span class="scebic-name" v-html="highlight(item.keyName,searchKey)"></span>
                            <span class="show-more">查看所有景点</span>
                        </a>
                    </template>
                    <template v-else>
                        <a :href="isApp ? item.appUrl : item.mUrl" target="_self">
                            <i class="icon-scenic"></i>
                            <span v-html="highlight(item.keyName,searchKey)"></span>
                            <span class="show-more">{{item.keyCityName}}</span>
                        </a>
                    </template>
                </li> 
            </ul>
        </div>
        <div class="search-type" v-show="!searchKey.length">
            <div class="search-type-li">
                <div class="search-bar">
                    <p class="search-bar-title">热门目的地</p>
                    <div class="search-bar-icon" @click = "getHotKeywords()">
                        <i class="icon-refresh2"></i>
                        换一换
                    </div>
                </div>
                <div class="search-type-block">
                    <span v-for="item in hotSearch" :key="item" @click="search(item,'hot')">{{item}}</span>                
                </div>
            </div>
        </div>
        <div class="search-type" v-show="!searchKey.length">
            <div class="search-type-li">
                <div class="search-bar">
                    <p class="search-bar-title">历史记录</p>
                    <div class="search-bar-icon" @click="clearHistory()">
                        <i class="icon-delete2"></i>
                        清除
                    </div>
                </div>
                <div class="search-type-block">
                    <span v-for="(item,index) in historySearch" :key="index" @click="search(item)">{{item}}</span>          
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {checkStatus, parseJSON, exHandler} from '../../util/fetch'
import {highlight} from '../../filters/decorator'
import {getHotKeywords} from '../../util/hot-search'
import cache from "../../lib/cache";
import bus from '../../bus';

const CURRENT_HOT_SEARCH = 'TICKET_CURRENT_HOT_SEARCH'
const HISTORY_SEARCH = 'TICKET_HISTORY_SEARCH'
const MAX_HISTORY_SEARCH_NUM = 10
const axios = require('axios')
export default {
    props: {
        isApp:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            isListShow: false,
            searchKey:'',
            suggestion: [],
            hotSearch: getHotKeywords(),
            historySearch: cache.store.get(HISTORY_SEARCH) || [],
            currentHotSearch: cache.store.get(CURRENT_HOT_SEARCH) || '',
            visible:false
        };
    },
    mounted(){
        bus.$on('showSearchPage',()=>{
            this.visible = true
        })
    },
    watch:{
        searchKey:function(val, oldVal){
            if(!val){
                return
            }
            var self = this;
            axios.get(GDATA.urls.suggestionAjax,{
                params:{
                    cityCode: 2500,
                    keyword: val
                }
            })
            .then(response => {
                self.suggestion = response.data.data.list
                }
            )
            .catch(error => {
                exHandler
            })
        }
    },
    methods:{
        search(key, type){
            if(!key) return
            for(var i = 0; i < this.historySearch.length; i++){
                if(key === this.historySearch[i]){
                    this.historySearch.splice(i,1)
                    break;
                }
            }
            this.historySearch.unshift(key)
            if(this.historySearch.length > MAX_HISTORY_SEARCH_NUM){
                this.historySearch.pop();
            }

            cache.store.put(HISTORY_SEARCH,this.historySearch);
            if(type === 'hot'){
                cache.store.put(CURRENT_HOT_SEARCH,key)
                this.currentHotSearch = key;
            }
            this.keySearch(key);
        },
        keySearch(key){
            if(key = key.trim()){
                const url = `/m2015/mpChannel/search?searchType=1&catId=0&poiId=0&productType=4&keyword=${encodeURIComponent(key)}`;
                this.redirecToSearch(url, key);
            }
        },
        handleResultClick({mUrl, keyName}){
            this.redirecToSearch(mUrl,keyName)
        },
        redirecToSearch(rawURL, keyword){
            const url = this.isApp ? ('tuniuapp://travel/http?url=' + location.protocol + '//' + location.host + encodeURIComponent(rawURL)) :
                        rawURL;
            location.href = url
        },
        cancel(){
            this.visible = false
            this.searchKey = '';

        },
        clearHistory(){
            this.historySearch = []
            cache.store.put(HISTORY_SEARCH,this.historySearch)
        },
        clearInput(){
            this.searchKey = '';
        },
        getHotKeywords(){
            this.hotSearch = getHotKeywords();
        },
        highlight:(keyName,searchKey)=>highlight(keyName,searchKey)

    }
};
</script>
<style lang="scss" scoped>
.search-panel {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  z-index: 200;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  .search-float-layer {
    background: #edf0f5;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    z-index: 200;
    .cancel {
      line-height: 65px;
      color: #2dbb55;
      font-size: 26px;
      display: block;
      margin-left: 30px;
      width: 80px;
    }
    .search_btn {
      position: absolute;
      left: 40px;
      top: 40px;
      z-index: 201;
      font-size: 30px;
    }
    .search-form {
      background: #fff;
      height: 65px;
      position: relative;
      width: 100%;

      .search-input {
        width: 100%;
        height: 100%;
        padding: 0 40px 0 60px;
        box-sizing: border-box;
        color: #ccc;
        font-size: 12px;
        outline: none;
        -webkit-appearance: none;
      }
      .clear-btn {
        font-size: 30px;
        color: #999;
        position: absolute;
        right: 20px;
        bottom: 15px;
      }
    }
  }
}
input::-webkit-input-placeholder {
  color: #ccc;
  line-height: 65px;
}
.search-list-panel {
  width: 100%;
  background: #fff;
  .result {
    li {
      height: 80px;
      border-bottom: 1px solid #eee;
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
      line-height: 80px;
      a {
        display: block;
        i {
          color: #2dbb55;
          font-size: 30px;
          margin-right: 20px;
        }
      }
      .show-more {
        float: right;
        color: #ccc;
      }
    }
  }
}
.search-type {
  padding: 10px 20px;
  .search-bar {
    color: #999;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.search-type-block{
    height: 280px;
    overflow: hidden;
    span{
        padding:18px 30px;
        display: inline-block;
        margin:10px;
        background: #f2f4f7;
        font-size: 12px;
        color:#222;
        border-radius: 8px;
    }



}
</style>
