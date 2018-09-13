<template>
    <transition name="slide-right" @after-enter="afterEnter" @before-leave="beforeLeave">
        <div class="vue-wrapper">
            <slot></slot>
        </div>
        
    </transition>
</template>
<script>
import Vue from 'vue'
import bus from '../../../../bus'
import {toggleBodyOverFlow} from '../../../../util/dom-opt'
export default {
    name:'Wrapper',
    componentName:'Wrapper',
    props:{
        wid:{
            type:String,
            default:''
        }
    },
    data:function(){
        return{
            popstateListener: null,
            show:false
        }
    },
    mounted(){
        let self = this;
        this.$nextTick(function(){
            self.$on('OPEN_RIGHT_SLIDER',function(){
                self.open();
            });
            bus.$on('closeRight',function(){
                self.close();
            });
            if(!self.wid)return
            self.popstateListener = function(t){
                self.show = !!(t.state && t.state.wrapper === self.wid);
            };
            window.addEventListener('popstate',self.popstateListener);
        })
    },
    destroyed(){
        window.removeEventListener('popstate',this.popstateListener);
    },
    methods:{
        afterEnter(){
            toggleBodyOverFlow(this.show);
        },
        beforeLeave(){
            toggleBodyOverFlow(this.show);
        },
        open(){
            this.show = true;
            window.history.pushState({
                wrapper:this.wid
            },document.title)
        },
        close(){
            this.show = false;
            window.history.back();
        }
    }
}
</script>
<style lang="scss" scoped>
    .vue-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color:#fff;
    }
    .slide-right-enter-active,.slide-right-leave-avtive{
        transform: translate(0, 0, 0);
    }
    .slide-right-enter,.slide-right-leave-active{
        transform: translate3d(100%, 0, 0);
    }
</style>
