<template>
    <div v-sticky="{zIndex:100,stickyTop:0}">
        <header class="header-box" id="header">
            <span class="header-back" v-back>
                <i class="icon-title-back effect-active"></i>
            </span>
            <h1><span :class="type">{{title}}</span></h1>
        </header>
    </div>
</template>
<script>
export default {
    props:{
        isApp:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:'上海'
        },
        type:{
            type:String,
            default:'city-select'
        }
    }
}
</script>
<style lang="scss" scoped>
    .header-box i {
        color: #33bd61;
    }
    .header-back i{
        line-height: 90px;
        font-size:34px;
    }
</style>
