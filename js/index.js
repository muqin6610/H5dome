/**设备样式兼容 */
;(function (window, doc) {
  let docEl = document.documentElement
  let dpr = window.devicePixelRatio || 1
  let scale = 1 / dpr
  let metaEl = document.querySelector('meta[name="viewport"]')
  // let tid
  docEl.setAttribute('data-dpr', dpr)
  metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
  function refreshRem () {
    let rem = docEl.clientWidth / 10
    console.log('userAgent' + window.navigator.userAgent)
    if (window.navigator.userAgent.indexOf('Android') > -1) { // 如果不是安卓设备则输出IOS的样式逻辑
      docEl.style.fontSize = rem + 'px'
    } else if (window.navigator.userAgent.indexOf('iPhone') > -1) { //如果不是安卓和IOS的样则默认执行pc的样式逻辑
      docEl.style.fontSize = rem + 'px'
    } else {
      docEl.style.fontSize = (rem > 68.1 ? 68.1 : rem) + 'px'
      window.addEventListener('load', function () {
        document.body.style.maxWidth = '664px'
        document.body.style.position = 'absolute'
        document.body.style.left = '50%'
        document.body.style.marginLeft = '-332px'
        // document.getElementById('html').style.height = document.body.offsetHeight + 'px'
      })
    }
  }
  refreshRem()
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      refreshRem()
    }
  })
  window.addEventListener('resize', refreshRem)
})(window, document);
/**---------------------------------------------------------------------------------------------------------------------------- */
;(function (window, doc) {
  function fGetChartFontSize(){
    const dpr = window.devicePixelRatio
    let fontSize = 14
    if(dpr == 2){
        fontSize = 19
    }
    else if(dpr == 3){
        fontSize = 30
    }
    else if(dpr > 3){
        fontSize = 30
    } 
    return fontSize;
  }
  const size = fGetChartFontSize()

  // 基于准备好的dom，初始化echarts实例
  let myChart1 = echarts.init(document.getElementById('chart1'), null, {renderer: 'svg'})
  let myChart2 = echarts.init(document.getElementById('chart2'), null, {renderer: 'svg'})
 
 // 指定图表的配置项和数据
 let option1 = {
     tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        textStyle:{
            fontSize: size //此处设置提示文字大小
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                fontSize: size,
                formatter : (param) => {
                  if(param.name === "搜索引擎"){
                    return param.percent + '%'
                  }else {
                    return ''
                  }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: size,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
 }
 let option2 = {
     tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        textStyle:{
            fontSize: size //此处设置提示文字大小
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                fontSize: size,
                formatter : (param) => {
                  if(param.name === "搜索引擎"){
                    return param.percent + '%'
                  }else {
                    return ''
                  }
                }
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: size,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
 }
 myChart1.resize()
 myChart2.resize()
 window.addEventListener("resize", () => { 
    myChart1.resize()
    myChart2.resize()
 })

 // 使用刚指定的配置项和数据显示图表。
 myChart1.setOption(option1)
 myChart2.setOption(option2)
})(window, document);