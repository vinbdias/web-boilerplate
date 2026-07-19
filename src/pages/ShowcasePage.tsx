// Living showcase of the neutral component kit and shared infrastructure patterns.
import { useMemo, useState } from "react";
import {
  Alert,
  AutoComplete,
  Badge,
  BigNumber,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  DatePicker,
  DateRangePicker,
  Drawer,
  EmptyState,
  FaIcon,
  FormField,
  Input,
  InlineLoader,
  Modal,
  OverlayLoader,
  PaginationControls,
  Radio,
  RadioGroup,
  SearchBar,
  SearchBarAdvanced,
  SearchBarTable,
  Select,
  Skeleton,
  SkeletonLoader,
  Spinner,
  Switch,
  Table,
  TableData,
  Tabs,
  TextArea,
  Tooltip,
  useSnackbar,
  type DateRange,
} from "@/components";
import { useConfirmDialog } from "@/contexts";
import { ProjectTableHeaders } from "@/models/Project";
import type { SearchResultItem } from "@/types";
import "./ShowcasePage.css";

interface DemoRow {
  id: number;
  name: string;
  status: string;
}

const demoRows: DemoRow[] = [
  { id: 1, name: "First item", status: "active" },
  { id: 2, name: "Second item", status: "draft" },
];

const demoProjects = [
  { id: 1, name: "Alpha", status: "active", description: "First demo project", createdAt: "01/01/2026" },
  { id: 2, name: "Bravo", status: "draft", description: "Second demo project", createdAt: "15/02/2026" },
  { id: 3, name: "Charlie", status: "archived", description: "Third demo project", createdAt: "10/03/2026" },
];

async function searchDemoProjects(query: string) {
  await new Promise((r) => setTimeout(r, 200));
  const term = query.toLowerCase();
  return demoProjects.filter((p) => p.name.toLowerCase().includes(term));
}

function mapDemoToSearchItem(item: (typeof demoProjects)[number]): SearchResultItem {
  return { id: item.id, label: item.name, description: item.status, payload: item };
}

function mapDemoToTableRow(item: (typeof demoProjects)[number]) {
  return {
    id: item.id,
    name: item.name,
    status: item.status as "draft" | "active" | "archived",
    statusLabel: item.status,
    description: item.description,
    createdAt: item.createdAt,
  };
}

