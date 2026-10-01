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
              <p>입금 내역을 제출하면 운영팀이 참여를 확인할 수 있습니다.</p>
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
                  확인된 기부 내역은 공개에 동의한 참여자에 한해 표시됩니다.
                </li>
                <li>
                  구글 폼과 입금 내역의 교차 검증이 진행된 이후에 후원자 목록에
                  등재됩니다.
                </li>
                <li>
                  교차 검증 기간으로 인해 후원자 목록 등재는 최대 일주일 정도
                  늦어질 수 있습니다.
                </li>
                <li>
                  구글 폼과 입금 내역이 동일하지 않을 시 입금 내역을 기준으로
                  후원자 목록에 등재됩니다.
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
