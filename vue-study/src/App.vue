<template>
  <div id="app">
    <weChatRobotController></weChatRobotController>
  </div>
</template>

<script>
import weChatRobotController from "./components/weChatRobotController";

export default {
  name: 'App',
  components: {
    weChatRobotController
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  background-color: dimgrey;
}
</style>
