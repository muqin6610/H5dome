/**-------------------------------------------------------------------------------------------------- */
let directorDate = today, directorPeriod = 'AM', directorDepart
let directorTabDate = today, directorTabPeriod = 'AM', directorTabDepart
let parentDate = today, parentPeriod = 'AM', parentDepart

/**下拉刷新 */
/**添加'refresh'监听器,初始化下拉刷新 */
$(document).on('refresh', '.pull-to-refresh-content',function(e) {
    getData(directorDate, directorPeriod, orgCodeStr);
});


/**-------------------------------------------------------------------------------------------------- */
/**ajax请求代码 */

function getLoginInfo() { // 测试获取app登录的用户信息
   $.ajax({
     type: 'get',
     url: BASE_URL + "/v2/h5PageController/getLoginInfo",
     crossDomain: true,
     success: (data) => {
      //  console.log(data)
       let userInfo = data.result;
       userRole = userInfo.role
       // 获取H5的登录用户信息
       getUsernameInfo(userInfo);
     },
     error: function(){
       console.log("发送失败");
     }
   })
} 

function getUsernameInfo(userInfo) { // 获取H5的登录用户信息
  $.ajax({
     type: 'get',
     url: BASE_URL + `/v2/h5PageController/getUsernameInfo?username=${userInfo.username}`,
     crossDomain: true,
     success: (data) => {
       console.log(data);
       let { orgCode, departId, schoolName, personId } = data.result;
       departIdStr = departId;
       orgCodeStr = orgCode;
       directorDepart = orgCode;
       directorTabDepart = orgCode;
       schoolNameStr = schoolName;
       personIdStr = personId;
       // 获取部门数据
       if(userInfo.role === '教育局管理员' || userInfo.role === '学校管理员') {
         getDepartData(userInfo.username, orgCode, userInfo.role);
       }else if(userInfo.role === '老师'){
         getDepartDataTeacher(userInfo.username, orgCode);
       }else {
         getStudentTemperatureLog();
       }
     },
     error: function(){
       console.log("发送失败");
     }
   })
}

function getData(s1, s2, s3) { // 默认页面数
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'post',
    url: BASE_URL + "/v2/h5PageController/temperatureStatic",
    data: {
      date: s1,
      timeQuantum: s2,
      orgCode: s3,
      type: '1',
    },
    success: function(data){
      console.log(data)
      let { untemperatureCount, temperatureCount, normalCount, excetionCount } = data.result;
      if(userRole === "教育局管理员" || userRole === "学校管理员") {
        $('.index-director').show();
        $('.index-teacher').hide();
        $('.index-Parent').hide();
        $('.index-default').hide();

        $('#text-reportedDirector').text(function(i,origText){
          return "已测温: " + temperatureCount;
        });
        $('#text-notReportedDirector').text(function(i,origText){
          return "未测温: " + untemperatureCount;
        });
        $('#text-normalDirector').text(function(i,origText){
          return "正常: " + normalCount;
        });
        $('#text-abnormalDirector').text(function(i,origText){
          return "异常: " + excetionCount;
        });

        $('#reportedDirector').text(temperatureCount);
        $('#notReportedDirector').text(untemperatureCount);
        $('#abnormalDirector').text(excetionCount);
      }else if(userRole === "老师") {
        $('.index-director').hide();
        $('.index-teacher').show();
        $('.index-Parent').hide();
        $('.index-default').hide();

        $('#text-reportedTeacher').text(function(i,origText){
          return "已测温: " + temperatureCount;
        });
        $('#text-notReportedTeacher').text(function(i,origText){
          return "未测温: " + untemperatureCount;
        });
        $('#text-normalTeacher').text(function(i,origText){
          return "正常: " + normalCount;
        });
        $('#text-abnormalTeacher').text(function(i,origText){
          return "异常: " + excetionCount;
        });

        $('#reportedTeacher').text(temperatureCount);
        $('#notReportedTeacher').text(untemperatureCount);
        $('#abnormalTeacher').text(excetionCount);
      }

      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
    },
    error: function(){
      console.log("发送失败");
      $.toast("加载失败,请返回重试!");
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
    }
  })
};

