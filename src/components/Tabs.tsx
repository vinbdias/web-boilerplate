import { useState, type ReactNode } from "react";
import "./Tabs.css";

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
    <div className="ui-tabs">
      <div className="ui-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={["ui-tabs__tab", tab.id === active && "ui-tabs__tab--active"]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab && (
        <div
          className="ui-tabs__panel"
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
