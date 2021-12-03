<template>
  <div class="homePage">
    <div class="topContainer">
      <div class="topShower">
        <div class="title">TGboy | 无聊树洞</div>
        <div class="descriptionTitle">天空是无用且垂死的星辰</div>
        <img class="topPic" src="../assets/topPic.png" draggable="false">
      </div>
      <div class="toolbar">
        <ul class="linkList">
          <li class="linkItem">
            <router-link class="link" to="/helloWorld">
              主页
            </router-link>
          </li>
          <li class="linkItem">
            <router-link class="link" to="/weChatRobotController">
              <i class="iconfont icon-jiqiren" style="padding-right: 8px"></i>
              微信机器人
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="backgroundPic">
      <img class="topPic" src="../assets/topPic.png" draggable="false">
    </div>
    <div class="container">
      <div class="routerViewer">
        <transition name="pageChange">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style lang="scss" scoped>
.homePage::-webkit-scrollbar{
  width: 5px;
  background-color: var(--highLightColor);
}
.homePage::-webkit-scrollbar-thumb{
  background-color: black;
}

.homePage{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  cursor: url("../assets/cursor/Cursor_hand.png"), auto;

  --titleColor:#3B3433;
  --highLightColor: #DDD6C8;
  --darkLightColor: #BDAB92;

  .topContainer{
    width: 100%;
    height: 330px;
    overflow: hidden;

    .topPic{
      position: relative;
      top: -135px;
      width: 100%;
      z-index: 15;
      user-select: none;
    }

    .title{
      position: relative;
      top: 120px;
      right: -860px;
      font-family: 微软雅黑;
      font-size: 60px;
      color: var(--titleColor);
      z-index: 20;
      user-select: none;
    }

    .descriptionTitle{
      position: relative;
      top: 120px;
      right: -1005px;
      font-size: 30px;
      font-family: 微软雅黑;
      color: var(--titleColor);
      z-index: 20;
      user-select: none;
    }

    .toolbar{
      position: absolute;
      top: 0;
      width: 100%;
      height: 40px;
      background-color: black;
      z-index: 20;
      opacity: 0.5;
      overflow-x: hidden;

      .linkList{
        position: relative;
        height: 100%;
        left: 860px;
        float: left;
        list-style-type: none;
        padding-left: 0;
        margin-bottom: 0;

        .linkItem{
          height: 100%;
          float: left;
          font-size: 16px;
          cursor: url("../assets/cursor/cursor_rays.png"), pointer;

          :hover{
            color: var(--highLightColor);
            background-color: dimgray;
          }

          .link{
            color: white;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0px 8px 0px 8px;
            cursor: url("../assets/cursor/cursor_rays.png"), pointer;

            :hover{
              color: var(--highLightColor);
              background-color: dimgray;
            }
          }
        }
      }
    }
  }

  .backgroundPic{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    opacity: 0.5;

    .topPic{
      width: 100%;
      z-index: 1;
      user-select: none;
    }
  }

  .container{
    height: auto;

    .pageChange-enter{
      opacity: 0;
    }

    .pageChange-enter-active{
      transition: all 0.3s;
      transition-delay: 0.3s;
    }

    .pageChange-enter-to{
      opacity: 1;
    }

    .pageChange-leave{
      opacity: 1;
    }

    .pageChange-leave-active{
      transition: all 0.3s;
    }

    .pageChange-leave-to{
      opacity: 0;
    }

    .routerViewer{
      height: 100%;
      width: calc(100% - 600px);
      position: relative;
      left: 300px;
    }
  }
}
</style>
