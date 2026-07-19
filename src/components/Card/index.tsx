import type { HTMLAttributes, ReactNode } from "react";
import { Actions, Body, Header, Root, Title } from "./styles";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions?: ReactNode;
}

export function Card({ title, actions, children, ...rest }: CardProps) {
  return (
    <Root {...rest}>
      {(title || actions) && (
        <Header>
          {title && <Title>{title}</Title>}
          {actions && <Actions>{actions}</Actions>}
        </Header>
      )}
      <Body>{children}</Body>
    </Root>
  );
}
