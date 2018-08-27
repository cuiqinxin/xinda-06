<template>
  <div class="Outter">
    <div class="useruser">
        <el-row>
            <el-col :span="24">     
                <router-link to="/"><span class="xinda hidden-xs-only"></span></router-link><span class="line hidden-xs-only"></span><p class="wel hidden-xs-only">{{info}}</p>
                <p class="hidden-sm-and-up phone"><router-link to="/quit" class="jian">&lt;</router-link>{{infoWeb}}</p>
            </el-col>
        </el-row>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'Outter',
    data () {
        return {
            info:'欢迎登录',
            infoWeb:'登录',
            currentPage3: 1,
        }
    }
}
</script>

<style scoped lang="less">
    span{display: inline-block;}
    .useruser{
        max-width:1200px;
        margin:0 auto;
        height:97px;
    }
    .xinda{
        width: 124px;
        height: 56px;
        background: url(../../static/data_image_jpeg;bas….jpg) no-repeat;
        margin-top:21px;
        cursor: pointer;
    }
    .line{
        width:1px;
        height:47px;
        background-color:#b4b4b4;
        margin:4px 25px 0 28px;
    }
    .wel{
        font-size:18px;
        display:inline-block;
        vertical-align: top;
        margin-top:36px;
    }
    .phone{
        text-align: center;
        font-size: 18px;
        line-height: 77px;
        position: relative;
        .jian{
            float: left;
            left: 20px;
            font-size: 32px;
            position: absolute;
        }
    }
    @media screen and (max-width: 768px){
        .useruser{
            height: 77px;
            background-color: #e5e5e5;
            position: absolute;
            top:0;
            width: 100%;
        }
    }
</style>
