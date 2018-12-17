<template>
    <div id="search-placeholder">
        <m-header></m-header>
        <div class="search-main" id="main-container">
            <div class="search-container" id="search-container">
                <div class="search-btn-box">
                    <div class="search-btn">
                        <i class="icon-search5" style="color:#c2c6cc;"></i>
                        <span style="display:none">景点名称/目的地/游玩主题</span>
                        <span class="ft-color-deepgrey">上海</span>
                    </div>
                </div>
                <section class="search-list-container">
                    <search-list></search-list>
                </section>
            </div>
            <filter-cus></filter-cus>
        </div>
        <search-panel></search-panel>
    </div>    
</template>
<script>
import MHeader from '../common/Header.vue'
import SearchPanel from '../common/SearchPanel.vue'
import SearchList from './SearchList.vue'
import FilterCus from './FilterCus.vue'
export default {
    components:{
        'm-header':MHeader,
        'search-list': SearchList,
        'search-panel': SearchPanel,
        'filter-cus': FilterCus
    }
}
</script>
<style lang="scss" scoped>
#search-placeholder,.search-main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.search-main{
    width: 100%;
    background:#edf0f5;
}
.search-container{
    box-sizing: border-box;
    flex: 1;
    overflow-y: scroll;
    padding-bottom:100px;
    -webkit-overflow-scrolling: touch;
}
.search-btn-box, .search-btn-box .search-btn{
    width: 100%;
    box-sizing: border-box;
}
.search-btn-box{
    padding: 20px;
}
.search-btn{
    background: #fff;
    height: 100%;
    border-radius: 6px;
    text-align: left;
    padding: 0 20px;
    color: #ccc;
    line-height: 70px;
    i{
        vertical-align: middle;
    }
    span{
        padding-left: 20px
    }
}
</style>
