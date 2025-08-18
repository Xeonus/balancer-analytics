declare module 'react-csv' {
  import { Component } from 'react';

  export interface CSVLinkProps {
    data: any[];
    filename?: string;
    className?: string;
    target?: string;
    headers?: Array<{ label: string; key: string }>;
    separator?: string;
    enclosingCharacter?: string;
    uFEFF?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>, done: () => void) => void | boolean;
    asyncOnClick?: boolean;
    children?: React.ReactNode;
  }

  export interface CSVDownloadProps {
    data: any[];
    filename?: string;
    headers?: Array<{ label: string; key: string }>;
    separator?: string;
    enclosingCharacter?: string;
    uFEFF?: boolean;
    target?: string;
  }

  export class CSVLink extends Component<CSVLinkProps> {
    render(): React.ReactElement;
  }

  export class CSVDownload extends Component<CSVDownloadProps> {
    render(): React.ReactElement;
  }
}