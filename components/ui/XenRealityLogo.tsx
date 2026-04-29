// onDark=true → inverts logo to white (brand guide: use white logo on dark backgrounds)
export default function XenRealityLogo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/XenRealitylogo.png"
        alt="XenReality"
        style={{
          height: "40px",
          width: "auto",
          display: "block",
        }}
      />
    </span>
  );
}
