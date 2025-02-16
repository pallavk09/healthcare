import { SvgIconProps } from "../types";

export const SvgIcon = ({
  src,
  width,
  height,
  margintop,
  marginRight,
  marginLeft,
}: SvgIconProps) => (
  <img
    src={`/img/svg/${src}`}
    alt={src}
    width={width}
    height={height}
    style={{ marginTop: margintop, marginRight: marginRight, marginLeft }}
  />
);
