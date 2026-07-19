import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ComponentProps } from "react";
import styled from "styled-components";
import { byPrefixAndName, type FaRawIconProps } from "@/icons";

const Container = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

/** Resolves a raw FA icon name (e.g. "faCheck") across fas/far/fab packs. */
export function FaRawIcon({
  name,
  size,
  className,
  color = "currentColor",
  style,
}: FaRawIconProps) {
  const normalized = name.startsWith("fa")
    ? name
    : `fa${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  let icon: IconDefinition | undefined;

  for (const pack of Object.values(byPrefixAndName)) {
    const candidate = (pack as unknown as Record<string, IconDefinition>)[normalized];
    if (candidate) {
      icon = candidate;
      break;
    }
  }

  if (!icon) {
    console.warn(`Raw icon "${name}" not found.`);
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
