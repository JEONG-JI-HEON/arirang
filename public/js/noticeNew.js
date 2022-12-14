function modifyN(a) {
  if (a < 10) {
    return '0' + a;
  } else {
    return a;
  };
};

let date = new Date();

let toyear = modifyN(date.getFullYear());
let tomonth = modifyN(date.getMonth() + 1);
let todate = modifyN(date.getDate());

let write_time1 = document.querySelector('.write_time1');

window.onload(write_time1.innerText = `${toyear}-${tomonth}-${todate}`);


/* 체크박스 중복체크 불가 */
function NoMultiChk(chk) {
  var obj = document.querySelectorAll(".checkbox");
  for (var i = 0; i < obj.length; i++) {
    if (obj[i] != chk) {
      obj[i].checked = false;
    }
  }
}