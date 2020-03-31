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

  $("#chart1").css('width',$(".page").width() / 2)
  $("#chart2").css('width',$(".page").width() / 2)
  $("#chart1").css('height',200)
  $("#chart2").css('height',200)
  // 基于准备好的dom，初始化echarts实例
  let myChart1 = echarts.init(document.getElementById('chart1'), null, {renderer: 'svg'})
  let myChart2 = echarts.init(document.getElementById('chart2'), null, {renderer: 'svg'})
 
 // 指定图表的配置项和数据
 let option1 = {
    color: ["#6281f4", "#feda39"], //配置颜色
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        textStyle:{
            fontSize: size //此处设置提示文字大小
        }
    },
    series: [
        {
            name: '上报情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                fontSize: size,
                color: '#333333',
                formatter : (param) => {
                  if(param.name === "未上报"){
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
                {value: 100, name: '已上报'},
                {value: 25, name: '未上报'},
            ]
        }
    ]
 }
 let option2 = {
    color: ["#FF4444", "#3EC32F"], //配置颜色
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        textStyle:{
            fontSize: size //此处设置提示文字大小
        }
    },
    series: [
        {
            name: '体温情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                fontSize: size,
                color: '#333333',
                formatter : (param) => {
                  if(param.name === "异常"){
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
                {value: 75, name: '正常'},
                {value: 25, name: '异常'},
            ]
        }
    ]
 }
 myChart1.resize()
 myChart2.resize()
 window.onresize = function () {
    $("#chart1").css('width',$(".page").width() / 2)
    $("#chart2").css('width',$(".page").width() / 2)
    $("#chart1").css('height',200)
    $("#chart2").css('height',200)
    myChart1.resize()
    myChart2.resize()
}


 // 使用刚指定的配置项和数据显示图表。
 myChart1.setOption(option1)
 myChart2.setOption(option2)
})(window, document);
/**-------------------------------------------------------------------------------------------------- */
/**业务逻辑代码 */

// 跳转到详情
function schoolDetail(val) {
  if(val === '0') {
    window.location.href="./schoolDetail.html?uid='0'&uername='未上报'"
  }else if(val === '1') {
    window.location.href="./schoolDetail.html?uid='1'&uername='已上报'"
  }else {
    window.location.href="./schoolDetail.html?uid='2'&uername='异常'"
  }
}
// 返回app
function returnBlank() {
  console.log('返回到了app')
}