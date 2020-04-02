/**echarts图表 */
/**通过获取设备像素比,显示不同的fontSize */
function fGetChartFontSize(){
  const dpr = window.devicePixelRatio;
  let fontSize = 14;
  if(dpr == 2){
      fontSize = 19;
  }
  else if(dpr == 3){
      fontSize = 30;
  }
  else if(dpr > 3){
      fontSize = 30;
  } 
  return fontSize;
};
const size = fGetChartFontSize();
/**
*解决echarts图表在tab页中width:100%失效的问题 
*在使用echarts时，写在tab页中的图表宽度明明设成了100%，但是在页面上实际却只有100px宽
*原因很简单，在tab页中，图表的父容器div是隐藏的（display：none），
*图表在执行js初始化的时候找不到这个元素，所以自动将“100%”转成了“100”，最后计算出来的图表就成了100px
*解决办法：找一个在tab页的切换操作中不会隐藏的父容器，把它的宽度的具体值取出后在初始化图表之前直接赋给图表
*/
$("#chartDirector1").css('width',$(".page").width() / 2);
$("#chartDirector2").css('width',$(".page").width() / 2);
$("#chartDirector1").css('height', 200);
$("#chartDirector2").css('height', 200);

$("#chartTeacher1").css('width',$(".page").width() / 2);
$("#chartTeacher2").css('width',$(".page").width() / 2);
$("#chartTeacher1").css('height', 200);
$("#chartTeacher2").css('height', 200);

$("#chartDirectorTab1").css('width',$(".page").width() / 2);
$("#chartDirectorTab2").css('width',$(".page").width() / 2);
$("#chartDirectorTab1").css('height', 200);
$("#chartDirectorTab2").css('height', 200);
// 基于准备好的dom，初始化echarts实例
let myChart1 = echarts.init(document.getElementById('chartDirector1'), null, {renderer: 'svg'});
let myChart2 = echarts.init(document.getElementById('chartDirector2'), null, {renderer: 'svg'});
let myChart3 = echarts.init(document.getElementById('chartTeacher1'), null, {renderer: 'svg'});
let myChart4 = echarts.init(document.getElementById('chartTeacher2'), null, {renderer: 'svg'});
let myChart5 = echarts.init(document.getElementById('chartDirectorTab1'), null, {renderer: 'svg'});
let myChart6 = echarts.init(document.getElementById('chartDirectorTab2'), null, {renderer: 'svg'});

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
            name: '测温情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                fontSize: size,
                color: '#333333',
                formatter : (param) => {
                  if(param.name === "未测温"){
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
            data: [{value: 0, name: ''}],
        }
    ]
 };
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
                show: false,
            },
            data: [{value: 0, name: ''}],
        }
    ]
 };
 let option3 = {
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
            name: '测温情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                fontSize: size,
                color: '#333333',
                formatter : (param) => {
                  if(param.name === "未测温"){
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
            data: [{value: 0, name: ''}],
        }
    ]
 };
 let option4 = {
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
                show: false,
            },
            data: [{value: 0, name: ''}],
        }
    ]
 };
 let option5 = {
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
           name: '测温情况',
           type: 'pie',
           radius: ['50%', '70%'],
           avoidLabelOverlap: false,
           label: {
               show: true,
               position: 'center',
               fontSize: size,
               color: '#333333',
               formatter : (param) => {
                 if(param.name === "未测温"){
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
           data: [{value: 0, name: ''}],
       }
   ]
 };
  let option6 = {
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
                show: false,
            },
            data: [{value: 0, name: ''}],
        }
    ]
 };
 myChart1.resize();
 myChart2.resize();
 myChart3.resize();
 myChart4.resize();
 myChart5.resize();
 myChart6.resize();
 window.onresize = function () {
    $("#chartDirector1").css('width',$(".page").width() / 2);
    $("#chartDirector2").css('width',$(".page").width() / 2);
    $("#chartDirector1").css('height',200);
    $("#chartDirector2").css('height',200);

    $("#chartTeacher1").css('width',$(".page").width() / 2);
    $("#chartTeacher2").css('width',$(".page").width() / 2);
    $("#chartTeacher1").css('height', 200);
    $("#chartTeacher2").css('height', 200);

    $("#chartDirectorTab1").css('width',$(".page").width() / 2);
    $("#chartDirectorTab2").css('width',$(".page").width() / 2);
    $("#chartDirectorTab1").css('height', 200);
    $("#chartDirectorTab2").css('height', 200);

    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
    myChart5.resize();
    myChart6.resize();
};

// 获取图表数据
$.ajax({
  type: 'get',
  url: BASE_URL + "api/index",
  success: (data) => {
    let { uid, charts1, charts2, charts3, charts4} = data;
    if(uid !== '3') {
      option1.series[0].data = charts1;
      option2.series[0].data = charts2;
      option3.series[0].data = charts1;
      option4.series[0].data = charts2;
      option5.series[0].data = charts3;
      option6.series[0].data = charts4;
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
      myChart5.setOption(option5);
      myChart6.setOption(option6);
    }
  },
  error: function(){
    console.log("发送失败");
  }
})