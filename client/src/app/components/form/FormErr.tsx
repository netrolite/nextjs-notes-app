interface TProps {
  content?: string;
}

export default function FormErr({ content }: TProps) {
  if (!content) return null;
  return <div className="text-red-500">{content}</div>;
}
