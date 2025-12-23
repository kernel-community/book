"use client";

import ReactSelect, { components, Props as SelectProps, MenuProps, MenuListProps, OptionProps, IndicatorsContainerProps, ValueContainerProps, ControlProps } from "react-select";

const Menu = (props: MenuProps) => (
  <components.Menu
    {...props}
    className="mt-0 rounded-xl border border-gray-300 overflow-hidden"
  />
);

const MenuList = (props: MenuListProps) => (
  <components.MenuList {...props} className="py-0 rounded-xl" />
);

const Option = (props: OptionProps) => (
  <components.Option
    {...props}
    className="px-4.5 cursor-pointer text-lg md:text-base"
  />
);

const IndicatorsContainer = (props: IndicatorsContainerProps) => (
  <div className="w-auto pr-2 [&>*>span]:hidden [&_svg]:text-gray-600 [&:hover_svg]:text-gray-800">
    <components.IndicatorsContainer {...props} />
  </div>
);

const ValueContainer = (props: ValueContainerProps) => (
  <components.ValueContainer className="font-body text-gray-600 pl-3" {...props} />
);

const Control = (props: ControlProps) => (
  <components.Control
    className="border border-gray-300 rounded-xl text-lg md:text-base pr-0 p-0.5 md:p-0"
    {...props}
  />
);

export default function Select(props: SelectProps) {
  return (
    <ReactSelect
      theme={(selectTheme) => ({
        ...selectTheme,
        colors: {
          ...selectTheme.colors,
          primary: "#4B5B33",
          primary75: "#22c55e",
          primary50: "#dbeafe",
          primary25: "#f0fdf4",
          danger: "#ef4444",
          dangerLight: "#fee2e2",
        },
      })}
      components={{
        Menu,
        MenuList,
        IndicatorsContainer,
        ValueContainer,
        Control,
        Option,
      }}
      {...props}
    />
  );
}

