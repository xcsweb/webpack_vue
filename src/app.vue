<template>
    <div>
        <button @click="toggle">切换</button>
       <child v-if="show"></child>
       <iframeChild v-else></iframeChild>
    </div>
</template>
<script>
import child from "@/components/child";
import iframeChild from "@/components/iframeChild";
export default {
    components:{
        child,
        iframeChild
    },
    data(){
        return {
            show:true
        }
    },
    methods:{
        toggle(){
            this.show=!this.show;
        }
    }
};
</script>
