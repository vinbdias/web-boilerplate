// Living showcase of the neutral component kit. Useful while restyling the
// tokens for a new visual identity.
import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  FormField,
  Input,
  Modal,
  PaginationControls,
  Select,
  Skeleton,
  Spinner,
  Table,
  Tabs,
  TextArea,
  useToast,
} from "@/components";
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

export function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { showToast } = useToast();

  return (
    <div className="showcase">
      <h1 className="showcase__title">Component showcase</h1>
      <p className="showcase__subtitle">
        Neutral building blocks. Restyle everything by editing <code>src/styles/tokens.css</code>.
      </p>

      <Card title="Buttons">
        <div className="showcase__row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
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
        </div>
      </Card>

      <Card title="Feedback">
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
          <Alert tone="danger" title="Something failed">
            Use the danger tone for blocking errors.
          </Alert>
          <div className="showcase__row">
            <Button variant="secondary" onClick={() => showToast("Toast message!", "success")}>
              Show toast
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Open modal
            </Button>
            <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
              Open confirm
            </Button>
          </div>
          <div className="showcase__row">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" label="Loading data" />
          </div>
          <div className="showcase__stack">
            <Skeleton height="1rem" width="60%" />
            <Skeleton height="1rem" width="80%" />
            <Skeleton height="2.5rem" />
          </div>
        </div>
      </Card>

      <Card title="Data display">
        <div className="showcase__stack">
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
        footer={
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        }
      >
        <p>Built on the native dialog element: focus trap and Escape included.</p>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm action"
        message="This is what a destructive confirmation looks like."
        danger
        onConfirm={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
