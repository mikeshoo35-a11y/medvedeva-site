import Image from "next/image";

type PortraitFrameProps = {
  portraitUrl: string | null;
  consultantName: string;
  className?: string;
};

export function PortraitFrame({
  portraitUrl,
  consultantName,
  className = "",
}: PortraitFrameProps) {
  return (
    <div
      className={`mx-auto aspect-[3/4] w-full max-w-80 overflow-hidden rounded-lg border border-accent-muted bg-surface-alt ${className}`}
      data-testid="portrait-frame"
    >
      {portraitUrl ? (
        <Image
          src={portraitUrl}
          alt=""
          width={320}
          height={427}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-sm text-text-muted"
          aria-hidden="true"
        >
          <span className="font-heading text-4xl text-accent/60">
            {consultantName
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
        </div>
      )}
    </div>
  );
}
