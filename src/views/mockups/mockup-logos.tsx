import Image from "next/image";

export function MockupLogos() {
  return (
    <div className="study-logos" aria-label="프로젝트 참여 단체">
      <Image
        src="/assets/logo/zerosum_white.svg"
        alt="제로섬"
        width={48}
        height={60}
        unoptimized
      />
      <Image
        src="/assets/logo/kookmin.svg"
        alt="국민대학교 기후변화대응사업단"
        width={518}
        height={119}
        unoptimized
      />
      <Image
        src="/assets/logo/good.svg"
        alt="굿뉴스에너지"
        width={2504}
        height={916}
        unoptimized
      />
    </div>
  );
}
