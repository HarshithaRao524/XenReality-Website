import Image from "next/image";

// onDark=true → inverts logo to white (brand guide: use white logo on dark backgrounds)
export default function XenRealityLogo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center">
      <Image
        src="/XenRealitylogo.png"
        alt="XenReality"
        width={140}
        height={40}
        className={`h-8 w-auto ${onDark ? "brightness-0 invert" : ""}`}
        priority
      />
    </span>
  );
}
