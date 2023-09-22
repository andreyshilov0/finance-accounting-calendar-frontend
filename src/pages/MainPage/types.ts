export type TabChangeEvent = React.ChangeEvent<{}>;

export interface TabData {
  label: string;
  component: React.FC;
}
