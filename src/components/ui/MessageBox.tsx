export default function MessageBox(props: {
  variant: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.children}
    </div>
  );
}
