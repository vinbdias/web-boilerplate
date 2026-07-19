import { CrumbLink, Item, List, Separator } from "./styles";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <List>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Item key={`${item.label}-${index}`}>
              {item.to && !isLast ? (
                <CrumbLink to={item.to}>{item.label}</CrumbLink>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast && <Separator aria-hidden="true">/</Separator>}
            </Item>
          );
        })}
      </List>
    </nav>
  );
}
