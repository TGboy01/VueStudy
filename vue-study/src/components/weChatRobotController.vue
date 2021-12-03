<template>
  <div class="robotController">
    <div class="controllerContainer">
      <div class="titlePanel">
        <img src="../assets/T800.jpg" draggable="false" class="imgPanel"/>
        <div class="title">T-800控制器</div>
      </div>
      <div class="inputPanel">
        <a-select class="selection"
                  placeholder="请选择发送消息类型"
                  v-model="selectedType"
                  dropdownClassName="test"
                  :options="messegeType">
        </a-select>
        <div class="textInputPanel" v-show="selectedType === 'text'">
          <a-textarea v-model="textContainer" placeholder="请输入文本"></a-textarea>
        </div>
        <div class="markdownInputPanel" v-show="selectedType === 'markdown'">
          <a-textarea v-model="markdownContainer" placeholder="请输入Markdown文本"></a-textarea>
        </div>
        <div class="imgInputPanel" v-show="selectedType === 'image'">
          <a-textarea  v-model="md5" placeholder="md5"></a-textarea>
          <a-textarea class="base64Input" v-model="base64" placeholder="base64"></a-textarea>
          <input type="file" class="fileSelect" @change="transImg">
        </div>
        <div class="newsInputPanel" v-show="selectedType === 'news'">
          <a-input v-model="news.title" placeholder="请输入题目"></a-input>
          <a-input class="newsInput" v-model="news.description" placeholder="请输入简介"></a-input>
          <a-input class="newsInput" v-model="news.url" placeholder="请输入跳转链接"></a-input>
          <a-input class="newsInput" v-model="news.picurl" placeholder="请输入图片链接"></a-input>
        </div>
        <div class="templatecardInputPanel" v-show="selectedType === 'template_card'">
          <a-select class="templateTypeSelection" v-model="templateCard.card_type" placeholder="请选择卡片模板类型">
            <a-select-option value="text_notice">文字模板</a-select-option>
            <a-select-option value="news_notice">卡片模板</a-select-option>
          </a-select>
          <div class="sourceInputPanel">
            <span>来源（可选）：</span>
            <a-input class="sourceInput" v-model="templateCard.source.icon_url" placeholder="请输入icon的url（可选）"></a-input>
            <a-input class="sourceInput" v-model="templateCard.source.desc" placeholder="请输入来源介绍文字（可选）"></a-input>
          </div>
          <div class="mainTitleInput">
            <span>一级标题：</span>
            <a-input class="mainInput" v-model="templateCard.mainTitle.title" placeholder="请输入标题（必填）"></a-input>
            <a-input class="mainInput" v-model="templateCard.mainTitle.desc" placeholder="请输入标题介绍（可选）"></a-input>
          </div>
          <div class="emphasisContentInputPanel" v-show="templateCard.card_type === 'text_notice'">
            <span>主内容</span>
            <a-input class="emphasisInput" v-model="templateCard.emphasisContent.title" placeholder="请输入主内容"></a-input>
            <a-input class="emphasisInput" v-model="templateCard.emphasisContent.desc" placeholder="请输入内容说明"></a-input>
            <span class="emphasisSecondTitle">辅助文字内容</span>
            <a-textarea v-model="templateCard.subTitleText" placeholder="请输入辅助文字"></a-textarea>
          </div>
          <div class="cardImageInputPanel" v-show="templateCard.card_type === 'news_notice'">
            <span>主内容</span>
            <a-input class="cardInput" v-model="templateCard.cardImage.url" placeholder="请输入图片url"></a-input>
            <a-input class="cardInput" v-model="templateCard.cardImage.aspect_ratio" placeholder="请输入图片宽高比（1.3-2.25）"></a-input>
            <div class="cardSecondTitle">
              <span>辅助标题与文本</span>
              <a-button @click="addVerticalContentList">添加</a-button>
              <a-button @click="deleteVerticalContentList">删除</a-button>
            </div>
            <div class="cardSecondInputPanel" v-for="(content, index) in templateCard.verticalContentList" :key="index">
              <a-input class="cardSecondInput" v-model="content.title" placeholder="请输入标题"></a-input>
              <a-input class="cardSecondInput" v-model="content.desc" placeholder="请输入辅助文字"></a-input>
            </div>
          </div>
          <div class="horizontalContentListInputPanel">
            <div class="horizontalContentListInputTitle">
              <span>二级标题与内容</span>
              <a-button @click="addHorizontalContentList">添加</a-button>
              <a-button @click="deleteHorizontalContentList">删除</a-button>
            </div>
            <div v-for="(content, index) in templateCard.horizontalContentList" :key="index">
              <div class="horizontalContentListLineOne">
                <a-select class="horizontalInput" v-model="content.type" defalut-value="0">
                  <a-select-option :value="0">文本</a-select-option>
                  <a-select-option :value="1">链接</a-select-option>
                  <a-select-option :value="2">文件</a-select-option>
                </a-select>
                <a-input class="horizontalInput" v-show="content.type === 1" v-model="content.url" placeholder="url"></a-input>
                <a-input class="horizontalInput" v-show="content.type === 2" v-model="content.media_id" placeholder="mediaID"></a-input>
              </div>
              <div class="horizontalContentListLineTwo">
                <a-input class="horizontalInput" v-model="content.keyname" placeholder="输入题目"></a-input>
                <a-input class="horizontalInput" v-model="content.value" placeholder="输入内容"></a-input>
              </div>
            </div>
          </div>
          <div class="jumpListInputPanel">
            <div class="jumpListInputTitle">
              <span>跳转列表</span>
              <a-button @click="addJumpList">添加</a-button>
              <a-button @click="deleteJumpList">删除</a-button>
            </div>
            <div v-for="(content, index) in templateCard.jumpList" :key="index" style="width: 100%">
              <div class="jumpListInputLineOne">
                <a-select class="jumpListInput" v-model="content.type" defalut-value="0">
                  <a-select-option :value="0">文本</a-select-option>
                  <a-select-option :value="1">链接</a-select-option>
                  <a-select-option :value="2">小程序</a-select-option>
                </a-select>
                <a-input class="jumpListInput" v-model="content.title" placeholder="请输入题目"></a-input>
              </div>
              <div class="jumpListInputLineTwo">
                <a-input class="jumpListInput" v-show="content.type === 1" v-model="content.url" placeholder="url"></a-input>
                <a-input class="jumpListInput" v-show="content.type === 2" v-model="content.appid" placeholder="appid"></a-input>
                <a-input class="jumpListInput" v-show="content.type === 2" v-model="content.pagepath" placeholder="pagepath"></a-input>
              </div>
            </div>
          </div>
          <div class="cardActionInputPanel">
            <span>卡片行为</span>
            <div class="cardActionInputLineOne">
              <a-select class="cardActionInput" v-model="templateCard.cardAction.type">
                <a-select-option :value="0">文本</a-select-option>
                <a-select-option :value="1">链接</a-select-option>
                <a-select-option :value="2">小程序</a-select-option>
              </a-select>
              <a-input class="cardActionInput" v-show="templateCard.cardAction.type === 1" v-model="templateCard.cardAction.url" placeholder="url"></a-input>
            </div>
            <div class="cardActionInputLinetwo">
              <a-input class="cardActionInput" v-show="templateCard.cardAction.type === 2" v-model="templateCard.cardAction.appid" placeholder="appid"></a-input>
              <a-input class="cardActionInput" v-show="templateCard.cardAction.type === 2" v-model="templateCard.cardAction.pagepath" placeholder="pagepath"></a-input>
            </div>
          </div>
        </div>
        <div class="buttonPanel">
          <a-button @click="postToT800" class="button">上传</a-button>
        </div>
      </div>
    </div>
    <div class="functionContainer">
      <div class="functionTitle">
        功能菜单
      </div>
      <div class="timeShower">
        <div class="time">{{timeNow.hour}}:{{timeNow.minute}}</div>
        <div class="timeTitle">当前时间</div>
      </div>
      <div class="functionPanel">
        <div class="timeReminder">
          <span>时间提醒功能</span>
          <a-switch v-model="timeReminder" @click="setTimeReminder"></a-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'blueimp-md5'

