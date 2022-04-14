<template>
    <div class="div-container">
        <video src="../assets/bc.mp4" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;" loop="loop"  autoplay="autoplay" ></video>
        <div class="container">
            <div class="bigimg">
                <img class="img" src="../assets/login.png" alt=""/>
            </div>
            <div class="form">
                <el-form ref="loginref" :model="userinfo"  :rules="rules">
                    <el-form-item label="账号" class="item-one" prop="username">
                        <el-input v-model="userinfo.username" prefix-icon="el-icon-user" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" class="item-two" prop="password">
                        <el-input v-model="userinfo.password" type="password" prefix-icon="el-icon-lock" ></el-input>
                    </el-form-item>
                    <el-form-item class="item-three">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="info" @click="renew">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userinfo:{
                username:'admin',
                password:'123456'
            },
            rules:{
            username:[
                { required: true, message: '请输入账号名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            }
        }
    },
    methods:{
        renew(){
            this.$refs.loginref.resetFields()
        },
        login(){
            this.$refs.loginref.validate(async valid=>{
                if(!valid) return;
                const { data : res } = await this.$http.post('https://lianghj.top:8888/api/private/v1/login',this.userinfo)
                console.log(res.meta.status)
                if(res.meta.status !== 200) return this.$message.error('登陆失败');
                this.$message.success("登陆成功")
                window.sessionStorage.setItem("token",res.data.token)
                this.$store.commit('Addname',this.userinfo.username)
                this.$store.dispatch('Addqian',this.userinfo.username)
                this.$router.push("/home")
            })
        }
    }

}
</script>

<style lang="less" scoped>
    .div-container{
        height: 100%;
    
    }
    .item-one{
        margin-left: 50px;
        width: 80%;
    }
    .item-two{
        margin-left: 50px;
        width: 80%;
    }

    .container{
        z-index: 199;
        opacity: 0.7;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 3px solid saddlebrown;
    }
    .form{
        height: 300px;
        width: 450px;
        margin-top: 50px;
    }
    .bigimg{
        margin-top: -50px;
        
    }
    .img{
        height: 100px;
        width: 100px;
        border: 1px solid white;
        border-radius: 300px;
        
    }
</style>