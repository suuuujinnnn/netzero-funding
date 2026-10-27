import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileCheck2,
  Leaf,
  MoveRight,
  Sparkles,
  Sun,
  Users,
  Zap,
} from "lucide-react";
import { FundingPuzzle } from "@/views/project/ui/funding-puzzle";
import { MockupHall } from "./mockup-hall";

type HomeProps = {
  variant: "a-1" | "a-2" | "b";
  introHref: string;
  donateHref: string;
};
const effects = [
  {
    icon: Leaf,
    title: "에너지의 가치를 선택",
    text: "사용 전력량에 상응하는 REC를 구매해 재생에너지의 환경적 가치를 확보하고자 합니다.",
  },
  {
    icon: Users,
    title: "학생이 만드는 전환",
    text: "절약을 넘어 전력 소비자인 개인도 에너지 전환의 주체가 되는 실험입니다.",
  },
  {
    icon: BookOpen,
    title: "캠퍼스에서 시작",
    text: "매일 머무는 북악관 801호에서 작은 변화의 가능성을 찾아갑니다.",
  },
];

function RecNote({ href }: { href: string }) {
  return (
    <aside className="dev-rec">
      <FileCheck2 size={25} />
      <div>
        <strong>
          REC는 재생에너지의 ‘환경적 가치’를 구매하는 인증서입니다.
        </strong>
        <p>
          강의실에 재생에너지 전력을 직접 공급하거나 전기요금을 납부하는 방식은
          아닙니다.
        </p>
      </div>
      <Link href={href}>
        자세히 알아보기 <ArrowUpRight size={17} />
      </Link>
    </aside>
  );
}

function Flow({ playful = false }: { playful?: boolean }) {
  return (
    <ol className={playful ? "dev-flow dev-flow-play" : "dev-flow"}>
      {[
        {
          icon: BookOpen,
          title: "전력량 산정",
          text: "801호의 연간 전력 사용량 계산",
        },
        {
          icon: FileCheck2,
          title: "REC 구매",
          text: "굿뉴스에너지와 협력해 인증서 구매",
        },
        {
          icon: Leaf,
          title: "환경가치 확보",
          text: "사용 전력량에 상응하는 가치 조달",
        },
      ].map(({ icon: Icon, title, text }, i) => (
        <li key={title}>
          <span className="dev-flow-no">0{i + 1}</span>
          <Icon size={32} strokeWidth={1.5} />
          <h3>{title}</h3>
          <p>{text}</p>
          {i < 2 && <ArrowRight className="dev-flow-arrow" size={22} />}
        </li>
      ))}
    </ol>
  );
}

