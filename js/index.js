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

  /**
  *解决echarts图表在tab页中width:100%失效的问题 
  *在使用echarts时，写在tab页中的图表宽度明明设成了100%，但是在页面上实际却只有100px宽
  *原因很简单，在tab页中，图表的父容器div是隐藏的（display：none），
  *图表在执行js初始化的时候找不到这个元素，所以自动将“100%”转成了“100”，最后计算出来的图表就成了100px
  *解决办法：找一个在tab页的切换操作中不会隐藏的父容器，把它的宽度的具体值取出后在初始化图表之前直接赋给图表
  */
  $("#chart1").css('width',$(".page").width() / 2)
  $("#chart2").css('width',$(".page").width() / 2)
  $("#chart1").css('height', 200)
  $("#chart2").css('height', 200)
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
    color: ["#3EC32F", "#FF4444"], //配置颜色
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

// 获取当天日期
let date = new Date()
let year = date.getFullYear()
let month = ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1))
let day = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
let today = year + '-' + month + '-' + day
// 添加到日历组件当中
$("#my-input")[0].value = today
// 初始化日历组件
$("#my-input").calendar({
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      console.log(displayValues)
    },
});
// 添加到日历组件当中
$("#my-input2")[0].value = today
// 初始化日历组件
$("#my-input2").calendar({
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      console.log(displayValues)
    },
});

// 初始化选择组件1
let val = "", displayVal = "";
// 添加到选择组件当中
$("#picker-input")[0].value = '上午'
// 初始化选择组件
$("#picker-input").picker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["1"], // 设置默认值
          values: ["1", "2"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        val = picker.value[0];
        displayVal = picker.displayValue[0];
    },
});
// 初始化选择组件1.2
let val1 = "", displayVal1 = "";
// 添加到选择组件当中
$("#picker-input2")[0].value = '上午'
// 初始化选择组件
$("#picker-input2").picker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["1"], // 设置默认值
          values: ["1", "2"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        val1 = picker.value[0];
        displayVal1 = picker.displayValue[0];
    },
});

// 初始化选择组件2
let val2 = "", displayVal2 = "";
$("#select-input")[0].value = "全部";
$("#select-input").picker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择</h1>\
    </header>',
    cols: [
      {
          textAlign: 'center',
          value:["1"],
          values: ["1", "2"],//隐藏值
          displayValues: ["全部", "一年级",]//显示值
      }
    ],
    formatValue: function (p, values, displayValues) {//自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {//picker 关闭时的触发动作
        //这里获取关闭时选择的值
        val2 = picker.value[0];
        displayVal2 = picker.displayValue[0];
    },
});

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