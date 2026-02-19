"use client";

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import { ScoreResult } from "./ScoreCard";

type Props = {
  onResult: (result: ScoreResult) => void;
  onError: (message: string) => void;
  onScored?: (result: ScoreResult) => void;
};

const API_URL = "http://api:8000/resume/score";

type Status = "idle" | "dragging" | "uploading" | "error";

export default function ResumeUploader({ onResult, onError, onScored }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setError = (message: string) => {
    setStatus("error");
    setErrorMessage(message);
    onError(message);
  };

  const validatePdf = (candidate: File | null): candidate is File => {
    if (!candidate) {
      setError("Please select one PDF file.");
      return false;
    }

    const nameLooksPdf = candidate.name.toLowerCase().endsWith(".pdf");
    const isPdfType = candidate.type === "application/pdf";
    if (!isPdfType && !nameLooksPdf) {
      setError("Only PDF files are allowed.");
      return false;
    }

    return true;
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0] ?? null;
    if (!validatePdf(picked)) {
      return;
    }
    setFile(picked);
    setStatus("idle");
    setErrorMessage("");
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (status !== "uploading") {
      setStatus("dragging");
    }
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (status !== "uploading") {
      setStatus(errorMessage ? "error" : "idle");
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (status === "uploading") {
      return;
    }
    const dropped = event.dataTransfer.files?.[0] ?? null;
    if (!validatePdf(dropped)) {
      return;
    }
    setFile(dropped);
    setStatus("idle");
    setErrorMessage("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validatePdf(file)) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    setStatus("uploading");
    setErrorMessage("");
    let hasError = false;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ detail: "Upload failed" }));
        setError(payload.detail ?? "Upload failed");
        hasError = true;
        return;
      }

      const payload = (await response.json()) as ScoreResult;
      onResult(payload);
      onScored?.(payload);
      setStatus("idle");
    } catch {
      setError("Unable to reach scoring API. Please try again in a moment.");
      hasError = true;
    } finally {
      if (!hasError) {
        setStatus("idle");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: "rgba(0, 0, 0, 0.62)",
        border: "1px solid rgba(176, 190, 169, 0.40)",
        borderRadius: "14px",
        padding: "18px",
        display: "grid",
        gap: "12px",
        color: "rgba(255, 255, 255, 0.92)"
      }}
    >
      <label
        htmlFor="resume"
        style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem" }}
      >
        Resume PDF
      </label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (status !== "uploading") {
            inputRef.current?.click();
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
          border: "1px dashed rgba(176, 190, 169, 0.65)",
          borderRadius: "12px",
          background: "rgba(0, 0, 0, 0.45)",
          padding: "20px",
          cursor: status === "uploading" ? "not-allowed" : "pointer",
          boxShadow:
            status === "dragging"
              ? "0 0 0 1px rgba(231, 245, 158, 0.35), 0 12px 26px rgba(231, 245, 158, 0.20)"
              : "0 0 0 1px rgba(176, 190, 169, 0.22)",
          transition: "box-shadow 150ms ease, border-color 150ms ease"
        }}
      >
        <input
          ref={inputRef}
          id="resume"
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          disabled={status === "uploading"}
          style={{ display: "none" }}
        />
        <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.88)", lineHeight: 1.5 }}>
          {file ? `Selected: ${file.name}` : "Click to upload or drag and drop one PDF"}
        </p>
        <p style={{ margin: "8px 0 0", color: "rgba(176, 190, 169, 0.95)", fontSize: "0.82rem" }}>
          PDF only, one file at a time
        </p>
      </div>
      <button
        type="submit"
        onMouseEnter={(event) => {
          event.currentTarget.style.boxShadow =
            "0 0 0 1px rgba(231, 245, 158, 0.30), 0 10px 24px rgba(231, 245, 158, 0.20)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.boxShadow = "none";
        }}
        disabled={status === "uploading"}
        style={{
          background: "#92AA83",
          color: "#FFFFFF",
          border: "1px solid rgba(176, 190, 169, 0.55)",
          borderRadius: "10px",
          padding: "10px 14px",
          cursor: status === "uploading" ? "not-allowed" : "pointer",
          transition: "box-shadow 150ms ease",
          fontWeight: 600
        }}
      >
        {status === "uploading" ? "Scoring..." : "Upload and Score"}
      </button>
      {status === "error" && errorMessage ? (
        <p
          style={{
            margin: 0,
            background: "#E7F59E",
            border: "1px solid #B0BEA9",
            borderRadius: "10px",
            padding: "10px 12px",
            color: "#000000"
          }}
        >
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
