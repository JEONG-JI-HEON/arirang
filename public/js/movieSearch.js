var movieData_title = document.querySelectorAll(".movieData_title");
var movieData_director = document.querySelectorAll(".movieData_director");

// 문자열내 b태그 없애기(제목)
for (i = 0; i < movieData_title.length; i++) {
  oriText = movieData_title[i].innerText;
  newText = oriText.replace(/(<([^>]+)>)/gi, "");
  movieData_title[i].innerText = newText;
}

// 문자열내 한글만 남기기(감독)
for (i = 0; i < movieData_director.length; i++) {
  oriText1 = movieData_director[i].innerText;
  newText1 = oriText1.replace(
    /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]+$/g,
    ""
  );
  movieData_director[i].innerText = newText1;
}
