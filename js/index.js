/**-------------------------------------------------------------------------------------------------- */
/**交互逻辑代码 */
// 跳转到详情
function schoolDetail(val) {
  if(val === '0') {
    window.location.href="./schoolDetail.html?uid=0&status=未测温人数"
  }else if(val === '1') {
    window.location.href="./classDetail.html?uid=1&status=已测温人数"
  }else {
    window.location.href="./classDetail.html?uid=2&status=体温异常人数"
  }
};
// 返回app
function returnBlank() {
  console.log('返回到了app');
};

/**-------------------------------------------------------------------------------------------------- */
/**ajax请求代码 */
function getData() {
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    url: BASE_URL + "api/index",
    success: function(data){
      let { uid } = data
      console.log(uid)
      if(uid === '3') {
        let { uid, arrData} = data
        $('.index-director').hide();
        $('.index-teacher').hide();
        $('.index-Parent').show();
        $('.index-default').hide();
        

         var html = "";
         for( var i = 0; i < arrData.length; i++ ) {
             html += '<div class="card">';
             html +=     '<div class="card-header">' + '截至' + arrData[i].date + '</div>'
             html +=     '<div class="card-content">'
             html +=       '<div class="card-content-inner">' + arrData[i].name + '</div>'
             html +=     '</div>'
             if(arrData[i].tiwen > 38) {
                 html +=     '<div class="card-footer redColor">' + '体温正常:' +  arrData[i].tiwen + '℃' + '</div>'
             }else {
                 html +=     '<div class="card-footer blueColor">' + '体温正常:' +  arrData[i].tiwen + '℃' + '</div>'
             }
             html += '</div>';
         }
         $("#card-box").html(html);

      }else if(uid === '2'){
        let { uid, charts1, charts2} = data;
        $('.index-director').hide();
        $('.index-teacher').show();
        $('.index-Parent').hide();
        $('.index-default').hide();

        $('#text-reportedTeacher').text(function(i,origText){
          return "已测温: " + charts1[0].value
        });
        $('#text-notReportedTeacher').text(function(i,origText){
          return "未测温: " + charts1[1].value
        });
        $('#text-normalTeacher').text(function(i,origText){
          return "正常: " + charts2[0].value
        });
        $('#text-abnormalTeacher').text(function(i,origText){
          return "异常: " + charts2[1].value
        });

        $('#reportedTeacher').text(charts1[0].value);
        $('#notReportedTeacher').text(charts2[1].value);
        $('#abnormalTeacher').text(charts2[1].value);
      }else {
        let { uid, charts1, charts2, charts3, charts4} = data;
        $('.index-director').show();
        $('.index-teacher').hide();
        $('.index-Parent').hide();
        $('.index-default').hide();

        $('#text-reportedDirector').text(function(i,origText){
          return "已测温: " + charts1[0].value
        });
        $('#text-notReportedDirector').text(function(i,origText){
          return "未测温: " + charts1[1].value
        });
        $('#text-normalDirector').text(function(i,origText){
          return "正常: " + charts2[0].value
        });
        $('#text-abnormalDirector').text(function(i,origText){
          return "异常: " + charts2[1].value
        });

        $('#text-reportedDirectorTab').text(function(i,origText){
          return "已测温: " + charts3[0].value
        });
        $('#text-notReportedDirectorTab').text(function(i,origText){
          return "未测温: " + charts3[1].value
        });
        $('#text-normalDirectorTab').text(function(i,origText){
          return "正常: " + charts4[0].value
        });
        $('#text-abnormalDirectorTab').text(function(i,origText){
          return "异常: " + charts4[1].value
        });

        $('#reportedDirector').text(charts1[0].value);
        $('#notReportedDirector').text(charts1[1].value);
        $('#abnormalDirector').text(charts2[1].value);

        $('#reportedDirectorTab').text(charts3[0].value);
        $('#notReportedDirectorTab').text(charts3[1].value);
        $('#abnormalDirectorTab').text(charts4[1].value);
      }
      $.hidePreloader();
    },
    error: function(){
      console.log("发送失败");
      $.hidePreloader();
    }
  })
};