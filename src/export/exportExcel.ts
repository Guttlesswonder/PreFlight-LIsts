import * as XLSX from 'xlsx';
import { calculateReadiness, flattenItems } from '../logic/readiness';
import { generateWhiteSpace } from '../logic/whitespace';
import type { AccountRecord } from '../types';

export const exportRecordExcel = (record: AccountRecord): void => {
  const summary = calculateReadiness(record);
  const whiteSpace = generateWhiteSpace(record);
  const openIssues = flattenItems(record).filter((item) =>
    ['assumed', 'unknown', 'at-risk'].includes(item.status)
  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet([
      {
        'Record Name': record.name,
        'Last Updated': record.updatedAt,
        'Signal Score': summary.signalScore,
        Confirmed: summary.confirmedCount,
        Assumed: summary.assumedCount,
        Unknown: summary.unknownCount,
        'At Risk': summary.atRiskCount,
        'Expansion Readiness': summary.expansionReadiness,
        'Adoption Readiness': summary.adoptionReadiness,
        Notes: record.notes
      }
    ]),
    'Summary'
  );

  for (const section of record.sections) {
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(
        section.items.map((item) => ({
          'Item ID': item.id,
          Question: item.question,
          Why: item.why,
          Status: item.status,
          Answer: item.answer,
          Owner: item.owner,
          'Due Date': item.dueDate,
          'Risk If Unclear': item.risk
        }))
      ),
      section.name
    );
  }

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      whiteSpace.map((card) => ({
        Lens: card.lens,
        Title: card.title,
        Signal: card.signal,
        Why: card.why,
        'Potential Motion': card.motion
      }))
    ),
    'White Space'
  );

  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      openIssues.map((item) => ({
        'Item ID': item.id,
        Question: item.question,
        Status: item.status,
        Owner: item.owner,
        'Due Date': item.dueDate,
        Risk: item.risk
      }))
    ),
    'Open Issues'
  );

  XLSX.writeFile(workbook, `${record.name.replace(/\s+/g, '-').toLowerCase()}-preflight.xlsx`);
};
