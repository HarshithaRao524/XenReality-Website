import Image from "next/image";

// onDark=true → wraps the logo in a white rounded pill (for dark navbar / black footer)
export default function XenRealityLogo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center ${
        onDark ? "bg-white rounded-lg px-2 py-1" : ""
      }`}
    >
      <Image
        src="/XenRealitylogo.png"
        alt="XenReality"
        width={140}
        height={40}
        className="h-8 w-auto"
        priority
      />
    </span>
  );
}
