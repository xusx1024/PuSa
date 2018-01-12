//index.js
var musicsData = require('../../data/music-data.js');
var app = getApp();
var numbers = 0;
var musicId = 1;
const backgroundAudioManager = wx.getBackgroundAudioManager();


Page({
  data: {
    img_woodenfish: "",
    audioPoster: "",
    audioName: "",
    audioAuthor: "",
    audioSrc: "",
    interval: 50000,
    autoplay: false,
    imgUrls: musicsData.musicList,
    clientHeight: "800px",
    current: musicId,
  },

  onLoad: function () {

    this.playAudio();
    backgroundAudioManager.autoplay = true;


    backgroundAudioManager.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      this.playAudio();
    })

    backgroundAudioManager.onEnded(() => {
      this.playAudio();
    })

  },
  
  // 滑动监听
  bindchange: function (e) {
    console.log(e.detail.current);
    musicId = e.detail.current;
    this.playAudio();
  },

  onNextTap: function () {
    this.playEnd();
  },

  playEnd: function () {
    console.log('播放完毕,正在切换...');
    this.setData({
      current: musicId,
    });
    this.playAudio();
  },


  playAudio: function () {
    var musicData = musicsData.musicList[musicId];
    if (musicData == null) {
      musicId = 0;
      musicData = musicsData.musicList[musicId];
      console.log('已经到最后一首');
    }
    console.log('开始播放第' + musicId + '首');
    this.setData({
      img_woodenfish: musicData.img_woodenfish,
      title: musicData.audioName,
    });
    backgroundAudioManager.singer = musicData.audioAuthor,
      backgroundAudioManager.title = musicData.audioName,
      backgroundAudioManager.coverImgUrl = musicData.img_woodenfish,
      backgroundAudioManager.src = musicData.audioSrc,
      backgroundAudioManager.onCanplay(() => {
        this.setData({
          autoplay: true,
          interval: backgroundAudioManager.duration * 1000,
        });
        console.log('开始播放,下一次切换时间:' + (backgroundAudioManager.duration * 1000));
      })
    console.log(musicData.audioSrc);
    musicId++;
  },
})
