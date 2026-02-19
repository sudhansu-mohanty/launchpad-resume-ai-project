export type ScoreResult = {
  filename: string;
  score: number;
  summary: string;
  highlights: string[];
};

type Props = {
  result: ScoreResult;
};

type BreakdownItem = {
  label: string;
  value: number;
  max: number;
  status: "good" | "warn" | "bad";
};

const statusColor = {
  good: "#92AA83",
  warn: "#E7F59E",
  bad: "#B0BEA9"
} as const;

function buildBreakdown(total: number): BreakdownItem[] {
  const labels = ["Structure", "Impact", "Keywords", "Clarity", "Formatting"];
  const maxValues = [20, 20, 20, 20, 20];
  const weights = [0.24, 0.22, 0.2, 0.18, 0.16];
  const values = weights.map((weight, index) => {
    if (index === weights.length - 1) {
      return 0;
    }
    return Math.floor(total * weight);
  });
  const used = values.reduce((sum, value) => sum + value, 0);
  values[values.length - 1] = Math.max(0, Math.min(20, total - used));

  return labels.map((label, index) => {
    const value = Math.max(0, Math.min(maxValues[index], values[index]));
    const ratio = value / maxValues[index];
    const status = ratio >= 0.7 ? "good" : ratio >= 0.45 ? "warn" : "bad";
    return { label, value, max: maxValues[index], status };
  });
}

export default function ScoreCard({ result }: Props) {
  const total = Math.max(0, Math.min(100, result.score));
  const breakdown = buildBreakdown(total);

  return (
    <section
      style={{
        marginTop: "20px",
        background: "rgb(0 0 0 / 0.72)",
        border: "1px solid rgb(176 190 169 / 0.40)",
        borderRadius: "14px",
        padding: "18px",
        display: "grid",
        gap: "14px",
        color: "rgb(255 255 255 / 0.92)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <h2 style={{ margin: 0, color: "#FFFFFF" }}>Your LaunchPad Score</h2>
        <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: 700, color: "#FFFFFF" }}>{total}/100</p>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          borderRadius: "999px",
          background: "rgb(176 190 169 / 0.35)"
        }}
      >
        <div
          style={{
            width: `${total}%`,
            height: "100%",
            borderRadius: "999px",
            background: "linear-gradient(90deg, rgb(146 170 131 / 0.95) 0%, rgb(231 245 158 / 0.95) 100%)"
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        {breakdown.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgb(0 0 0 / 0.45)",
              border: "1px solid rgb(176 190 169 / 0.32)",
              borderRadius: "10px",
              padding: "8px 10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: statusColor[item.status]
                }}
              />
              <span style={{ color: "rgb(255 255 255 / 0.90)" }}>{item.label}</span>
            </div>
            <span style={{ color: "rgb(255 255 255 / 0.86)" }}>
              {item.value}/{item.max}
            </span>
          </div>
        ))}
      </div>

      <p style={{ margin: 0, color: "rgb(255 255 255 / 0.80)" }}>{result.summary}</p>

      <button
        type="button"
        onMouseEnter={(event) => {
          event.currentTarget.style.boxShadow = "0 0 0 1px rgb(231 245 158 / 0.30), 0 10px 24px rgb(231 245 158 / 0.20)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.boxShadow = "none";
        }}
        style={{
          background: "#92AA83",
          color: "#FFFFFF",
          border: "1px solid rgb(176 190 169 / 0.55)",
          borderRadius: "10px",
          padding: "10px 14px",
          cursor: "pointer",
          transition: "box-shadow 150ms ease"
        }}
      >
        Import Resume
      </button>

      <p style={{ margin: 0, color: "rgb(176 190 169 / 0.95)", fontSize: "0.875rem" }}>
        Tip: strengthen role-specific keywords to improve ATS relevance.
      </p>
    </section>
  );
}