export function MockupHome({ variant, introHref, donateHref }: HomeProps) {
  if (variant === "a-1")
    return (
      <main id="mockup-main" className="garden-home">
        <section className="garden-board mk-wrap">
          <div className="garden-heading">
            <p className="dev-kicker">
              <span /> OUR FIRST GREEN CLASSROOM
            </p>
            <h1>
              우리 교실의 에너지,
              <br />
              <em>다음 장면을 함께.</em>
            </h1>
            <p>작은 마음을 모아, 재생에너지의 가치를 선택해요.</p>
          </div>
          <div className="garden-scene">
            <Image
              src="/assets/mockups/green-classroom.png"
              alt="나무와 책상, REC 인증서를 곁들인 작은 교실의 입체 콘셉트 일러스트"
              fill
              sizes="(max-width: 760px) 100vw, 70vw"
              priority
            />
            <span className="garden-scene-label">
              <span /> 북악관 801호 · 우리가 바꿔갈 첫 교실
            </span>
          </div>
          <article className="garden-card garden-goal">
            <p className="garden-card-label">
              <Sun size={17} /> OUR MISSION <span>01</span>
            </p>
            <h2>
              한 교실만큼의
              <br />
              새로운 선택
            </h2>
            <div className="garden-ring">
              <div>
                <strong>8,000</strong>
                <span>kWh · 목표 전력량</span>
              </div>
            </div>
            <p>
              우리가 쓰는 전력량만큼
              <br />
              재생에너지의 가치를 모아요.
            </p>
            <span className="garden-card-tag">
              <Leaf size={12} /> 재생에너지 인증서 REC
            </span>
          </article>
          <article className="garden-card garden-join">
            <p className="garden-card-label">
              <Sparkles size={17} /> MAKE IT HAPPEN
            </p>
            <h2>
              우리의 목표는
              <br />
              <strong>
                800,000<span>원</span>
              </strong>
            </h2>
            <div className="garden-target-track" aria-hidden="true">
              {Array.from({ length: 26 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <p>2026.10.08 — 12.25 모금기간</p>
            <Link className="mk-button" href={donateHref}>
              초록빛 선택에 함께하기 <ArrowUpRight size={18} />
            </Link>
            <small>목표를 나타낸 화면이며, 실시간 집계는 미연결입니다.</small>
          </article>
          <div className="garden-floating-tag">
            <Leaf size={19} />
            <div>
              <strong>환경적 가치</strong>
              <span>환경가치를 선택하는 방법</span>
            </div>
          </div>
          <div className="garden-caption">
            <span>THE CLASSROOM EDIT / 801</span>
            <p>
              학생의 선택이 모여
              <br />
              새로운 가능성이 자랍니다.
            </p>
            <ArrowDown size={22} />
          </div>
        </section>
        <section className="garden-benefits mk-wrap">
          <div>
            <p className="dev-kicker">SMALL CHOICE, NEW POSSIBILITY</p>
            <h2>참여가 자라나는 방향.</h2>
            <p>이번 프로젝트로 만들어가고 싶은 변화예요.</p>
            <Link href={introHref}>
              프로젝트 이야기 읽기 <MoveRight size={17} />
            </Link>
          </div>
          <div className="garden-benefit-list">
            {effects.map(({ icon: Icon, title, text }, i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <Icon size={24} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="garden-path mk-wrap">
          <div>
            <p className="dev-kicker">THE PATH TO CHANGE</p>
            <h2>마음이 모여 가치가 되기까지.</h2>
          </div>
          <Flow />
          <RecNote href={introHref} />
        </section>
        <MockupHall />
        <section className="garden-end mk-wrap">
          <Leaf size={35} />
          <h2>
            첫 번째 교실의 다음 장면,
            <br />
            함께 만들어볼까요?
          </h2>
          <Link className="mk-button" href={donateHref}>
            참여 방법 알아보기 <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
    );

  if (variant === "a-2")
    return (
      <main id="mockup-main" className="pop-home">
        <section className="pop-hero mk-wrap">
          <div className="pop-topline">
            <span>STUDENT-POWERED ENERGY PROJECT</span>
            <span>국민대 북악관 801호에서 시작!</span>
          </div>
          <span className="pop-doodle pop-doodle-one" aria-hidden="true">
            ✳
          </span>
          <span className="pop-stamp">
            OUR
            <br />
            CLASSROOM
            <br />
            <b>OUR CHOICE!</b>
          </span>
          <p className="pop-pretitle">우리의 교실. 우리의 선택.</p>
          <h1>
            에너지 전환?
            <br />
            <span>
              우리도 <em>할 수 있지!</em>
            </span>
          </h1>
          <p className="pop-lead">
            매일 듣는 수업, 매일 쓰는 전기.
            <br />
            이번엔 우리가 에너지의 가치를 골라볼 차례.
          </p>
          <Link className="mk-button" href={donateHref}>
            좋아, 함께할래! <ArrowUpRight size={21} />
          </Link>
          <span className="pop-doodle pop-doodle-two" aria-hidden="true">
            ↘
          </span>
          <div className="pop-collage">
            <div className="pop-photo">
              <Image
                src="/assets/univ.jpg"
                alt="국민대학교 캠퍼스 전경"
                fill
                sizes="(max-width:760px) 100vw, 55vw"
                priority
              />
              <span>CHANGE STARTS ON OUR CAMPUS.</span>
            </div>
            <div className="pop-ticket">
              <span>FIRST STOP</span>
              <strong>801</strong>
              <p>
                북악관에서 시작하는
                <br />
                우리의 작은 실험
              </p>
              <span className="pop-ticket-barcode" aria-hidden="true" />
            </div>
            <div className="pop-note pop-note-blue">
              <Zap size={31} />
              <strong>
                절약 다음은?
                <br />
                에너지 선택!
              </strong>
              <span>ONE STEP FURTHER ↗</span>
            </div>
            <div className="pop-note pop-note-orange">
              <span>OUR GOAL</span>
              <strong>
                80<span>만원</span>
              </strong>
              <p>
                재생에너지의 환경가치를
                <br />
                모으기 위한 목표금액
              </p>
            </div>
            <span className="pop-flower" aria-hidden="true">
              ✿
            </span>
          </div>
        </section>
        <div className="pop-ticker">
          <span>
            SMALL CHOICE ✳ BIG POSSIBILITY ✳ OUR CLASSROOM ✳ OUR ENERGY ✳
          </span>
        </div>
        <section className="pop-effects mk-wrap">
          <div className="pop-section-label">01 / WHY JOIN?</div>
          <h2>
            내 참여는
            <br />
            <span>어디로 향할까?</span>
          </h2>
          <div className="pop-effect-cards">
            {effects.map(({ icon: Icon, title, text }, i) => (
              <article key={title}>
                <span className="pop-card-sticker">{["✳", "↗", "✺"][i]}</span>
                <Icon size={35} />
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="pop-card-bottom">
                  POSSIBILITY 0{i + 1} <ArrowUpRight size={20} />
                </span>
              </article>
            ))}
          </div>
        </section>
        <section className="pop-how mk-wrap">
          <div className="pop-section-label">02 / FOLLOW THE ENERGY</div>
          <h2>
            모인 마음의 <em>행선지.</em>
          </h2>
          <Flow playful />
          <RecNote href={introHref} />
          <Link className="pop-more" href={introHref}>
            잠깐, 프로젝트가 더 궁금해! <ArrowUpRight size={22} />
          </Link>
        </section>
        <MockupHall />
        <section className="pop-finale">
          <p>2026.10.08 — 12.25</p>
          <h2>
            LET’S MAKE
            <br />
            <em>OUR CHOICE.</em>
          </h2>
          <Link className="mk-button" href={donateHref}>
            우리 교실의 변화에 참여하기 <ArrowUpRight size={22} />
          </Link>
          <span aria-hidden="true">✳</span>
        </section>
      </main>
    );

  return (
    <main id="mockup-main" className="formal-home">
      <section className="formal-hero mk-wrap">
        <div className="formal-intro">
          <p className="dev-kicker">PROJECT ZEROSUM × NET ZERO</p>
          <h1>
            국민대 넷제로
            <br />
            <em>강의실 만들기</em>
          </h1>
          <p>
            학생의 선택으로 시작하는 캠퍼스 에너지 전환.
            <br />
            북악관 801호가 사용한 전력량만큼,
            <br />
            재생에너지의 환경적 가치를 확보하고자 합니다.
          </p>
          <div className="mk-actions">
            <Link className="mk-button" href={donateHref}>
              모금에 참여하기 <ArrowUpRight size={18} />
            </Link>
            <Link className="mk-text-link" href={introHref}>
              프로젝트 소개 <MoveRight size={17} />
            </Link>
          </div>
          <div className="formal-hero-meta">
            <span>모금기간</span>
            <strong>2026.10.08 — 2026.12.25</strong>
          </div>
        </div>
        <div className="formal-puzzle puzzle-card">
          <div className="puzzle-heading">
            <span>HALL OF ENERGY</span>
            <Link href="/mockups/b?details=1#history">명예의 전당 ↗</Link>
          </div>
          <h2>
            한 조각씩 완성해 갈<br />
            우리의 첫 번째 교실
          </h2>
          <FundingPuzzle
            amount={null}
            ariaLabel="실제 집계가 미연결된 24조각 교정 퍼즐 목업"
          />
          <div className="formal-puzzle-note">
            <span className="formal-live-dot" />
            모금 집계 미연결 · 실제 참여 현황은 표시하지 않습니다.
          </div>
        </div>
      </section>
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
              <Link href={donateHref}>
                참여 방법 확인하기 <ArrowUpRight size={16} />
              </Link>
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
              <Link href="/mockups/b?details=1#plan">
                산정과 사용계획 자세히 보기 <ArrowUpRight size={16} />
              </Link>
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
              <Link href={introHref}>
                프로젝트 배경과 REC 알아보기 <ArrowUpRight size={16} />
              </Link>
            </div>
            <Leaf size={65} strokeWidth={1} />
          </li>
        </ol>
      </section>
      <section className="explain-end mk-wrap">
        <p>학생의 선택으로 시작하는 캠퍼스 에너지 전환</p>
        <Link className="mk-button" href={donateHref}>
          참여 방법 확인하기 <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