export function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [autoCompleteValue, setAutoCompleteValue] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [range, setRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectedSearch, setSelectedSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);
  const { showSnackbar } = useSnackbar();
  const { confirm } = useConfirmDialog();

  const tableRows = useMemo(() => demoProjects.map(mapDemoToTableRow), []);

  return (
    <div className="showcase">
      <h1 className="showcase__title">Component showcase</h1>
      <p className="showcase__subtitle">
        Neutral building blocks. Restyle everything by editing the theme in{" "}
        <code>src/styles/theme.ts</code> (colors, fonts, breakpoints).
      </p>

      <Card title="Buttons & icons">
        <div className="showcase__row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="showcase__row" style={{ marginTop: "var(--space-3)" }}>
          <FaIcon name="home" />
          <FaIcon name="user" />
          <FaIcon name="gear" />
          <FaIcon name="bell" />
          <FaIcon name="magnifyingGlass" />
          <Button variant="secondary">
            <FaIcon name="plus" size="sm" /> Add
          </Button>
        </div>
      </Card>

      <Card title="Form controls">
        <div className="showcase__grid">
          <FormField label="Text input" hint="With a helpful hint">
            {(fieldProps) => <Input {...fieldProps} placeholder="Type something" />}
          </FormField>
          <FormField label="With error" error="This field is required" required>
            {(fieldProps) => <Input {...fieldProps} />}
          </FormField>
          <FormField label="Select">
            {(fieldProps) => (
              <Select {...fieldProps}>
                <option>Option A</option>
                <option>Option B</option>
              </Select>
            )}
          </FormField>
          <FormField label="Text area">
            {(fieldProps) => <TextArea {...fieldProps} rows={2} />}
          </FormField>
          <FormField label="DatePicker">
            {() => <DatePicker value={date} onChange={setDate} />}
          </FormField>
          <FormField label="DateRangePicker">
            {() => <DateRangePicker value={range} onClose={setRange} />}
          </FormField>
          <FormField label="Autocomplete" hint="Type to filter; arrows + Enter to pick">
            {(fieldProps) => (
              <AutoComplete
                id={fieldProps.id}
                aria-describedby={fieldProps["aria-describedby"]}
                invalid={fieldProps.invalid}
                placeholder="Pick a fruit"
                options={[
                  { value: "apple", label: "Apple" },
                  { value: "banana", label: "Banana" },
                  { value: "cherry", label: "Cherry" },
                ]}
                value={autoCompleteValue}
                onChange={setAutoCompleteValue}
              />
            )}
          </FormField>
        </div>
        <div className="showcase__row" style={{ marginTop: "var(--space-4)" }}>
          <Checkbox label="Checkbox option" defaultChecked />
          <Switch label="Toggle switch" defaultChecked />
        </div>
        <div style={{ marginTop: "var(--space-4)" }}>
          <RadioGroup label="Radio group">
            <Radio name="demo-radio" label="First" defaultChecked />
            <Radio name="demo-radio" label="Second" />
            <Radio name="demo-radio" label="Third" />
          </RadioGroup>
        </div>
      </Card>

      <Card title="Search factories (SearchBarAdvanced / SearchBarTable)">
        <div className="showcase__stack">
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            Pattern: <code>searchFn(config) → (query) → Promise&lt;TApi[]&gt;</code> + mapper → UI DTO.
            Selected: {selectedSearch || "—"}
          </p>
          <SearchBarAdvanced
            placeholder="Search projects (list)…"
            searchFn={searchDemoProjects}
            mapper={mapDemoToSearchItem}
            onSelect={(item) => setSelectedSearch(item.label)}
          />
          <SearchBarTable
            placeholder="Search projects (table)…"
            searchFn={searchDemoProjects}
            mapper={mapDemoToTableRow}
            headers={ProjectTableHeaders}
            onSelect={(item) => setSelectedSearch(String(item.name))}
          />
          <div className="showcase__row">
            <SearchBar onSearch={setSearchTerm} placeholder="Simple debounced search…" />
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
              {searchTerm ? `Searching: ${searchTerm}` : "Debounced 300ms"}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Navigation">
        <div className="showcase__stack">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Section", to: "/showcase" },
              { label: "Current page" },
            ]}
          />
          <div className="showcase__row">
            <Tooltip content="Extra context on hover or focus">
              <Button variant="secondary">Hover me (tooltip)</Button>
            </Tooltip>
            <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
              Open drawer
            </Button>
          </div>
          <div className="showcase__row">
            <BigNumber value="1.284" label="Total records" hint="Example KPI display" />
            <BigNumber value="98,2%" label="Uptime" />
          </div>
        </div>
      </Card>

      <Card title="Feedback (Snackbar + promise ConfirmDialog)">
        <div className="showcase__stack">
          <div className="showcase__row">
            <Badge>Neutral</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="info">Info</Badge>
          </div>
          <Alert tone="info" title="Information">
            Alerts communicate contextual state.
          </Alert>
          <div className="showcase__row">
            <Button
              variant="secondary"
              onClick={() => showSnackbar("Saved successfully.", "success")}
            >
              Show snackbar
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Open modal
            </Button>
            <Button
              variant="secondary"
              onClick={async () => {
                const ok = await confirm({
                  title: "Delete item?",
                  message: "Promise-based confirm via useConfirmDialog().",
                  danger: true,
                });
                showSnackbar(ok ? "Confirmed." : "Cancelled.", ok ? "success" : "info");
              }}
            >
              Await confirm()
            </Button>
          </div>
          <div className="showcase__row">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" label="Loading data" />
            <span>
              Inline value: <InlineLoader label="Loading value" />
            </span>
          </div>
          <div className="showcase__stack">
            <Skeleton height="1rem" width="60%" />
            <Skeleton height="1rem" width="80%" />
            <Skeleton height="2.5rem" />
            <SkeletonLoader width="45%" height={16} radius="999px" />
          </div>
          <div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowOverlay((visible) => !visible)}
            >
              {showOverlay ? "Hide" : "Show"} container overlay
            </Button>
            <div className="showcase__loader-demo">
              <p>Container content remains in place while an operation runs.</p>
              <OverlayLoader loading={showOverlay} text="Loading section…" />
            </div>
          </div>
        </div>
      </Card>

      <Card title="TableData (configurable headers + sort + pagination)">
        <div className="showcase__stack">
          <TableData
            title="Projects"
            data={tableRows}
            headers={ProjectTableHeaders}
            usability="internal-pagination"
            pageSize={2}
            showRowColorBar
          />
          <Table<DemoRow>
            columns={[
              { key: "name", header: "Name", render: (row) => row.name },
              { key: "status", header: "Status", render: (row) => <Badge>{row.status}</Badge> },
            ]}
            rows={demoRows}
            rowKey={(row) => row.id}
          />
          <PaginationControls page={page} limit={10} total={42} onPageChange={setPage} />
          <EmptyState
            title="Nothing here yet"
            description="Empty states explain what will appear and how to get started."
            action={<Button size="sm">Create item</Button>}
          />
        </div>
      </Card>

      <Card title="Tabs">
        <Tabs
          tabs={[
            { id: "one", label: "First tab", content: <p>Content of the first tab.</p> },
            { id: "two", label: "Second tab", content: <p>Content of the second tab.</p> },
          ]}
        />
      </Card>

      <Modal
        open={modalOpen}
        title="Example modal"
        onClose={() => setModalOpen(false)}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        <p>Built on the native dialog element: focus trap and Escape included.</p>
      </Modal>

      <Drawer open={drawerOpen} title="Example drawer" onClose={() => setDrawerOpen(false)}>
        <p>Side panel for filters, details or secondary flows.</p>
      </Drawer>
    </div>
  );
}
