import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ComponentProps } from "react";
import styled from "styled-components";
import { iconMap, type FaIconProps } from "@/icons";

const Container = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  line-height: 1;
`;

/** Typed FontAwesome wrapper — only icons registered in `src/icons` iconMap. */
export function FaIcon({
  name,
  size,
  className,
  color = "currentColor",
  style,
}: FaIconProps) {
  const icon = iconMap[name];
  if (!icon) {
    console.warn(`Icon "${name}" not found in iconMap.`);
    return null;
  }

  return (
    <Container>
      <FontAwesomeIcon
        icon={icon}
        size={size}
        className={className}
        color={color}
        style={style as ComponentProps<typeof FontAwesomeIcon>["style"]}
      />
    </Container>
  );
}
