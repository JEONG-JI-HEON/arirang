function checkAll() {
  // id 체크 함수 호출
  if (!checkId(form.user_id.value)) {
    return false;
  }
  // pw 체크 함수 호출
  else if (!checkPw(form.user_id.value, form.user_pw.value, form.user_pwCheck.value)) {
    return false;
  }
  // 이름 체크 함수 호출
  else if (!checkName(form.user_name.value)) {
    return false;
  }
  else if (!checkNull(form.user_birth.value, '생년월일를')) {
    return false;
  }
  else if (!checkNull(form.user_phoneNum.value, '휴대전화를')) {
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

// id 체크 함수
function checkId(id) {
  // 공백 체크 함수 호출
  if (!checkNull(id, '아이디를')) return false;

  // 정규표현식 사용
  var idRegExp = /^[a-zA-z0-9]{4,12}$/;

  // 아이디 유효성 검사
  if (!idRegExp.test(id)) {
    alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력하세요.");
    // 값을 초기화
    form.user_id.value = "";
    // 마우스 커서 초점을 맞춰줌
    form.user_id.focus();
    return false;
  }
  return true;
}

// pw 체크 함수
function checkPw(id, pw, pw2) {
  // 공백 체크 함수 호출
  if (!checkNull(pw, "비밀번호를")) return false;
  if (!checkNull(pw2, "비밀번호 확인을")) return false;

  // 정규표현식 사용
  var pwRegExp = /^[a-zA-z0-9]{4,12}$/;

  // 비밀번호 유효성 검사
  if (!pwRegExp.test(pw)) {
    alert("비밀번호는 영문 대소문자와 숫자 4~12자리로 입력하세요.");
    // 값을 초기화
    form.user_pw.value = "";
    // 마우스 커서 초점을 맞춰줌
    form.user_pw.focus();
    return false;
  }

  // 비밀번호와 비밀번호 확인 값이 일치하지 않은경우
  if (pw != pw2) {
    alert("두 비밀번호가 일치하지 않습니다.");
    // 값을 초기화
    form.user_pw.value = "";
    form.user_pwCheck.value = "";
    // 마우스 커서 초점을 맞춰줌
    form.user_pwCheck.focus();
    return false;
  }

  // 아이디와 비밀번호가 일치한 경우
  if (id == pw) {
    alert("아이디와 비밀번호가 동일합니다.");
    // 값을 초기화
    form.user_pw.value = "";
    form.user_pwCheck.value = "";
    // 마우스 커서 초점을 맞춰줌
    form.user_pw.focus();
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
    form.user_name.value = "";
    // 마우스 커서 초점을 맞춰줌
    form.user_name.focus();
    return false;
  }
  return true;
}

