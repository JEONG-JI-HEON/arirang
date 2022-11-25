/************************************** 시계만들기 **************************************/

/* 10보다 작다면 앞에 0을 붙이기 */
function modifyN(a){
  if (a < 10){
    return '0' + a;
  } else{
    return a;
  };
};

/* 15분마다 분 출력하게 하기 */
function minuteSetting(m){
  if (m < 15){
    return '00';
  } else if (m < 30){
    return '15';
  } else if (m < 45){
    return '30';
  } else if (m < 60){
    return '45';
  };
};

function timer1(){
  let date = new Date();
  let tomonth = modifyN(date.getMonth() + 1);
  let todate = modifyN(date.getDate());
  let tohour = modifyN(date.getHours());
  let tomin = minuteSetting(date.getMinutes());
  let nowTime = document.querySelector('.nowTime');
  nowTime.innerHTML = tomonth + '.' + todate + ' ' + tohour + ':' + tomin + ' 기준';
}; 

setInterval(timer1, 60000);

/************ 처음부터 시계보이게 하기 ************/
window.onload = function(){
  timer1();
  setInterval(timer1, 1000);
};
