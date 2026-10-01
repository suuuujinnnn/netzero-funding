# 국민대 넷제로 강의실 만들기 프로젝트

학생이 캠퍼스 강의실의 전력 사용량을 산정하고, 이에 상응하는 재생에너지 환경가치에 함께 참여하는 캠페인의 Next.js 프론트엔드입니다.

## 실행과 검증

Node.js 24와 저장소에 지정된 pnpm 버전을 사용합니다.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm agent:verify
pnpm build
pnpm start --port 3001
```

개발 서버는 `http://localhost:3001`에서 실행합니다. `npm run dev`도 같은 포트를 사용합니다. 3000 포트의 다른 프로젝트와 겹치지 않습니다.

## 배포

Vercel 프로젝트의 Root Directory는 저장소 루트, Framework Preset은 Next.js를 사용합니다. Install Command는 `pnpm install --frozen-lockfile`, Build Command는 `pnpm build`입니다. `deployment/`와 `docs/mockup/`은 보존한 디자인 참고 자료이며 운영 배포 대상이 아닙니다.

이 저장소의 화면은 모금 소개·사용계획·관련단체·참여 내역·기부하기 탭으로 구성됩니다. 구글 폼은 [참여 내역 제출 폼](https://forms.gle/BYB5QtEWabs9sryR6)으로 연결합니다. 폼 제출은 외부 서비스에서 처리하며 프론트엔드에서 입금이나 제출 완료를 판정하지 않습니다.

목표 800,000원, 목표 전력량 8,000kWh, 모금기간 2026.10.08~12.25, 사업기간 2026.10.08~2027.02.28 및 계좌는 운영자가 확인한 값입니다. 현재 모금액·참여 건수·명단은 실제 집계 자료가 연결되기 전까지 표시하지 않습니다. 퍼즐·교실 청소는 미정이므로 공개 화면에서 제외했고 기존 소스는 보존했습니다.

배포 도메인과 공유 이미지는 확정 후 메타데이터에 반영합니다. 실제 배포는 별도 작업이며 여기의 검증 결과는 로컬 프로덕션 빌드 기준입니다.

[배포 준비 점검 결과](docs/deployment-readiness.md)에 검증 범위와 외부 폼의 남은 운영 항목을 기록했습니다.

## 작업 문서

[아키텍처](docs/architecture.md), [프론트엔드 규칙](docs/frontend-rules.md), [디자인](DESIGN.md), [API 경계](docs/api-boundary.md), [자산](docs/assets.md), [UI 검증](docs/ui-verification.md), [작업 흐름](docs/agent-workflow.md), [테스트와 doctor](docs/test-and-doctor.md), [배포 메타데이터](docs/deployment-metadata.md)를 참고합니다.

기존 [v4 디자인 기준](docs/mockup/v4.html)과 [단일 파일 기록](docs/mockup/exports/v4.html)은 참고용으로 보존합니다. 실제 운영 정보와 동작의 기준은 `src/` 구현입니다.

## 모금 집계

[구글 시트 운영·연결 안내](docs/funding-sheet-setup.md)에 따라 공개 CSV를 연결합니다. 최초 주소 설정에는 재배포가 필요하며 이후 확인 완료 금액·공개 동의한 이름은 5분 간격으로 자동 조회됩니다. 실제 폼·시트는 별도로 설정해야 합니다. 초기 집계는 0원·0건이고 v4의 세 가지 목업은 기록으로 보존합니다.
