<template >
    <div>
        <audio   :src="musicdetail.play_url" @ended="songend" @canplay="canplaysong" @timeupdate="update"  ref="audio"   autoplay="true"></audio>
        <div>
            <div ><img :src="require('../../assets/fenlei/'+new_image)"></div>
            <div class="one">
                <div>分类：{{new_classfy}}</div>
                <span>解析：{{new_dec}}</span>
            </div>
        </div>
        <!-- 列表区域 -->
        <div class="list">
            <el-table
                :data="musiclist"
                height="400"
                border
                style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="title"
                label="歌曲名"
                width="200">
                </el-table-column>
                <el-table-column
                prop="author"
                label="作者"
                width="300">
                </el-table-column>
                <el-table-column
                prop="type"
                label="类型">
                </el-table-column>
                <el-table-column
                label="播放">
                    <template slot-scope="scope">
                        <el-button @click="start(scope.row.id,scope.$index)" icon="el-icon-video-play"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 底部区域 -->
        <div class="footer">
                <div>
                    <div class="block">
                        <!-- <span class="demonstration"></span> -->
                        <el-slider @click="moveto" v-model="now_percent"></el-slider>
                    </div>
                    <div class="express">
                        <div>{{currenttime}}</div>
                        <div>{{musictotaltime}}</div>
                    </div>
                </div>
                <div class="second_footer">
                    <div class="div1" >歌名：{{musicdetail.title}}</div>
                    <div class="div2" >作者：{{musicdetail.author}}</div>
                    <div class="div4"><el-button type="primary" @click="beforesong">上一首</el-button> </div>
                    <div class="div5"><img @click="change_status" class="img" :src="audio_status===true?require('../../assets/pause.png'):require('../../assets/play.png')"/></div>
                    <div class="div6"><el-button type="primary" @click="nextsong">下一首</el-button> </div>
                    <div class="div7">{{try_cycle}}<img @click="change_cycle" class="img" :src="is_cycle===true?require('../../assets/cycle.png'):require('../../assets/arrow.png')"/> </div>
                    <div class="div3">类型：{{musicdetail.type}}</div>
                    <div class="div8"><el-button @click="shoucang" :style="{'backgroundColor':color}" >{{is_shoucang}}</el-button></div>
                </div>
        </div>
    </div>
</template>

