import Image from "next/image";

export function PartnersPanel() {
  return (
    <>
      <div className="panel-heading">
        <span className="eyebrow">03 / PARTNERS</span>
        <h1>함께하는 단체</h1>
        <p>기획, 지원, 인증서 구매를 맡은 주체를 소개합니다.</p>
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
            <h2>
              프로젝트 제로섬 <small>ZEROSUM</small>
            </h2>
            <p>
              국민대학교 넷제로 동아리의 대학생 팀. 강의실 전력량 산정과
              프로젝트 운영을 맡습니다.
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
            <p>학생이 주도하는 캠퍼스 에너지 전환 활동을 지원합니다.</p>
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
            <p>기후변화 대응을 위한 대학 내 활동을 지원합니다.</p>
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
              재생에너지 인증서 판매와 소각을 담당하는 협력 단체로
              소개되었습니다.
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
