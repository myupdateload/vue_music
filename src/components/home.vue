<template>
    <div>
        <!-- 整体部分 -->
       <el-container>
           <!-- //头部区域 -->
            <el-header class="header-div">
                <div class="out-image"><img class="header-img" src="../assets/login.png"></div>
                <div class="second-div">
                    <div class="header-font">音乐跳动</div>
                    <div class="header-button">
                        <span class="textcolor">666{{$store.state.newname}}</span>
                        <span class="textcolor">你好,{{$store.state.name}}</span>
                        <el-button @click="loginout" type="primary">退出</el-button>
                    </div>
                </div>
            </el-header>
            
            <el-container>
                <!-- 左边菜单栏 -->
                <el-aside class="aside-div"  :width="iscoll?'70px':'300px'">
                    <div class="text">
                        <div class="tangle_btn" @click="tangle" >|||</div>
                        <!-- 菜单栏 -->
                        <el-menu  :collapse="iscoll" router :collapse-transition="false"   background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened>
                             <!-- 一级菜单 -->
                            <el-submenu  :index="item.id"   v-for="item in menulist" :key="item.id">
                            <template slot="title">
                                <i class="el-icon-s-promotion"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <!-- 二级菜单 -->
                            <el-menu-item :index="subitem.id"  v-for="subitem in item.children" :key="subitem.id">{{subitem.authName}}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-aside>
                <!-- 主体部分 -->
                <el-container class="realmain">
                    <el-main class="main-div">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            iscoll:true,
            menulist:[
                {id:'1',authName:'排行榜',children:[{id:'/home/rank',authName:'排行榜'}]},
                {id:'2',authName:'日本音乐',children:[{id:'/home/Search',authName:'搜索歌曲'}]},
                // {id:'3',authName:'音乐',children:[{id:'3',authName:'manhua3'}]},
                {id:'4',authName:'我的收藏',children:[{id:'/home/love',authName:'我的收藏'}]}
            ]
        }
    },
    methods:{
        tangle(){
            this.iscoll=!this.iscoll
        },
        loginout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
    .textcolor{
        color: white;
    }
    .realmain{
        height: 770px;
        background-color: rgb(233, 250, 255);
    }
    .tangle_btn{
        height: 20px;
        width: 20px;
        color: white;
        margin: auto;
        cursor: pointer;
        letter-spacing: 0.2em;
        
    }
    .header-div{
        height: 200px;
        width: 100%;
        background-color: #373d41;
        margin-left: 0;
        text-align: center;
    }
    .out-image{
        float: left;
    }
    .header-font{
        margin-top: 25px;
        margin-left: 50px;
        float: left;
        font-size: larger;
        color: white;
    }
    .header-button{
        margin-top: 10px;
        
    }
    .second-div{
       display: flex;
       justify-content:space-between ;
    }
    .header-img{
        height: 50px;
        width: 50px;
        border: 1px solid white;
        border-radius: 300px;
    }
    .main-div{

    }
    .aside-div{
        background-color: #333744;
        height: 770px;
        
    }
    
    
</style>