export function OverviewPanel() {
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">01 / INTRODUCTION</span>
        <h1>
          우리가 쓰는 에너지의 가치를
          <br />
          우리가 고를 수 있을까?
        </h1>
        <p>교실에서 시작하는 학생 주도의 재생에너지 참여 실험</p>
      </div>
      <div className="prose">
        <article>
          <h2>교실에서 사용되는 에너지의 가치를 우리가 고를 수 있을까?</h2>
          <p>
            전 세계 온실가스 배출량의 약 75% 이상이 에너지와 관련되어 있습니다.
            따라서 화석연료 중심의 시스템을 무탄소 에너지원으로 전환하는 것이
            매우 중요한 상황입니다. 하지만 개인 차원에서 강의실의 전력 계약을
            바꾸거나 태양광 설비를 직접 설치하는 것은 현실적으로 어렵습니다.
            따라서 저희{" "}
            <strong className="reference-emphasis">
              국민대학교 넷제로 동아리
            </strong>{" "}
            학생들은 전기를 절약하는 것을 넘어, 우리가 쓰는 에너지의 가치를 직접
            선택하고자 합니다.
          </p>
        </article>
        <article>
          <h2>개인도 에너지 전환의 주체가 될 수 있습니다.</h2>
          <p>
            현재 대한민국에서 재생에너지 전환은 주로 국가와 기업을 중심으로
            추진되고 있으며 개인의 참여 방식은 제한적입니다. 하지만 진정한
            재생에너지 전환을 위해서는 전력 소비자인 개인도 적극적인 참여가
            필요합니다. 기존의 환경 캠페인은 주로 소등이나 냉난방 조절 같은
            절약과 감축에 맞춰져 있었습니다. 하지만 넷제로 강의실 만들기
            프로젝트는 여기서 한 걸음 더 나아가{" "}
            <strong className="reference-emphasis">
              재생에너지 인증서(REC)
            </strong>
            를 구매함으로써 재생에너지로 생산되었다는 환경적 가치를 확보하고자
            합니다.
          </p>
        </article>
        <article className="callout">
          <div className="callout-icon" aria-hidden="true">
            i
          </div>
          <div>
            <h2>넷제로 동아리가 선택한 재생에너지 인증서란?</h2>
            <p>
              인증서를 구매한다고 해서 발전소에서 생산된 재생에너지 전력을
              강의실로 직접 끌어와서 사용하는 것은 아닙니다. 재생에너지 발전
              사업자는 전기를 생산할 때 발생하는 &apos;전기 자체&apos;와
              &apos;재생에너지로 생산되었다는 환경적 가치&apos;를 각각 분리하여
              별도로 판매할 수 있습니다. 우리는 그중에서 &apos;재생에너지로
              생산되었다는 환경적 가치&apos;만을 인증서(REC)의 형태로 구매하는
              것입니다. 강의실로 들어오는 물리적인 전기 자체를 당장 바꿀 수는
              없지만, 이 인증서를 구매함으로써 우리가 사용한 전력량만큼
              재생에너지의 수요를 직접 창출하고 실질적인 환경적 가치를 온전히
              확보할 수 있습니다.
            </p>
          </div>
        </article>
        <article>
          <h2>프로젝트 제로섬(ZEROSUM)을 소개합니다</h2>
          <p>
            저희는 국민대학교 넷제로 동아리에 소속된 8명의 대학생들 팀 프로젝트
            제로섬(ZEROSUM)입니다. 우리가 매일 수업을 듣고 머무는 캠퍼스
            공간에서부터 기후 위기 대응을 직접 실천해보고자 이번 2학기를 맞아
            &apos;국민대 넷제로 강의실 만들기 프로젝트&apos;를 기획하게
            되었습니다. 학생이 주도하는 에너지 전환이라는 하나의 목표 아래 모인
            8명의 팀원들은 이번 프로젝트를 통해 대학 사회에 작지만 확실한 변화를
            만들어가고자 합니다.
          </p>
        </article>
      </div>
      <div className="panel-bottom">
        <span>다음으로 살펴보기</span>
        <button type="button" className="next-panel" data-project-tab="plan">
          사용계획 보기 <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  );
}
