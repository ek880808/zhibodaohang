var data = VShareTool.parseUrlParams();
new VShareTool({
	server: "https://sdk.efpbnm.com",
	appKey : "cdpeuw4j",
	/*自定义遮罩的html*/
	//mask:function(){
	//  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
	//},
	onready : function() {
		var m = this;
		buttons = document.getElementsByClassName("downloadButton")
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function() {
				m.install();
				return false;
			})
		}
	}
}, data);



$(document).ready(function() {

  if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent.toLowerCase()) == false) {
    console.log(1)
    var codeUrl = window.location.href
    var qrcode = new QRCode("codeDiv", { 
      text: codeUrl, 
      render: "canvas", 
      width: 166,
      height: 166,
      typeNumber: -1,
      // colorDark: "#000000",
       colorLight: "#ffffff", 
       correctLevel: QRCode.CorrectLevel.H 
      }
    );
    var canvas = document.getElementsByTagName('canvas')[0];
    var img = convertCanvasToImage(canvas);
    function convertCanvasToImage(canvas) { var image = new Image(); image.src = canvas.toDataURL("image/png"); return image; }
    $('#qrcode').append(img);
    $('#qrcode').css("display", "block");
  } else {
    setTimeout(function () {
      if (getSystemInfo() == 'android') {
          $('.downloadButton')[0].click();
      }
    }, 3000);
  
    // IOS 3秒下载
    setTimeout(function () {
        if (getSystemInfo() == 'ios') {
            $('.downloadButton')[0].click();
        }
    }, 3000);
  }

  

  // 判断系统
  function getSystemInfo() {
    var us = navigator.userAgent.toLowerCase();
    if ((us.indexOf('android') > -1 || us.indexOf('linux') > -1) || navigator.platform.toLowerCase().indexOf('linux') != -1) {
        return 'android';
    } else if (us.indexOf('iphone') > -1 || us.indexOf('ipad') > -1) {
        return 'ios';
    }
  }

  // 返回显示弹窗
  function setHistory() {
		history.pushState(null, null, document.URL);
		setTimeout(function() {
			window.addEventListener('popstate', function() {
				$(".out-mask").css('display', 'block');
				history.pushState(null, null, document.URL);
			});
		}, 0);
    }
    var info = getSystemInfo();
	var noback = document.getElementById('noback');
	if(noback.getAttribute('content') == '1') {
		if (info == 'android' || info == 'ios') {
			setHistory();
		}
	}
	$('.out-close').click(function() {
		$(".out-mask").css('display', 'none');
	})
})