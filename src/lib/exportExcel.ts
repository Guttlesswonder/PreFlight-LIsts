import * as XLSX from 'xlsx';
import type { Deal, ChecklistItem } from '../types';
import { summarizeReadiness } from './readiness';

export function sanitizeSheetName(name: string): string {
  const safe = name.replace(/[\\/?*\[\]:]/g, ' ').replace(/\s+/g, ' ').trim();
  return safe.slice(0, 31) || 'Sheet';
}

export function exportDealToExcel(deal: Deal, items: ChecklistItem[]): void {
  const wb = XLSX.utils.book_new();
  const summary = summarizeReadiness(items, deal.responses);

  const summaryRows = [
    ['Deal Name', deal.meta.name],
    ['SFDC Reference', deal.meta.sfdcRef],
    ['Sales Owner', deal.meta.salesOwner],
    ['Opportunity Stage', deal.meta.opportunityStage],
    ['Readiness %', summary.percentReady],
    ['Confirmed', summary.confirmed],
    ['Assumed', summary.assumed],
    ['Unknown', summary.unknown],
    ['At Risk', summary.atRisk],
    ['Not Applicable', summary.notApplicable]
  ];

  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryRows), 'Summary');

  const sections = [...new Set(items.map((item) => item.section))];
  for (const section of sections) {
    const sectionItems = items.filter((item) => item.section === section);
    const rows = sectionItems.map((item) => ({
      Item: item.prompt,
      Lenses: item.lenses.join(', '),
      Status: deal.responses[item.id]?.status ?? 'Unknown',
      Notes: deal.responses[item.id]?.notes ?? ''
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), sanitizeSheetName(section));
  }

  const issues = items
    .filter((item) => {
      const status = deal.responses[item.id]?.status ?? 'Unknown';
      return status === 'Unknown' || status === 'Assumed' || status === 'At Risk';
    })
    .map((item) => ({
      Section: item.section,
      Item: item.prompt,
      Status: deal.responses[item.id]?.status ?? 'Unknown',
      Notes: deal.responses[item.id]?.notes ?? ''
    }));

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(issues), 'Open Issues');
  XLSX.writeFile(wb, `${deal.meta.name || 'deal'}-checklist.xlsx`);
}
