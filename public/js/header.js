/* header */
let gnb = document.querySelector("#gnb_wrap");
let gnb_bg = document.querySelector(".gnb_bg");
let lnb = document.querySelectorAll(".lnb");

/* 배경 */
gnb.addEventListener("mouseenter", () => {
  gnb_bg.style.height = "250px";
  for (i = 0; i < lnb.length; i++) {
    lnb[i].style.height = "250px";
    lnb[i].style.opacity = 1;
  }
});

gnb.addEventListener("mouseleave", () => {
  gnb_bg.style.height = "0px";
  for (i = 0; i < lnb.length; i++) {
    lnb[i].style.height = "0px";
    lnb[i].style.opacity = 0;
  }
});

/* 글씨 그림자효과 */
let info = document.querySelectorAll(".lnb>li>a");

info.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    e.style.textShadow = "2px 2px 2px #fff";
  });
  e.addEventListener("mouseleave", () => {
    e.style.textShadow = "0px 0px 0px";
  });
});

/* subheader */
let subGnb = document.querySelectorAll("#sub_menu");

subGnb.forEach((gnb) => {
  let subGnb_bg = gnb.firstElementChild;
  let subLnb = gnb.lastElementChild;

  gnb.addEventListener("mouseenter", () => {
    subGnb_bg.style.height = "250px";

    subLnb.style.height = "250px";
    subLnb.style.opacity = 1;
  });

  gnb.addEventListener("mouseleave", () => {
    subGnb_bg.style.height = "0px";

    subLnb.style.height = "0px";
    subLnb.style.opacity = 0;
  });
});

/* 토글 사이드 바 버튼 관련 */
$(".toggle-side-bar-btn").click(function () {
  //console.log("토글 사이드바 버튼클릭");

  var $clicked = $(this);
  var nowAnimating = $clicked.attr("data-ico-now-animating");

  /* 만약 토글 사이드바 버튼의 요소가 Y가 되면 */
  if (nowAnimating == "Y") {
    return;
    /* 함수를 리턴하여 다시 안눌리게 한다 */
  }

  /* 만약 클릭된 버튼에 active 클래스가 있다면 */
  if ($clicked.hasClass("active")) {
    /* 사이드바를 없앤다 */
    hiderightSideBar();
  } else {
    /* active 클래스가 없으면 나타나게 한다 */
    showrightSideBar();
  }

  /* 아이콘의 색을 빨간색으로 만듬 */
  $clicked.attr("data-ico-now-animating", "Y");

  /* 아이콘에 active 클래스가 없으면 active 클래스를 넣어주고 있으면 빼줌 */
  $clicked.toggleClass("active");

  /* 버튼 아이콘의 색이 변한 후에 0.4초 뒤에 다시 원래색으로 돌아오게 만듬 */
  setTimeout(function () {
    $clicked.attr("data-ico-now-animating", "N");
  }, 400);
});

/* 왼쪽 사이드바 함수 */
function showrightSideBar() {
  /* 메뉴바가 나올때 안에 펼쳐져 있는 메뉴들을 다 접기위해 엑티브를 없앤다 */
  $(".right-side-bar > .menu-1 ul > li.active").removeClass("active");
  $(".right-side-bar-box").addClass("active");
}

function hiderightSideBar() {
  $(".right-side-bar-box").removeClass("active");
}

/* 메뉴 접히고 펼치기 */
$(".right-side-bar > .menu-1 ul > li").click(function (e) {
  //console.log("메뉴 클릭됨");

  /* 만약 클릭된 메뉴에 엑티브 클래스가 있으면 */
  if ($(this).hasClass("active")) {
    /* 클릭된 메뉴의 엑티브를 없앤다 */
    $(this).removeClass("active");
  } else {
    /* 클릭된 메뉴의 형제의 엑티브를 없앤다 */
    $(this).siblings(".active").removeClass("active");

    /* 클릭된 메뉴(지역)의 엑티브를 없앤다 */
    $(this).find(".active").removeClass("active");

    /* 클릭된 메뉴의 엑티브를 만든다 */
    $(this).addClass("active");
  }

  /* 클릭된 메뉴 안에 다른 메뉴를 클릭하면 위에있는 메뉴가 같이 클릭되는데 그것을 막아준다 */
  e.stopPropagation();
});

/* 좌측 사이드바 배경을 클릭했을때 */
$(".right-side-bar-box").click(function () {
  //console.log('배경클릭');

  /* 토글 사이드바 버튼을 클릭한 효과를 만듬 */
  $(".toggle-side-bar-btn").click();
});

/* 사이드바를 클릭할때 상위요소인 배경이 같이 클릭되어서 사이드바가 들어가버리기 때문에 그것을 막음 */
$(".right-side-bar").click(function (e) {
  e.stopPropagation();
});
