<template>
    <div>
        <m-header :title="'景点门票'" :type="''" v-if="!isApp" :is-app="isApp"></m-header>
        <Loading v-show="loading"></Loading>
        <wrapper :wid="'CITY_PICKER'"></wrapper>
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter'

import MHeader from '../common/Header.vue'
import Loading from '../common/Loading.vue'
import wrapper from '../vue-components/components/wrapper/index.vue'
export default {
    name:'Channel',
    componentName:'Channel',
    components:{
       'm-header': MHeader,
       'Loading': Loading,
       'wrapper':wrapper
    },
    props:{
        isApp:{
            type:Boolean,
            default:false
        }
    },
    data:function(){
        return{
            loading:false
        }
    }

}
</script>
<style scoped>

</style>
