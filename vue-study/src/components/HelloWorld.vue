<template>
  <div class="hello">
    <div class="descriptionText">
      <p>其实我也不知道该写点啥</p>
    </div>
    <div class="selfInfo">
      <div class="nameContainer">
        <div class="touXiangContainer">
          <img class="touXiang" draggable="false" src="../assets/touxiang.jpg">
        </div>
        <div class="textContainer">
          <div class="name">TGboy001</div>
          <div class="selfDescription">我是傻逼!</div>
        </div>
      </div>
      <div class="telephoneNumber">
        <div class="bilibili">
          <div>bilibili：</div>
          <div @click="openUrl('https://space.bilibili.com/2275268')" class="outerLink">@TGboy001</div>
        </div>
        <div class="weChat">
          <div>WeChat：</div>
          <div class="outerLink" @mouseenter="set2pic" @mouseleave="set2pic">@lly84402343</div>
          <div :class="{close2pic: close2pic, twoPic: !close2pic}" v-show="show2pic">
            <div class="triangle"></div>
            <div class="picContainer">
              <img class="pic" src="../assets/wechat.jpg">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show2pic: false,
      close2pic: true
    }
  },
  methods: {
    openUrl (e) {
      window.open(e, '_blank')
    },
    set2pic () {
      if ( this.show2pic === false ) {
        this.show2pic = true
        this.close2pic = false
      } else {
        this.close2pic = true
        setTimeout(() => {
          this.show2pic = false
        },1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hello{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  --titleColor:#3B3433;
  --highLightColor: #DDD6C8;
  --darkLightColor: #BDAB92;
  --borderColor: #403736;

  .descriptionText{
    width: 600px;
    height: 1000px;
    float: left;
    background-color: var(--highLightColor);
    opacity: 0.9;
    border: 3px var(--borderColor) solid;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    font-size: 16px;
    color: var(--titleColor);
  }

  .selfInfo{
    width: 300px;
    float: left;
    margin: 10px;

    .nameContainer{
      height: 130px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--highLightColor);
      opacity: 0.9;
      border: 3px var(--borderColor) solid;
      border-radius: 10px;

      .touXiangContainer{
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 100px;
        text-align: left;
        margin: 10px;
        float: left;


        .touXiang{
          max-height: 120px;
          position: relative;
          top: -20px;
          right: 10px;
          user-select: none;
        }
      }

      .textContainer{
        width: 50%;
        color: var(--titleColor);

        .name{
          font-weight: bold;
          font-size: 25px;
          height: 40px;
          float: left;
        }

        .selfDescription{
          height: 30px;
          font-size: 20px;
          float: left;
          cursor: url("../assets/cursor/zan.png"), auto;
        }
      }
    }

    .telephoneNumber{
      width: 100%;
      height: 100px;
      background-color: var(--highLightColor);
      opacity: 0.9;
      border: 3px var(--borderColor) solid;
      border-radius: 10px;
      margin-top: 10px;
      padding-left: 25px;

      .outerLink{
        cursor: url("../assets/cursor/cursor_rays.png"), pointer;
        color: salmon;
      }

      .bilibili{
        display: flex;
        margin: 10px;
        font-size: 20px;
        color: var(--titleColor);
      }

      .weChat{
        display: flex;
        margin: 10px;
        font-size: 20px;
        color: var(--titleColor);

        @keyframes show2pic {
          from {opacity: 0;}
          to {opacity: 1;}
        }

        @keyframes close2pic {
          from {opacity: 1;}
          to {opacity: 0;}
        }

        .close2pic{
          animation: close2pic 1s;
          position: relative;
          left: -110px;
          top: 30px;

          .triangle{
            width: 0px;
            height: 0px;
            border-bottom: 10px solid var(--darkLightColor);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            margin-left: 40px;
          }

          .picContainer{
            width: 100px;
            height: 100px;
            padding: 5px;
            background-color: var(--darkLightColor);

            .pic{
              max-height: 90px;
            }
          }
        }

        .twoPic{
          position: relative;
          left: -110px;
          top: 30px;
          animation: show2pic 1s;

          .triangle{
            width: 0px;
            height: 0px;
            border-bottom: 10px solid var(--darkLightColor);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            margin-left: 40px;
          }

          .picContainer{
            width: 100px;
            height: 100px;
            padding: 5px;
            background-color: var(--darkLightColor);

            .pic{
              max-height: 90px;
            }
          }
        }
      }
    }
  }
}
</style>
