interface Props {
  pxSize?: number;
  className?: string;
}

export default function SignOutIcon({ pxSize, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={pxSize}
      width={pxSize}
      className={className || undefined}
    >
      <path d="M189-95q-39.05 0-66.525-27.475Q95-149.95 95-189v-582q0-39.463 27.475-67.231Q149.95-866 189-866h296v95H189v582h296v94H189Zm467-174-67-66 97-98H354v-94h330l-97-98 67-66 212 212-210 210Z" />
    </svg>
  );
}
