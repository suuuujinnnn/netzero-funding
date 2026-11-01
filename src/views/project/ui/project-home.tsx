import {
  ArrowUpRight,
  BookOpen,
  FileCheck2,
  Leaf,
  Users,
  Zap,
} from "lucide-react";

export function ProjectHome() {
  return (
    <>
      <section
        className="explain-flow mk-wrap"
        aria-labelledby="explain-heading"
      >
        <div className="explain-heading">
          <p className="dev-kicker">FROM OUR CLASSROOM TO CHANGE</p>
          <h2 id="explain-heading">
            한 교실의 선택이
            <br />
            환경적 가치로 이어지기까지.
          </h2>
          <p>모금의 목적과 진행 방식을 하나의 흐름으로 살펴보세요.</p>
        </div>
        <ol className="explain-stages">
          <li className="explain-target">
            <span className="explain-number">01</span>
            <div>
              <p className="explain-label">대상 교실과 목표</p>
              <h3>우리의 출발점은 북악관 801호입니다.</h3>
              <dl>
                <div>
                  <dt>목표 전력량</dt>
                  <dd>
                    약 <strong>8,000</strong> kWh
                  </dd>
                </div>
                <div>
                  <dt>목표 모금액</dt>
                  <dd>
                    약 <strong>800,000</strong> 원
                  </dd>
                </div>
              </dl>
              <p>국민대학교 구성원이 함께 만들어갈 목표입니다.</p>
            </div>
            <BookOpen size={65} strokeWidth={1} />
          </li>
          <li>
            <span className="explain-number">02</span>
            <div>
              <p className="explain-label">참여</p>
              <h3>학생의 작은 선택을 모읍니다.</h3>
              <p>
                절약을 넘어, 전력 소비자인 개인도 에너지 전환의 주체가 되는
                실험입니다.
              </p>
              <a href="#donate">
                참여 방법 확인하기 <ArrowUpRight size={16} />
              </a>
            </div>
            <Users size={65} strokeWidth={1} />
          </li>
          <li>
            <span className="explain-number">03</span>
            <div>
              <p className="explain-label">전력량 산정</p>
              <h3>한 교실이 사용하는 전력량을 계산합니다.</h3>
              <div className="explain-equation">
                <span>국민대학교 전력 사용량</span>
                <span aria-hidden="true">·</span>
                <span>건물 단위 면적</span>
                <span aria-hidden="true">→</span>
                <strong>801호 연간 전력량 산정</strong>
              </div>
              <a href="#plan">
                산정과 사용계획 자세히 보기 <ArrowUpRight size={16} />
              </a>
            </div>
            <Zap size={65} strokeWidth={1} />
          </li>
          <li>
            <span className="explain-number">04</span>
            <div>
              <p className="explain-label">REC 구매</p>
              <h3>모금액으로 재생에너지 인증서를 구매합니다.</h3>
              <p>
                굿뉴스에너지와 협력하여 산정 전력량에 상응하는 REC를 구매합니다.
                기부금은 재생에너지의 환경가치 조달에 전액 사용합니다.
              </p>
              <div className="explain-rec-split">
                <span>재생에너지 발전</span>
                <span aria-hidden="true">→</span>
                <div>
                  <span>
                    전기 자체 <small>직접 공급하지 않음</small>
                  </span>
                  <strong>
                    환경적 가치 <span>REC로 구매</span>
                  </strong>
                </div>
              </div>
              <p className="explain-note">
                REC 구매는 강의실에 재생에너지 전력을 직접 공급하거나 전기요금을
                납부하는 방식이 아닙니다.
              </p>
            </div>
            <FileCheck2 size={65} strokeWidth={1} />
          </li>
          <li className="explain-result">
            <span className="explain-number">05</span>
            <div>
              <p className="explain-label">환경가치 확보</p>
              <h3>사용 전력량만큼, 재생에너지의 가치를 선택합니다.</h3>
              <p>
                북악관 801호를 시작으로 학생이 주도하는 캠퍼스 에너지 전환의
                가능성을 찾아갑니다.
              </p>
              <p className="explain-note">
                달성된 성과가 아닌 프로젝트의 목표입니다. 목표금액 미달 시 모금
                규모에 맞게 사업계획을 조정합니다.
              </p>
              <a href="#overview">
                프로젝트 배경과 REC 알아보기 <ArrowUpRight size={16} />
              </a>
            </div>
            <Leaf size={65} strokeWidth={1} />
          </li>
        </ol>
      </section>
      <section className="explain-end mk-wrap">
        <p>학생의 선택으로 시작하는 캠퍼스 에너지 전환</p>
        <a className="mk-button" href="#donate">
          참여 방법 확인하기 <ArrowUpRight size={18} />
        </a>
      </section>
    </>
  );
}
