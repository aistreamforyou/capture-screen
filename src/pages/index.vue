<template>
  <div>
    <el-button size="small" type="primary" id="startVideo" @click="startVideo">屏幕分享</el-button>
    <el-button size="small" type="primary" id="startVideo2" @click="startVideo2">屏幕分享2</el-button>
    <el-button size="small" type="primary" id="startVideo3" @click="startVideo3">屏幕分享3</el-button>
    <el-button size="small" type="primary" id="recordVideo" @click="recordVideo">开始录制</el-button>
    <el-button size="small" type="primary" id="stopVideo" @click="stopVideo">结束录制</el-button>
    <el-button size="small" type="primary" id="downloadVideo" @click="downloadVideo">下载视频</el-button>
    <video autoplay playsinline poster="../assets/egma.jpg" id="player"></video>
  </div>
</template>
<script>
  export default {
    name: 'Index',
    data(){
      return {
        allStream: {},//存放媒体流
        buf: [],//
        mediaRecorder: {},//用于保存MediaRecorder的实例
      }
    },
    methods: {
      //
      startVideo3(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          }).then(stream => {
            this.allStream = stream
            document.getElementById('player').srcObject = stream
          }).catch(error=>{
            console.log(error)
          })
        }else{
          alert('navigator.mediaDevices or navigator.mediaDevices.getUserMedia is not defined')
        }
      },
      //将getDisplayMedia获取到的媒体流，不再直接赋值给video标签，
      //而是通过MediaRecorder存储起来，再转换给video
      //目的：不仅可以将数据赋值给video，而且还可以将stream存储并下载下来
      startVideo2(){
        if(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia){
          navigator.mediaDevices.getDisplayMedia({
            video: true,
            auto: false
          }).then(stream => {
            this.allStream = stream
            document.querySelector('#player').srcObject = stream
          }).catch(error=>{
            console.log(error)
          })
        }else{
          alert('不支持这个属性')
        }
      },
      //屏幕分享
      startVideo(){
        if(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia){
          navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
          }).then(stream => {
            document.querySelector('#player').srcObject = stream
          }).catch(error => {
            console.log(error)
          })
        }else{
          alert('不支持这个特性')
        }
      },
      //开始录制
      recordVideo(){
        //约定视频格式
        const options = {
          mimeType: 'video/webm;codecs=vp8'
        }
        //判断是否支持mimeType格式
        if(!MediaRecorder.isTypeSupported(options.mimeType)){
          return console.log('不支持的视频格式')
        }
        try {
          this.mediaRecorder = new MediaRecorder(this.allStream, options)
          console.log(this.mediaRecorder)
          //事件监听
          this.mediaRecorder.ondataavailable = (e)=>{
            if(e && e.data && e.data.size > 0){
              //将数存储在数组中
              this.buf.push(e.data)
            }
          }
          //开始录制
          this.mediaRecorder.start(10)
        }catch(error){
          console.error(error)
        }
      },
      //结束录制
      stopVideo(){
        this.mediaRecorder.stop()
      },
      //下载视频
      downloadVideo(){
        if(this.buf.length){
          const blob = new Blob(this.buf, {type: 'video/webm'})
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.style.display = 'none'
          a.download = '视频录制.webm'
          a.click()
        }else{
          alert('还没有录制任何内容')
        }
      },
    }
  }
</script>
<style scoped lang="scss">

</style>
