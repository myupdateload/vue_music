<template>
    <div class="content" >
        <div>
            <el-carousel :interval="3000" arrow="always" width="300px" >
                <el-carousel-item v-for="item in lunboimage[0].child" :key="item.id">
                    <img @click="imgmoveto(5,item.id)" :src="require('../../assets/lunbo/'+item.url)">
                   
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="div1" v-for="item in mainimg" :key="item.id">
            <div class="div11" v-for="items in item.child" :key="items.id">
                <img class="img" @click="imgmoveto(item.id,items.id)" :src="require('../../assets/fenlei/'+items.url)">
                 <div>{{items.classfy}}</div>
            </div>
        </div>
    </div>
</template>>

<script>
import classfy from '../classfy/classfy'
export default {
   data(){
       return{
            myclassfy:[],//从js拿到分类数据
            lunboimage:[
            // {id:5,child:[
            //    {id:1,url:'jijing.png',ids:17},
            //    {id:2,url:'qingchun.png',ids:18},
            //    {id:3,url:'wudengfen.png',ids:19},
            //    {id:4,url:'zhenhun.png',ids:20}
            //    ]}
            ],
           mainimg:[
            //    {id:1,child:[
            //        {id:1,url:'01.png',des:'快乐'},
            //        {id:2,url:'02.png',des:'喜悦'},
            //        {id:3,url:'03.png',des:'亢奋'},
            //        {id:4,url:'04.png',des:'轻轻'},
            //    ]},
            //    {id:2,child:[
            //        {id:1,url:'05.png',des:'积极'},
            //        {id:2,url:'06.png',des:'庆祝'},
            //        {id:3,url:'07.png',des:'动漫'},
            //        {id:4,url:'08.png',des:'音乐'}]},
            //    {id:3,child:[
            //        {id:1,url:'09.png',des:'悲伤'},
            //        {id:2,url:'10.png',des:'沮丧'},
            //        {id:3,url:'11.png',des:'愤怒'},
            //        {id:4,url:'12.png',des:'紧张'}]},
            //    {id:4,child:[ 
            //        {id:1,url:'13.png',des:'痛苦'},
            //        {id:2,url:'14.png',des:'悲愤'},
            //        {id:3,url:'15.png',des:'OD'},
            //        {id:4,url:'16.png',des:'OP'},]}
           ]
       }
   },
   created(){
        this.myclassfy=classfy.classfy
        this.lunboimage=[this.myclassfy[4]]
        this.mainimg=this.myclassfy.slice(0,3)
        
    },
   methods:{
       imgmoveto(id1,id2){
           this.$router.push({path:'/home/musiclist?id1='+id1+'&&id2='+id2})
       }
   }
}
</script>

<style lang="less">
    .content{
        height: 1400px;
        
    }
    .div1{
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 300px;
        
    }
    .div11{
        height: 250px;
        width: 250px;
        border: 3px solid ;
        margin-top: 23px;
    }
    .img{
        height: 250px;
        width: 250px;
    }
    
</style>