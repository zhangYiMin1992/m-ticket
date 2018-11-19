<template>
    <div class="search-panel">
        <div class="search-float-layer">
            <i class="icon-search5 search_btn" style="color:#c2c6cc;"></i>
            <form class="search-form">
                <input type="text" class="search-input" placeholder="搜索目的地/主题/关键字">
                <i class="icon-close clear-btn"></i>
            </form>
            <span class="cancel">取消</span>
        </div>
        <div class="search-list-panel">
            <ul class="result">
                <li>
                    <template>
                        <a href="">
                            <i class="icon-city"></i>
                            <span class="scebic-name">上海</span>
                            <span class="show-more">查看所有景点</span>
                        </a>
                    </template>
                    <template>
                        <a href="">
                            <i class="icon-scenic"></i>
                            <span>上海迪士尼</span>
                            <span class="show-more">上海</span>
                        </a>
                    </template>
                </li> 
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.search-panel{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    z-index: 200;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    .search-float-layer{
        background: #edf0f5;
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        z-index: 200;
        .cancel{
            line-height: 65px;
            color: #2dbb55;
            font-size: 26px;
            display: block;
            margin-left: 30px;
            width: 80px;
        }
        .search_btn{
            position: absolute;
            left: 40px;
            top: 40px;
            z-index: 201;
            font-size: 30px;
        }
        .search-form{
            background: #fff;
            height: 65px;
            position: relative;
            width: 100%;
            
            .search-input{
                width: 100%;
                height: 100%;
                padding: 0 40px 0 60px;
                box-sizing: border-box;
                color: #ccc;
                font-size: 12px;
                outline: none;
                -webkit-appearance: none;
            }
            .clear-btn{
                font-size: 30px;
                color: #999;
                position: absolute;
                right: 20px;
                bottom: 15px;
            }
        }
    }
}
input::-webkit-input-placeholder{
    color: #ccc;
    line-height: 65px;
}
.search-list-panel{
    width: 100%;
    background: #fff;
    .result{
        li{
            height: 80px;
            border-bottom: 1px solid #eee;
            width: 100%;
            padding: 0 40px;
            box-sizing: border-box;
            line-height: 80px;
            a{
                display: block;
                i{
                    color: #2dbb55;
                    font-size: 30px;
                    margin-right: 20px;
                }
            }
            .show-more{
                float: right;
                color:#ccc;
            }
        }
    }
}
</style>
