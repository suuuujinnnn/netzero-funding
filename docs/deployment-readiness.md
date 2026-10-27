# 배포 전 점검

Next.js 화면과 `/api/funding`은 구현됐고 로컬 빌드와 브라우저 동작을 확인했습니다. 실제 Vercel 배포와 서비스 계정으로 Google Sheets를 조회하는 운영 검증은 아직 완료되지 않았습니다.

## 외부 설정

1. [시트 안내](funding-sheet-setup.md)에 따라 서비스 계정, 시트 뷰어 권한, Vercel 서버 환경변수를 설정합니다. 원본 응답 탭을 웹에 게시하지 않습니다.
2. `/api/funding`에서 실제 0원·0건의 `ready` 응답을 확인하고, 확인 완료·공개 동의·정정·취소 흐름을 비식별 검증값으로 점검합니다.
3. 외부 구글 폼의 사용처·개인정보 공개 동의·이메일 안내가 페이지와 일치하는지 운영자가 확인합니다.
4. Vercel에서는 저장소 루트를 Next.js 프로젝트로 설정하고 `pnpm install --frozen-lockfile`, `pnpm build`를 사용합니다. 배포 후 HTTPS에서 폼 이동·계좌 복사·집계 갱신을 확인합니다.

운영 도메인은 `https://netzero-funding.vercel.app`으로 메타데이터에 설정했습니다. 공유 이미지는 아직 없습니다. 디자인 검토용 `deployment/`와 `docs/mockup/`은 운영 배포 대상이 아닙니다.
