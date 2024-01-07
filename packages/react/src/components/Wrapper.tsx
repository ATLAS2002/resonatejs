interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<any>, any> {
  children: React.ReactNode;
  resonateRef: React.MutableRefObject<any>;
}

export const ResonateWrapper: React.FC<Props> = ({
  children,
  resonateRef,
  ...props
}) => {
  return (
    <div ref={resonateRef} {...props}>
      {children}
    </div>
  );
};
