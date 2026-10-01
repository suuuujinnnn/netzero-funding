"use client";

import { useState } from "react";

export function CopyAccount({
  account,
  bank,
}: {
  account: string;
  bank: string;
}) {
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);

  async function copy() {
    setCopying(true);
    setStatus("계좌번호를 복사하고 있습니다.");
    try {
      await navigator.clipboard.writeText(account);
      setStatus(
        "계좌번호가 복사되었습니다. 입금 후 구글 폼에 참여 내역을 제출해 주세요.",
      );
    } catch {
      setStatus(
        "자동 복사가 지원되지 않습니다. 계좌번호를 직접 선택해 복사해 주세요.",
      );
    } finally {
      setCopying(false);
    }
  }

  return (
    <>
      <div className="bank-box">
        <div>
          <span>{bank}</span>
          <strong id="account-number">{account}</strong>
        </div>
        <button
          type="button"
          id="copy-account"
          aria-label="계좌번호 복사"
          disabled={copying}
          onClick={copy}
        >
          {copying ? "복사 중" : "복사"}
        </button>
      </div>
      <p
        className="copy-status"
        id="copy-status"
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </>
  );
}
