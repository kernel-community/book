"use client";

type DividerProps = React.HTMLAttributes<HTMLHRElement>;

export default function Divider(props: DividerProps) {
  return (
    <hr
      className="border-t border-gray-300 w-full md:w-[90%]"
      {...props}
    />
  );
}

