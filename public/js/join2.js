let idCheck = document.querySelector("#idCheck");
let accountCheck = document.querySelector("#accountCheck");

function checkAll() {
  // id 체크 함수 호출
  if (!checkId(joinform.user_id.value)) {
    idCheck.value = "0";
    return false;
  }
  // id 중복 체크 여부
  else if (idCheck.value == "0") {
    alert("아이디 중복확인을 해주세요.");
    return false;
  }
  // pw 체크 함수 호출
  else if (
    !checkPw(
      joinform.user_id.value,
      joinform.user_pw.value,
      joinform.user_pwCheck.value
    )
  ) {
    return false;
  }
  // 이름 체크 함수 호출
  else if (!checkName(joinform.user_name.value)) {
    return false;
  }
  // 생년월일 체크 함수 호출
  else if (!checkbirth(joinform.user_birth.value)) {
    return false;
  }
  // 이메일 체크 함수 호출
  else if (!checkMail(joinform.user_mail.value)) {
    return false;
  }
  // 우편번호 체크 함수 호출
  else if (!checkNull(joinform.zipCode.value, "우편번호를")) {
    return false;
  }
  // 기본주소 체크 함수 호출
  else if (!checkNull(joinform.user_address.value, "기본주소를")) {
    return false;
  }
  // 상세주소 체크 함수 호출
  else if (!checkNull(joinform.user_addressMore.value, "상세주소를")) {
    return false;
  }
  // 휴대전화 체크 함수 호출
  else if (!checkPhoneNum(joinform.user_phoneNum.value)) {
    return false;
  }
  // 회원가입 완료
  alert("회원가입에 성공하였습니다.");
}

// 공백 체크 함수
function checkNull(value, data) {
  // 유효성 검사
  if (value == "") {
    alert(data + " 입력해주세요.");
    return false;
  }
  return true;
}

// 생년월일 체크 함수
function checkbirth(birth) {
  // 공백 체크 함수 호출
  if (!checkNull(birth, "생년월일을")) return false;

  // 정규표현식 사용
  var birthRegExp =
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
  // 생년월일 유효성 검사
  if (!birthRegExp.test(birth)) {
    alert("잘못된 생년월일입니다. 다시 입력해 주십시오.");
    return false;
  }
  return true;
}

// id 체크 함수
function checkId(id) {
  // 공백 체크 함수 호출
  if (!checkNull(id, "아이디를")) return false;

  // 정규표현식 사용
  var idRegExp = /^[a-zA-z0-9]{5,12}$/;

  // 아이디 유효성 검사
  if (!idRegExp.test(id)) {
    alert("아이디는 영문 대소문자와 숫자 5~12자리로 입력하세요.");
    // 값을 초기화
    joinform.user_id.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_id.focus();
    return false;
  }
  return true;
}

// id 중복체크 함수
function confirmId() {
  let inputId = joinform.user_id.value;
  for (i = 0; i < arguments.length; i++) {
    if (!inputId) {
      idCheck.value = "0";
      alert("아이디를 입력하세요.");
      return false;
    }
    if (arguments[i] == inputId) {
      idCheck.value = "0";
      alert("중복된 아이디 입니다.");
      return false;
    }
  }
  idCheck.value = "1";
  alert("사용 가능한 아이디 입니다.");
  return true;
}

// pw 체크 함수
function checkPw(id, pw, pw2) {
  // 공백 체크 함수 호출
  if (!checkNull(pw, "비밀번호를")) return false;
  if (!checkNull(pw2, "비밀번호 확인을")) return false;

  // 정규표현식 사용
  var pwRegExp = /^[a-zA-z0-9]{8,16}$/;

  // 비밀번호 유효성 검사
  if (!pwRegExp.test(pw)) {
    alert("비밀번호는 영문 대소문자와 숫자 8~16자리로 입력하세요.");
    // 값을 초기화
    joinform.user_pw.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_pw.focus();
    return false;
  }

  // 비밀번호와 비밀번호 확인 값이 일치하지 않은경우
  if (pw != pw2) {
    alert("두 비밀번호가 일치하지 않습니다.");
    // 값을 초기화
    joinform.user_pw.value = "";
    joinform.user_pwCheck.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_pwCheck.focus();
    return false;
  }

  // 아이디와 비밀번호가 일치한 경우
  if (id == pw) {
    alert("아이디와 비밀번호가 동일합니다.");
    // 값을 초기화
    joinform.user_pw.value = "";
    joinform.user_pwCheck.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_pw.focus();
    return false;
  }
  return true;
}

// 이름 체크 함수
function checkName(name) {
  // 공백 체크 함수 호출
  if (!checkNull(name, "이름을")) return false;

  // 정규표현식 사용
  var nameRegExp = /^[가-힣]{2,4}$/;
  // 이름 유효성 검사
  if (!nameRegExp.test(name)) {
    alert("이름이 올바르지 않습니다.");
    // 값을 초기화
    joinform.user_name.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_name.focus();
    return false;
  }
  return true;
}

// 휴대폰 체크 함수
function checkPhoneNum(phoneNum) {
  // 공백 체크 함수 호출
  if (!checkNull(phoneNum, "휴대전화 번호를")) return false;

  // 정규표현식 사용
  var phoneRegExp = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  // 휴대폰 번호 유효성 검사
  if (!phoneRegExp.test(phoneNum)) {
    alert("잘못된 번호입니다. 다시 입력해 주십시오.");
    // 값을 초기화
    joinform.user_phoneNum.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_phoneNum.focus();
    return false;
  }
  return true;
}

// 이메일 체크 함수
function checkMail(mail) {
  // 공백 체크 함수 호출
  if (!checkNull(mail, "이메일을")) return false;

  // 정규표현식 사용
  var mailRegExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  // 이메일 유효성 검사
  if (!mailRegExp.test(mail)) {
    alert("이메일형식이 올바르지 않습니다.");
    // 값을 초기화
    joinform.user_mail.value = "";
    // 마우스 커서 초점을 맞춰줌
    joinform.user_mail.focus();
    return false;
  }
  return true;
}

/* 하이폰 자동으로 들어가기(휴대폰 입력시) */
const autoHyphen = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/(\-{1,2})$/g, "");
};
