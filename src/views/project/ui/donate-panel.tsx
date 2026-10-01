import { CopyAccount } from "@/features/copy-account";
export function DonatePanel() {
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">05 / HOW TO JOIN</span>
        <h1>기부 방법 안내</h1>
        <p>입금, 내역 제출, 확인의 세 단계로 참여합니다.</p>
      </div>
      <div className="donate-layout">
        <ol className="donate-steps">
          <li>
            <span className="step-no">01</span>
            <div>
              <h2>계좌 이체</h2>
              <p>아래 계좌로 입금한 뒤 구글 폼에 참여 내역을 제출해 주세요.</p>
              <CopyAccount bank="카카오뱅크 · 장*진" account="3333384575014" />
            </div>
          </li>
          <li>
            <span className="step-no">02</span>
            <div>
              <h2>구글 폼으로 내역 제출</h2>
              <p>
                입금자명·금액·입금일을 폼에 입력해 주세요. 제출한 내역은 입금
                확인 대기로 기록되며, 제출만으로 모금 총액에 반영되지 않습니다.
              </p>
              <a
                className="form-link"
                href="https://forms.gle/BYB5QtEWabs9sryR6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="구글 폼 작성하기 (새 창)"
              >
                구글 폼 작성하기 <span aria-hidden="true">↗</span>
              </a>
              <p className="small-note">
                구글 폼을 작성하지 않을 시, 기부 인증서를 받으실 수 없으며
                미확인 기부 내역으로 통계됩니다. 기부 인증서를 받으려면 폼에
                이메일 주소를 함께 입력해 주세요.
              </p>
            </div>
          </li>
          <li>
            <span className="step-no">03</span>
            <div>
              <h2>입금 확인</h2>
              <ul className="confirmation-points">
                <li>
                  현진 님이 실제 입금 내역과 폼 응답을 대조해 확인 완료로
                  변경합니다.
                </li>
                <li>
                  확인 완료된 금액만 모금 총액과 퍼즐에 반영됩니다. 공개에
                  동의한 참여자의 이름만 명예의 전당에 표시됩니다.
                </li>
                <li>
                  운영자가 시트에서 확인 상태나 금액을 수정하면 홈페이지가 5분
                  간격으로 다시 조회합니다. 시트 게시 지연으로 반영까지 시간이
                  걸릴 수 있습니다.
                </li>
                <li>
                  입금 내용이 다르면 운영자가 실제 입금 내역을 기준으로 시트를
                  정정한 뒤 반영합니다.
                </li>
              </ul>
            </div>
          </li>
        </ol>
        <aside className="donate-aside">
          <span>BEFORE YOU JOIN</span>
          <h2>참여 전 확인</h2>
          <p>
            입금 후 구글 폼에 입금자명과 참여 내역을 정확히 제출해 주세요.
            운영팀의 확인 후 공개에 동의한 내역을 반영합니다.
          </p>
          <button
            type="button"
            className="next-panel aside-back"
            data-project-tab="plan"
          >
            사용계획 다시 보기 <span aria-hidden="true">→</span>
          </button>
        </aside>
      </div>
    </>
  );
}
