import getenv from 'getenv';

export const config = {
  issuesUrl: getenv('ISSUES_URL'),
  componentsUrl: getenv('COMPONENTS_URL'),
  fileToExport: getenv('FILE_TO_EXPORT', ''),
  exportDir: getenv('EXPORT_DIR', 'export'),
  consoleExport: getenv.bool('CONSOLE_EXPORT', true),
  pagination: {
    maxResults: getenv('MAX_RESULTS', 10),
  }
}

