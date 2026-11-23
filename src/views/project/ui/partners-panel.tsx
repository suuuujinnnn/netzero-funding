import Image from "next/image";

export function PartnersPanel() {
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">04 / PARTNERS</span>
        <h1>함께하는 단체</h1>
        <p>펀딩에 함께하는 단체와 각 단체의 주요 활동을 소개합니다.</p>
      </div>
      <div className="partner-list">
        <article>
          <Image
            className="partner-art"
            src="/assets/partners/zerosum.png"
            alt=""
            width={1254}
            height={1254}
            sizes="170px"
          />
          <div>
            <span className="partner-role">프로젝트 주관</span>
            <h2>프로젝트 제로섬</h2>
            <p>
              강의실 전력 사용량을 조사하고 캠퍼스의 재생에너지 전환을 실천하는
              국민대학교 넷제로 동아리 소속 학생 팀입니다.
            </p>
            <a
              href="https://www.instagram.com/netzeroroom/"
              target="_blank"
              rel="noopener noreferrer"
            >
              소식 보기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
        <article>
          <Image
            className="partner-art"
            src="/assets/partners/netzero.png"
            alt=""
            width={1254}
            height={1254}
            sizes="170px"
          />
          <div>
            <span className="partner-role">프로젝트 지원</span>
            <h2>국민대학교 넷제로 동아리</h2>
            <p>
              지속가능성 보고서 분석부터 탄소중립 포럼 참여, 교내 환경
              캠페인까지 펼치는 기후·환경 학술동아리입니다.
            </p>
            <a
              href="https://www.instagram.com/net_zero_kookminuniv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              소식 보기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
        <article>
          <Image
            className="partner-art"
            src="/assets/partners/climate.png"
            alt=""
            width={1254}
            height={1254}
            sizes="170px"
          />
          <div>
            <span className="partner-role">프로젝트 지원</span>
            <h2>국민대학교 기후변화대응사업단</h2>
            <p>
              국민대학교가 주관하는 HUSS 기후환경 컨소시엄에서 덕성여자대학교,
              울산대학교, 인하대학교, 조선대학교와 함께 융합 교육과 비교과
              프로그램을 운영합니다. 교육부와 한국연구재단의 인문사회 융합인재
              양성사업(HUSS)을 통해 기후·환경 변화에 대응할 인문사회 기반
              융합인재를 양성합니다.
            </p>
            <a
              href="https://www.climate.ac.kr/ko/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              웹사이트 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
        <article>
          <Image
            className="partner-art"
            src="/assets/partners/goodnews.png"
            alt=""
            width={1254}
            height={1254}
            sizes="170px"
          />
          <div>
            <span className="partner-role">인증서 판매 및 소각</span>
            <h2>굿뉴스에너지</h2>
            <p>
              기업 RE100 자문과 재생에너지 조달부터 개인 구독 서비스까지
              운영하는 재생에너지 전문 기업입니다.
            </p>
            <a
              href="https://goodnews.energy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              웹사이트 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </>
  );
}
