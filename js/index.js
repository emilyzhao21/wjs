$(function () {
  banner();
  initTabs();
  /*初始化工具提示*/
  $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
  /*存储数据*/
  var data = [
    {
      pcImg: "images/slide_01_2000x410.jpg",
      mImg: "images/slide_01_640x340.jpg"
    },
    {
      pcImg: "images/slide_02_2000x410.jpg",
      mImg: "images/slide_02_640x340.jpg"
    },
    {
      pcImg: "images/slide_03_2000x410.jpg",
      mImg: "images/slide_03_640x340.jpg"
    },
    {
      pcImg: "images/slide_04_2000x410.jpg",
      mImg: "images/slide_04_640x340.jpg"
    }
  ];

  var render = function () {
    /*定义两个变量 存储需要添加的html元素*/
    var pointHtml = "";
    var imgHtml = "";
    /*定义变量，判断是什么设备 超小屏幕*/
    var isMobile = $(window).width() < 768 ? true : false;
    /*遍历数据，判断设备*/
    /*$.each()可以是任意对象    $().each() 只能是jQuery对象*/
    /*i 是索引 item是索引所对应的内容*/
    $.each(data, function (i, item) {
      pointHtml += "<li data-target='#carousel-example-generic' data-slide-to='" + i + "' " + (i == 0 ? 'class = active' : '') + "></li>";
      /*选中第一个*/
      imgHtml += " <div class='item " + (i == 0 ? "active" : "") + "'>";
      /*如果是超小屏幕，则使用小图片 否则使用大背景图*/
      if (isMobile) {
        imgHtml += "<a href='#' class='mImgBox'><img src='" + item.mImg + "' ></a>";
      } else {
        imgHtml += "<a href='#' class='pcImgBox' style='background-image: url(" + item.pcImg + ")'></a>";
      }
      imgHtml += "</div>";
    });
    $('.carousel-indicators').html(pointHtml);
    $('.carousel-inner').html(imgHtml);
  };
  /*监听页面窗口发生变化，自动刷新页面*/
  /*resize事件 监听浏览器窗口大小*/
  /*trigger("事件")方法 主动触发某一事件*/
  $(window).on("resize", function () {
    render();
  }).trigger("resize");
  /*移动端，触摸事件*/
  var startX = 0;
  var isMove = false;
  var distanceX = 0;
  $(".wjs_banner").on("touchstart",function (e) {
      startX = e.originalEvent.touches[0].clientX;
  }).on("touchmove",function (e) {
      var moveX = startX = e.originalEvent.touches[0].clientX;
      distanceX = moveX - startX;
      isMove = true;
  }).on("touchend",function (e) {
      if(isMove && Math.abs(distanceX) > 50){
        if(distanceX > 0) {
          $('.carousel').carousel('prev');
        }else{
          $('.carousel').carousel('next');
        }
      }
  });
};

/*产品区导航栏滑动*/
var initTabs = function () {
  /*1.保证区域的滚动结构
  * 2.保证能放下所有标签 获取所有的标签li的宽度之后给ul父容器
  * 3.初始化区域滚动
  * */
  var $parent = $(".nav-tabs-parent");
  var $child = $parent.children("ul");
  var $lists = $child.find("li");
  var width = 0;
  $lists.each(function (i,item) {
    /*
    * width() 获取内容的宽度
    * innerWidth() 获取内边距+内容的宽度
    * outerWidth() 获取内边距+内容+边框的宽度
    * outerWidth(true) 获取内边距+内容+边框+外边距的宽度
    *
    * */
    width += $(item).outerWidth(true);
  });
  $child.width(width);
  /*使用iscroll插件*/
  new IScroll(".nav-tabs-parent",{
    scrollX:true,
    scrollY:false
  });
};