function getDataTab2(s1, s2, s3) {
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'post',
    url: BASE_URL + "/v2/h5PageController/temperatureStatic",
    data: {
      date: s1,
      timeQuantum: s2,
      orgCode: s3,
      type: '2',
    },
    success: function(data){
      // console.log(data)
      let { untemperatureCount, temperatureCount, normalCount, excetionCount } = data.result;
      $('#text-reportedDirectorTab').text(function(i,origText){
        return "已测温: " + temperatureCount;
      });
      $('#text-notReportedDirectorTab').text(function(i,origText){
        return "未测温: " + untemperatureCount;
      });
      $('#text-normalDirectorTab').text(function(i,origText){
        return "正常: " + normalCount;
      });
      $('#text-abnormalDirectorTab').text(function(i,origText){
        return "异常: " + excetionCount;
      });

      $('#reportedDirectorTab').text(temperatureCount);
      $('#notReportedDirectorTab').text(untemperatureCount);
      $('#abnormalDirectorTab').text(excetionCount);
      $.hidePreloader();
    },
    error: function(){
      $.toast("加载失败,请返回重试!");
      console.log("发送失败");
      $.hidePreloader();
    }
  })
}

function getStudentTemperatureLog() { // 学生登录的测温记录
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    url: BASE_URL + `/v2/h5PageController/getStudentTemperatureLog?date=${parentDate}&timeQuantum=${parentPeriod}&peronId=${peronId}`,
    success: function(data){
      // console.log(data)
      let arrData = data.result;
      $('.index-director').hide();
      $('.index-teacher').hide();
      $('.index-Parent').show();
      $('.index-default').hide();
      if(arrData.length == 0) {
        let html = "";
        html += '<div class="card">';
        html +=     '<div class="card-content">'
        html +=       '<div class="card-content-inner" style="text-align: center">暂无数据</div>'
        html +=     '</div>'
        html += '</div>';
        $("#card-box").html(html);
      }else {
        let html = "";
        for( var i = 0; i < arrData.length; i++ ) {
            html += '<div class="card">';
            html +=     '<div class="card-header">' + '截至' + arrData[i].passTime + '</div>'
            html +=     '<div class="card-content">'
            html +=       '<div class="card-content-inner">' + arrData[i].realName + '</div>'
            html +=     '</div>'
            if(arrData[i].tempStatus == 0) {
                html +=     '<div class="card-footer blueColor">' + '体温正常:' +  arrData[i].mappingTemp + '</div>'
            }else {
                html +=     '<div class="card-footer redColor">' + '体温异常:' +  arrData[i].mappingTemp + '</div>'
            }
            html += '</div>';
        }
        $("#card-box").html(html);
      }

       $.hidePreloader();
    },
    error: function(){
      $.toast("加载失败,请返回重试!");
      console.log("发送失败");
      $.hidePreloader();
    }
  })
}

/**交互逻辑代码 */
// 跳转到学生详情
function schoolDetail(val) {
  if(userRole === "教育局管理员") {
    if(val === '1') {
      window.location.href=`./schoolDetail.html?status=1&role=${userRole}&type=1&title=未测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '2') {
      window.location.href=`./schoolDetail.html?status=2&role=${userRole}&type=1&title=已测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '3') {
      window.location.href=`./schoolDetail.html?status=3&role=${userRole}&type=1&title=体温异常&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }
  }else {
    if(val === '1') {
      window.location.href=`./classDetail.html?status=1&role=${userRole}&peronId=${personIdStr}&schoolNameStr=${schoolNameStr}&type=1&title=未测温&titleTwo=未测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '2') {
      window.location.href=`./classDetail.html?status=2&role=${userRole}&peronId=${personIdStr}&schoolNameStr=${schoolNameStr}type=1&title=已测温&titleTwo=已测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '3') {
      window.location.href=`./classDetail.html?status=3&role=${userRole}&peronId=${personIdStr}&schoolNameStr=${schoolNameStr}type=1&title=体温异常&titleTwo=体温异常&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }
  }
};
// 跳转到教师详情
function schoolDetailTab(val) {
  if(userRole === "教育局管理员") {
    if(val === '1') {
      window.location.href=`./schoolDetail.html?status=1&role=${userRole}&type=1&title=未测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '2') {
      window.location.href=`./schoolDetail.html?status=2&role=${userRole}&type=1&title=已测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '3') {
      window.location.href=`./schoolDetail.html?status=3&role=${userRole}&type=1&title=体温异常&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }
  }else {
    if(val === '1') {
      window.location.href=`./classDetail.html?status=1&role=${userRole}&peronId=${personIdStr}&schoolNameStr=${schoolNameStr}type=1&title=未测温&titleTwo=未测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '2') {
      window.location.href=`./classDetail.html?status=2&role=${userRole}&peronId=${personIdStr}schoolNameStr=${schoolNameStr}type=1&title=已测温&titleTwo=已测温&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }else if(val === '3') {
      window.location.href=`./classDetail.html?status=3&role=${userRole}&peronId=${personIdStr}schoolNameStr=${schoolNameStr}type=1&title=体温异常&titleTwo=体温异常&date=${directorDate}&timeQuantum=${directorPeriod}&departId=${departIdStr}`
    }
  }
};
// 返回app
function returnBlank() {
  console.log('返回到了app');
};