export default {
  name: "weChatRobotController",
  data () {
    return {
      messegeType: [
        {
          label: 'text文本',
          value: 'text'
        },
        {
          label: 'markdown文本',
          value: 'markdown'
        },
        {
          label: 'image图片',
          value: 'image'
        },
        {
          label: 'news图文',
          value: 'news'
        },
        {
          label: 'file文件',
          value: 'file',
          disabled: true
        },
        {
          label: 'template_card卡片',
          value: 'template_card'
        }
      ],
      // 文本输入
      textContainer: '',
      // Markdown输入
      markdownContainer: '',
      // 图片输入
      file: {},
      md5: '',
      base64: '',
      // news输入
      news: {
        title: '',
        description: '',
        url: '',
        picurl: ''
      },
      // 卡片模板输入
      templateCard: {
        card_type: '请选择模板类型',
        source: {
          icon_url: '',
          desc: ''
        },
        mainTitle: {
          title: '',
          desc: ''
        },
        emphasisContent: {
          title: '',
          desc: ''
        },
        cardImage: {
          url: '',
          aspect_ratio: ''
        },
        subTitleText: '',
        verticalContentList: [],
        horizontalContentList: [],
        jumpList: [],
        cardAction: {
          type: '',
          url: '',
          appid: '',
          pagepath: ''
        }
      },
      // 选中类型
      selectedType: '请选择类型',
      // post数据
      JSONContainer: {},
      left: '',
      // 机器人地址
      url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=68958b12-c2c2-4bdc-bb28-bb8d7942ba0d',

      meiTuanApp: {
        appid: 'wx2c348cf579062e56',
        pagepath: 'pages/index/index.html'
      },
      elemeApp: {
        appid: 'wxece3a9a4c82f58c9',
        pagepath: 'pages/index/index.html'
      },

      timeNow: {},
      timeReminder: false,
      runningFunc: []
    }
  },
  created () {
    this.getNowTime()
    setInterval(() => {
      this.getNowTime()
    }, 1000)
  },
  mounted () {
    console.log(document.getElementsByClassName('ant-select-dropdown-menu-item'))
  },
  methods: {
    postToT800 () {
      this.JSONContainer = {}
      this.JSONContainer.msgtype = this.selectedType
      this.getContent()
      const JSONsender = JSON.stringify(this.JSONContainer)
      console.log(JSONsender)
      axios.post(this.url, JSONsender).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getContent () {
      const type = this.selectedType
      switch (type) {
        case 'text': {
          this.JSONContainer[type] = {
            content: this.textContainer
          }
          break
        }
        case 'markdown': {
          this.JSONContainer[type] = {
            content: this.markdownContainer
          }
          break
        }
        case 'image': {
          this.JSONContainer[type] = {
            base64: this.base64,
            md5: this.md5
          }
          break
        }
        case 'news': {
          this.JSONContainer[type] = {
            articles: [
              {
                title: this.news.title,
                description: this.news.description ? this.news.description : null,
                url: this.news.url,
                picurl: this.news.picurl ? this.news.picurl : null
              }
            ]
          }
          break
        }
        case 'template_card': {
          if (this.templateCard.horizontalContentList.length !== 0) {
            this.templateCard.horizontalContentList.forEach((content) => {
              content.type = parseInt(content.type)
            })
          }
          if (this.templateCard.jumpList.length !== 0) {
            this.templateCard.jumpList.forEach((content) => {
              content.type = parseInt(content.type)
            })
          }
          if (this.templateCard.cardAction.type) {
            this.templateCard.cardAction.type = parseInt(this.templateCard.cardAction.type)
          }
          if (this.templateCard.cardImage.aspect_ratio) {
            this.templateCard.cardImage.aspect_ratio = parseFloat(this.templateCard.cardImage.aspect_ratio)
          }
          this.JSONContainer[type] = {
            card_type: this.templateCard.card_type,
            source: this.templateCard.source,
            main_title: this.templateCard.mainTitle,
            emphasis_content: this.templateCard.emphasisContent,
            sub_title_text: this.templateCard.subTitleText,
            card_image: this.templateCard.cardImage,
            vertical_content_list: this.templateCard.verticalContentList,
            horizontal_content_list: this.templateCard.horizontalContentList,
            jump_list: this.templateCard.jumpList,
            card_action: this.templateCard.cardAction
          }
        }
      }
    },
    // 图片解析
    async transImg (e) {
      this.file = e.currentTarget.files[0]
      this.md5 = await this.getMD5(this.file)
      this.base64 = await this.getBase64(this.file)
      console.log(this.md5, this.base64)
    },
    // 获得图片MD5，测试中
    getMD5 (file) {
      return new Promise((resolve) => {
        let fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file) // 读取文件
        fileReader.onload = () => { // 读取完成后回调
          let fileArray = new Int8Array(fileReader.result)
          let fileHead = fileArray.subarray(0, 10)
          let fileFoot = fileArray.subarray(fileArray.length - 11, fileArray.length - 1)
          let value = `${fileHead.join('')}${fileFoot.join('')}${file.size}`
          let fileSignature = md5(value)
          resolve(fileSignature)
        }
      })
    },
    // 获取图片Base64，测试中
    getBase64 (file) {
      return new Promise(function (resolve) {
        let URL = window.URL || window.webkitURL
        let blob = URL.createObjectURL(file)
        let img = new Image()
        img.src = blob
        let imgResult
        img.onload = function () {
          // 通过画布得到结果
          let canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          var ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, img.width, img.height)
          imgResult = canvas.toDataURL('image/png', 0.8)
          resolve(imgResult)
        }
      })
    },

    addVerticalContentList () {
      let length = this.templateCard.verticalContentList.length
      if (length >= 0 && length < 4) {
        let obj = {
          title: '',
          desc: ''
        }
        this.templateCard.verticalContentList.push(obj)
      }
    },

    deleteVerticalContentList () {
      let length = this.templateCard.verticalContentList.length
      this.templateCard.verticalContentList.splice(length - 1, 1)
    },

    addHorizontalContentList () {
      let length = this.templateCard.horizontalContentList.length
      if (length >= 0 && length < 5) {
        let obj = {
          keyname: '',
          type: '',
          value: '',
          url: '',
          media_id: ''
        }
        this.templateCard.horizontalContentList.push(obj)
      }
    },

    deleteHorizontalContentList () {
      let length = this.templateCard.horizontalContentList.length
      this.templateCard.horizontalContentList.splice(length - 1, 1)
    },

    addJumpList () {
      let length = this.templateCard.jumpList.length
      if (length >= 0 && length < 5) {
        let obj = {
          type: '',
          title: '',
          url: '',
          appid: '',
          pagepath: ''
        }
        this.templateCard.jumpList.push(obj)
      }
    },

    deleteJumpList () {
      let length = this.templateCard.jumpList.length
      this.templateCard.jumpList.splice(length - 1, 1)
    },

    getNowTime () {
      let time = new Date()
      this.timeNow = {}
      this.timeNow.hour = time.getHours()
      this.timeNow.minute = time.getMinutes()
    },

    setTimeReminder () {
      var timePast = {
        foodTime: false,
        restTimeInMorning: false,
        workingTimeInAfternoon: false,
        restTimeInAfternoon: false
      }

      if (this.timeReminder) {
        this.runningFunc[0] = setInterval(() => {
          let timeString = this.timeNow.hour + ':' + this.timeNow.minute
          switch (timeString) {
            case '10:30': {
              if (!timePast.foodTime) {
                this.templateCard.card_type = 'text_notice'
                this.templateCard.source.desc = 'T-800 办公生活小助手'
                this.templateCard.mainTitle.title = '摸鱼提醒'
                this.templateCard.emphasisContent.title = timeString
                this.templateCard.emphasisContent.desc = '当前时间'
                this.templateCard.subTitleText = '点外卖时间到啦！点击下方按钮可快速点外卖哦~'
                let obj1 = {
                  type: 2,
                  title: '美团外卖',
                  appid: this.meiTuanApp.appid,
                  pagepath: this.meiTuanApp.pagepath
                }
                this.templateCard.jumpList.push(obj1)
                let obj2 = {
                  type: 2,
                  title: '饿了么外卖',
                  appid: this.elemeApp.appid,
                  pagepath: this.elemeApp.pagepath
                }
                this.templateCard.jumpList.push(obj2)
                this.templateCard.cardAction.type = 1
                this.templateCard.cardAction.url = 'https://www.bilibili.com/'
                this.selectedType = 'template_card'
                this.getContent()
                this.postToT800()
                timePast.foodTime = true
              }
              break
            }
            case '11:20': {
              if (!timePast.restTimeInMorning) {
                this.templateCard.card_type = 'text_notice'
                this.templateCard.source.desc = 'T-800 办公生活小助手'
                this.templateCard.mainTitle.title = '摸鱼提醒'
                this.templateCard.emphasisContent.title = timeString
                this.templateCard.emphasisContent.desc = '当前时间'
                this.templateCard.subTitleText = '外卖都到了吗？午休时间开始咯~'
                let obj1 = {
                  type: 1,
                  title: 'bilibili看番',
                  url: 'https://www.bilibili.com/'
                }
                this.templateCard.jumpList.push(obj1)
                let obj2 = {
                  type: 1,
                  title: '爱奇艺看剧',
                  url: 'https://www.iqiyi.com/'
                }
                this.templateCard.jumpList.push(obj2)
                this.templateCard.cardAction.type = 1
                this.templateCard.cardAction.url = 'https://www.bilibili.com/'
                this.selectedType = 'template_card'
                this.getContent()
                this.postToT800()
                timePast.restTimeInMorning = true
              }
              break
            }
            case '14:30': {
              if (!timePast.workingTimeInAfternoon) {
                this.templateCard.card_type = 'text_notice'
                this.templateCard.source.desc = 'T-800 办公生活小助手'
                this.templateCard.mainTitle.title = '摸鱼提醒'
                this.templateCard.emphasisContent.title = timeString
                this.templateCard.emphasisContent.desc = '当前时间'
                this.templateCard.subTitleText = '任务都做完了吗？做完了就摸摸鱼吧'
                let obj1 = {
                  type: 1,
                  title: 'TAPD',
                  url: 'https://www.tapd.cn/'
                }
                this.templateCard.jumpList.push(obj1)
                let obj2 = {
                  type: 1,
                  title: '禅道',
                  url: 'http://pm.gtmap.cn/zentao/my/'
                }
                this.templateCard.jumpList.push(obj2)
                this.templateCard.cardAction.type = 1
                this.templateCard.cardAction.url = 'https://www.tapd.cn/'
                this.selectedType = 'template_card'
                this.getContent()
                this.postToT800()
                timePast.workingTimeInAfternoon = true
              }
              break
            }
            case '17:00': {
              if (!timePast.restTimeInAfternoon) {
                this.templateCard.card_type = 'text_notice'
                this.templateCard.source.desc = 'T-800 办公生活小助手'
                this.templateCard.mainTitle.title = '摸鱼提醒'
                this.templateCard.emphasisContent.title = timeString
                this.templateCard.emphasisContent.desc = '当前时间'
                this.templateCard.subTitleText = '距离下班还有半个小时，不要忘记打卡哦！'
                let obj1 = {
                  type: 1,
                  title: 'OA平台填写工时',
                  url: 'http://oa.gtis.com.cn/'
                }
                this.templateCard.jumpList.push(obj1)
                this.templateCard.cardAction.type = 1
                this.templateCard.cardAction.url = 'http://oa.gtis.com.cn/'
                this.selectedType = 'template_card'
                this.getContent()
                this.postToT800()
                timePast.restTimeInAfternoon = true
              }
              break
            }
          }
        }, 1000)
      } else {
        clearInterval(this.runningFunc[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.robotController{
  width: 100%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;

  --titleColor:#3B3433;
  --highLightColor: #DDD6C8;
  --darkLightColor: #BDAB92;
  --borderColor: #403736;

  .controllerContainer{
    width: 400px;
    height: 800px;
    border: 3px var(--borderColor) solid;
    padding: 8px;
    overflow-y: scroll;
    background-color: var(--highLightColor);
    margin-bottom: 20px;
    float: left;
    margin: 10px;
    opacity: 0.9;

    .titlePanel{
      display: inline-block;
      margin-top: 30px;
      margin-left: 10px;

      .imgPanel{
        display: inline-block;
        height: 150px;
        width: 150px;
      }

      .title{
        display: inline-block;
        font-size: 30px;
        font-weight: bold;
        margin-left: 30px;
      }
    }

    .inputPanel{
      position: relative;
      left: 42px;
      top: 50px;
      width: 300px;

      .selection{
        width: 100%;
        margin-bottom: 20px;
      }

      .textInputPanel{
        width: 100%;
        margin-bottom: 20px;
      }

      .markdownInputPanel{
        width: 100%;
        margin-bottom: 20px;
      }

      .imgInputPanel{
        width: 100%;
        margin-bottom: 20px;

        .base64Input{
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .fileSelect{
          width: 100%;
        }
      }

      .newsInputPanel{
        width: 100%;
        margin-bottom: 20px;

        .newsInput{
          margin-top: 20px;
        }
      }

      .templatecardInputPanel{
        width: 100%;
        margin-bottom: 20px;

        .templateTypeSelection{
          width: 100%;
        }

        .sourceInputPanel{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          & span{
            width: 100%;
            display: block;
            font-weight: bold;
          }

          .sourceInput{
            width: 48%;
          }
        }

        .mainTitleInput{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          & span{
            width: 100%;
            display: block;
            font-weight: bold;
          }

          .mainInput{
            width: 48%;
          }
        }

        .emphasisContentInputPanel{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          & span{
            width: 100%;
            display: block;
            font-weight: bold;
          }

          .emphasisInput{
            width: 48%;
          }

          .emphasisSecondTitle{
            margin-top: 10px;
          }
        }

        .cardImageInputPanel{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          & span{
            width: 100%;
            display: block;
            font-weight: bold;
          }

          .cardInput{
            width: 48%;
          }

          .cardSecondTitle{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;

            & span{
              width: auto;
              margin-right: 58px;
            }

            ::v-deep.ant-btn{
              margin-right: 5px;
            }
          }

          .cardSecondInputPanel{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .cardSecondInput{
              width: 48%;
            }
          }
        }

        .horizontalContentListInputPanel{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .horizontalContentListInputTitle{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;

            & span{
              width: auto;
              font-weight: bold;
              margin-right: 58px;
            }

            ::v-deep.ant-btn{
              margin-right: 5px;
            }
          }

          .horizontalContentListLineOne{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .horizontalInput{
              width: 48%;
            }
          }

          .horizontalContentListLineTwo{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .horizontalInput{
              width: 48%;
            }
          }
        }

        .jumpListInputPanel{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .jumpListInputTitle{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;

            & span{
              width: auto;
              font-weight: bold;
              margin-right: 100px;
            }

            ::v-deep.ant-btn{
              margin-right: 5px;
            }
          }

          .jumpListInputLineOne{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .jumpListInput{
              width: 48%;
            }
          }

          .jumpListInputLineTwo{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .jumpListInput{
              width: 48%;
            }
          }
        }

        .cardActionInputPanel{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          & span{
            width: 100%;
            display: block;
            font-weight: bold;
          }

          .cardActionInputLineOne{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .cardActionInput{
              width: 48%;
            }
          }

          .cardActionInputLinetwo{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 10px;

            .cardActionInput{
              width: 48%;
            }
          }
        }
      }

      .buttonPanel{
        width: 100%;
        display: flex;
        justify-content: center;

        .button{
          width: 100px;
        }
      }
    }
  }

  .functionContainer{
    width: 400px;
    height: 600px;
    border: 3px var(--borderColor) solid;
    background-color: var(--highLightColor);
    float: left;
    margin: 10px;
    opacity: 0.9;

    .functionTitle{
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 25px;
      margin-top: 8px;
    }

    .timeShower{
      width: 100%;
      text-align: center;

      .time{
        font-weight: bold;
        font-size: 50px;
        margin-top: 8px;
        margin-bottom: 8px;
      }

      .timeTitle{
        font-weight: bold;
        font-size: 18px;
      }
    }

    .functionPanel{
      width: 100%;
      margin-top: 20px;

      .timeReminder{
        padding: 8px;
        font-weight: bold;
        font-size: 18px;
        display: flex;
        justify-content: space-evenly;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: var(--highLightColor);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--titleColor);
  }

  ::v-deep.ant-switch{
    cursor: url("../assets/cursor/cursor_rays.png"), pointer;
  }

  ::v-deep.ant-switch:after{
    cursor: url("../assets/cursor/cursor_rays.png"), pointer;
  }

  ::v-deep.ant-select-selection{
    cursor: url("../assets/cursor/cursor_rays.png"), pointer;
  }

  ::v-deep.ant-btn{
    cursor: url("../assets/cursor/cursor_rays.png"), pointer;
  }
}
</style>
