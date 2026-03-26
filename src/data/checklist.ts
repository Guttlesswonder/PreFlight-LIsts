import type { ChecklistItem } from '../types';

const SECTION_DATA: Record<string, string[]> = {
  'Commercial Scope': [
    'Deal scope and outcome is documented.',
    'Customer success criteria is explicitly stated.',
    'Pricing assumptions align to proposed services.',
    'Contracted deliverables are unambiguous.',
    'Out-of-scope items are listed.',
    'Dependencies on partner or third-party teams are identified.',
    'Deal timeline expectations are realistic.',
    'Commercial risk flags are captured.',
    'Regional or regulatory constraints are noted.',
    'Go-live milestones are sequenced and agreed.'
  ],
  'Solution & Architecture': [
    'Target architecture has been reviewed with customer technical stakeholders.',
    'Core integration patterns are defined.',
    'Data migration strategy is discussed.',
    'Identity and access assumptions are documented.',
    'Security and compliance requirements are captured.',
    'Environment strategy (dev/test/prod) is confirmed.',
    'Performance and scale expectations are documented.',
    'Availability and recovery expectations are known.',
    'Non-standard customization requirements are identified.',
    'Technical constraints that impact delivery are recorded.'
  ],
  'Delivery Planning': [
    'Implementation approach (phased vs big-bang) is selected.',
    'Project governance model is defined.',
    'Customer and vendor roles are mapped.',
    'Resourcing assumptions are realistic.',
    'Critical path milestones are identified.',
    'Training scope and enablement plan are documented.',
    'Change management responsibilities are clear.',
    'Acceptance criteria is documented.',
    'Post go-live support expectations are defined.',
    'Cutover planning assumptions are captured.'
  ],
  'Data & Integrations': [
    'Source systems inventory is complete.',
    'Data quality risks are known.',
    'Data ownership responsibilities are defined.',
    'Master data and key entities are agreed.',
    'Integration endpoints are identified.',
    'Integration security model is understood.',
    'Required API limits and throughput are reviewed.',
    'Batch and real-time needs are documented.',
    'Error handling and reconciliation plan is outlined.',
    'Historical data retention expectations are captured.'
  ],
  'Operational Readiness': [
    'Support model and escalation paths are agreed.',
    'Operational KPIs and reporting needs are listed.',
    'Runbook ownership is defined.',
    'Monitoring and alerting needs are identified.',
    'Release and deployment process is understood.',
    'Business continuity requirements are captured.',
    'Key risks and mitigations are actively tracked.',
    'Issue triage process is documented.',
    'Stakeholder communication cadence is defined.',
    'Success handoff criteria to BAU are agreed.'
  ]
};

const lensByIndex = (index: number) => {
  if (index % 3 === 0) return ['Sales Agreement'] as const;
  if (index % 3 === 1) return ['Implementation Brief'] as const;
  return ['Sales Agreement', 'Implementation Brief'] as const;
};

export const CHECKLIST_ITEMS: ChecklistItem[] = Object.entries(SECTION_DATA).flatMap(([section, prompts]) =>
  prompts.map((prompt, index) => ({
    id: `${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
    section,
    prompt,
    lenses: [...lensByIndex(index)]
  }))
);

export const CHECKLIST_SECTIONS = [...new Set(CHECKLIST_ITEMS.map((item) => item.section))];