<script>
import classfy from '../classfy/classfy'
export default {
   data(){
        return{
            new_image:'',
            new_dec:'',
            new_classfy:'',
            id:0,
            id1:0,
            musiclist:[],//音乐列表
            shoucangid:["5bd92135b02de25c576717ac"],//所有收藏音乐的id
            // now_index:0,
            musicdetail:{
                anime_info:{
                    des:'描述'
                },
            },
            now_index:0,//目前播放的音乐的索引id
            audio_status:false,//判定当前音乐是否播放
            is_cycle:true, //是否循环播放
            try_cycle:'循环',
            now_percent:0, //当前音乐进度
            musictotaltimemode:0,//音乐总时间秒模式
            currenttimemode:0,//音乐现在时间秒模式
            musictotaltime:'0:0',//转换后格式
            currenttime:'0:0',//转换后格式
            have_shoucang:false,
            color:'#FFD700',
            is_shoucang:'未收藏',
            arr:['5d4a7dd6b186e41798bb28ce'],
            myclassfy:[]//从js拿到分类数据
        }
   },
    created(){
        this.id1=this.$route.query.id1
        this.id=this.$route.query.id2
        this.myclassfy=classfy.classfy
        this.panduan()
        this.getmusiclist()
    },
    methods:{
        panduan(){
            this.shoucangid = this.myclassfy[this.id1-1].child[this.id-1].uid
            this.new_image = this.myclassfy[this.id1-1].child[this.id-1].url
            this.new_dec=this.myclassfy[this.id1-1].child[this.id-1].dec
            this.new_classfy=this.myclassfy[this.id1-1].child[this.id-1].classfy
        },
         songend(){

            if(this.is_cycle===true){
                this.start(this.musiclist[this.now_index].id,this.now_index)
            }else{
                if(this.now_index<this.musiclist.length-1){
                    this.start(this.musiclist[this.now_index+1].id,this.now_index+1)
                }
                else{
                    this.start(this.musiclist[0].id,0)
                }
            }
            
        },
        //解决进度条跳转
        moveto(){
            this.$refs.audio.duration=this.now_percent
        },
        //两个函数一起完成for循环查找歌单，并且将音乐信息逐步加到数组musiclist中
        async getmusiclist(){
            // let shoucangkey=eval(localStorage.getItem("shoucangkey"))
            // this.shoucangid=shoucangkey
        
            for(let i=0;i<this.shoucangid.length;i++){
                this.finddetail(this.shoucangid[i])
            }
            this.$message.success('获取歌曲成功')
        },
        async finddetail(id){
            const{data:res} = await this.$http.get('https://anime-music.jijidown.com/api/v2/music/'+id)
            if(res.msg!=='ok') return this.$message.error('查找失败')
            this.musiclist.push(res.res)
        },
        //时间听歌曲，调整进度条
        update(){
            let total=parseInt(this.$refs.audio.currentTime)
            let minute=total % 60
            let seconds=(total-minute)/60
            this.currenttime=seconds+':'+minute
            this.currenttimemode=total
            if(this.currenttimemode<parseInt(this.musictotaltimemode/100+1)){
                this.now_percent=0
            }else{
                this.now_percent=parseInt((total/this.musictotaltimemode)*100)
            }
        },
        canplaysong(){
            let total=parseInt(this.$refs.audio.duration)
                this.musictotaltimemode=total
                let minute=total % 60
                let seconds=(total-minute)/60
                this.musictotaltime=seconds+':'+minute
        },
        //按下按钮播放一个歌曲
        async start(id,index){
            this.now_index=index
            const{data:res} = await this.$http.get('https://anime-music.jijidown.com/api/v2/music/'+id)
            if(res.msg!=='ok') return this.$message.error('播放失败')
            this.musicdetail=res.res
            this.audio_status=true
            this.$message.success('播放成功') 
            //收藏按钮状态
            let shoucangkey=localStorage.getItem('shoucangkey')
            let num=shoucangkey.indexOf(id)
            if(num!==-1){
                this.color='#E3CFBC'
                this.have_shoucang=true
                this.is_shoucang='已收藏'
            }
            else{
                this.color='#FFD700'
                this.have_shoucang=false
                this.is_shoucang='未收藏'
            }
        },
        //上一首歌
        beforesong(){
            if(this.now_index===0){
                this.$message.error('这是第一首歌，没有上一首了~~')
            }else{
                 this.now_index=this.now_index-1
                 this.start(this.musiclist[this.now_index].id,this.now_index)
            }
        },
        //下一首歌
        nextsong(){
            if(this.now_index===this.musiclist.length-1){
                this.$message.error('这是最后一首歌，没有上更多了了~~')
            }else{
                this.now_index=this.now_index+1
                this.start(this.musiclist[this.now_index].id,this.now_index)
            }
        },
        //音乐暂停与播放
        change_status(){
            if(this.audio_status===true){
                this.$refs.audio.pause()
                this.audio_status=false
            }else{
                this.$refs.audio.play()
                this.audio_status=true
            }
        },
        //调节歌曲是否循环
        change_cycle(){
            if(this.is_cycle===true){
                this.$refs.audio.loop=""
                this.is_cycle=false
                this.try_cycle='非循环'

            }else{
                this.$refs.audio.loop="loop"
                this.is_cycle=true
                this.try_cycle='循环播放'
            }
        },
        //收藏音乐
        shoucang(){
            let id=this.musiclist[this.now_index].id
            let shoucangkey=eval(localStorage.getItem("shoucangkey"))
            let num=shoucangkey.indexOf(id)
            if(num===-1){
                shoucangkey.push(id)
                localStorage.setItem('shoucangkey',JSON.stringify(shoucangkey))
                this.color='#E3CFBC'
                this.have_shoucang=true
                this.is_shoucang='已收藏'
            }
            else{
                shoucangkey.splice(num,1)
                localStorage.setItem('shoucangkey',JSON.stringify(shoucangkey))
                this.color='#FFD700'
                this.have_shoucang=false
                this.is_shoucang='未收藏'
            }
            
        },
    },
    watch:{
        now_percent(newValue,oldValue){
            if(newValue-oldValue>5){
                this.newtime=parseInt(this.musictotaltimemode*(newValue)/100)
                this.$refs.audio.currentTime=this.newtime
                this.$refs.audio.play()
            }
            if(oldValue-newValue>5){
                this.newtime=parseInt(this.musictotaltimemode*(newValue)/100)
                this.$refs.audio.currentTime=this.newtime
                this.$refs.audio.play()
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .one{
        color: rgb(127, 178, 255);
    }
  
    .list{
       height: 690px;
   }
    .express{
        display: flex;
        flex-direction: row;
        justify-content:space-between ;
       }
    .img{
        height: 50px;
        width: 50px;
    }
    .footer{
        position: fixed;
        bottom: 20px;
        height: 130px;
        width: 1000px;
        margin-left: 200px;
    }
    .second_footer{
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        vertical-align: center;
        .div1{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div2{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div3{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div4{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div5{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div6{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div7{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
        .div8{
            float: left;
            margin-left: 30px;
            display: block;
            width: 150px;
        }
    }
</style>