<template lang='html'>
    <div class='container'>
        <iframe src="http://localhost:8082/b.html" ref="ifra" frameborder="0" width="100px" height="100px"></iframe>
        <button @click="sendIframe">url通信</button>
        <button @click="postMessage">postmessage通信</button>
        <button @click="domainSend">window.domain主域名相同通信</button>
    </div>
</template>
<script>
    window.a=function (){
        alert(122)
    }
    document.domain="localhost";
     export default {
        name: 'iframeChild',
        data () {
            return{
            }
        },
        methods:{
            sendIframe(){
                // this.$refs.ifra
                this.$refs.ifra.src="http://localhost:8082/b.html?a=1";
            },
            postMessage(){
                this.$refs.ifra.contentWindow.postMessage("122","http://localhost:8082")
            },
            domainSend(){
                this.$refs.ifra.contentWindow.b()
            }
        }
    }
</script>
<style scoped>
    
</style>