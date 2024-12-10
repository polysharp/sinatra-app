export interface BreadcrumbProps {
  label:
    | 'Workspace'
    | 'Sites'
    | 'Analyses'
    | 'Domains'
    | 'Keys'
    | 'Members'
    | 'Settings'
    | 'Site';
  href: string;
}
