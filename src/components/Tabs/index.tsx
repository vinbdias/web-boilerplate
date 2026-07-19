import { useState, type ReactNode } from "react";
import { List, Panel, TabButton } from "./styles";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === active);

  return (
    <div>
      <List role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            $active={tab.id === active}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </List>
      {activeTab && (
        <Panel role="tabpanel" id={`panel-${activeTab.id}`} aria-labelledby={`tab-${activeTab.id}`}>
          {activeTab.content}
        </Panel>
      )}
    </div>
  );
}
