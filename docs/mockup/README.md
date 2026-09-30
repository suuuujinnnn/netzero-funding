# 목업 보관

수정 가능한 원본은 `v4.html`, `v4.css`, `v4.js`만 보관합니다. 화면과 동작의 최종 기준도 v4입니다. v1~v3 원본은 정리했습니다.

`exports/`에는 v1~v4의 CSS·JavaScript와 필요한 이미지를 내장한 단일 HTML을 둡니다. v4 히어로와 퍼즐에는 사용자가 제공한 `assets/univ.jpg`를 사용합니다. 배포용 [index.html](../../deploy/index.html)은 v4 export의 홈 링크만 `index.html`로 바꾼 파일입니다.

이 파일들은 목업 자료입니다. 정적 목업은 `deploy/`만 별도로 배포할 수 있으며, Next.js 프론트엔드 구현은 추후 `src/`에 작성합니다.
