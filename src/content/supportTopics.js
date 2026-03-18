export const supportTopics = [
  {
    slug: 'manual',
    label: 'Manual',
    icon: '📘',
    summary:
      'How ByteBite works end-to-end, including the hardware controls, home navigation, extraction flow, and where outputs are written.',
    sections: [
      {
        title: 'What This Covers',
        items: [
          'Device startup and expected home screen behavior.',
          'Three-button navigation model: left (back), middle (select), right (next).',
          'Where extraction output, logs, and reports are saved.'
        ]
      },
      {
        title: 'Operator Steps',
        items: [
          'Power on, confirm the main home screen is visible.',
          'Use right to move through menu cards and middle to open one.',
          'Run the workflow and wait for completion before disconnecting media.'
        ]
      },
      {
        title: 'Output Locations',
        items: [
          'Case data is written to your configured external storage path.',
          'Generated reports are grouped by run/session for traceability.',
          'Support logs help verify what happened during each action.'
        ]
      }
    ]
  },
  {
    slug: 'troubleshooting',
    label: 'Troubleshooting',
    icon: '🧰',
    summary:
      'Fixes for startup issues, frozen screens, failed runs, and cases where menu actions do not respond as expected.',
    sections: [
      {
        title: 'Common Symptoms',
        items: [
          'App loads slowly or does not move past startup.',
          'Menu button presses appear to do nothing.',
          'A workflow starts but no final report appears.'
        ]
      },
      {
        title: 'First-Line Checks',
        items: [
          'Confirm power is stable and storage has free space.',
          'Verify the intended service/process is running once.',
          'Re-run with logs visible to identify the failing stage.'
        ]
      },
      {
        title: 'Recovery Path',
        items: [
          'Restart only the app/service first, then retest.',
          'If still failing, reboot device and retry a minimal task.',
          'Capture logs and error text before any major config changes.'
        ]
      }
    ]
  },
  {
    slug: 'battery-charging',
    label: 'Battery & Charging',
    icon: '🔋',
    summary:
      'Power management guidance for reliable acquisition sessions and avoiding interrupted forensic runs.',
    sections: [
      {
        title: 'Power Baseline',
        items: [
          'Start long sessions with a high battery level or direct power.',
          'Avoid low-quality cables that trigger power dropouts.',
          'Use known-good charging sources for repeatable behavior.'
        ]
      },
      {
        title: 'During Acquisition',
        items: [
          'Do not disconnect power mid-run unless recovery is required.',
          'Watch for throttling or reduced performance on low power.',
          'Keep thermal conditions stable to prevent shutdowns.'
        ]
      },
      {
        title: 'Post-Run Checks',
        items: [
          'Confirm report generation completed before unplugging.',
          'Verify run artifacts and logs were fully written.',
          'Charge back to operational level before next case.'
        ]
      }
    ]
  },
  {
    slug: 'device-connections',
    label: 'Device Connections',
    icon: '🔌',
    summary:
      'Connection setup for target devices, USB interfaces, and transfer channels used by ByteBite workflows.',
    sections: [
      {
        title: 'Connection Prerequisites',
        items: [
          'Use trusted data-capable cables, not charge-only leads.',
          'Confirm host and target detect each other before extraction.',
          'Grant required device permissions when prompted.'
        ]
      },
      {
        title: 'Operational Checks',
        items: [
          'Validate interface status before pressing execute.',
          'Keep cable movement minimal during active transfer.',
          'If disconnected, restart the workflow from a known stage.'
        ]
      },
      {
        title: 'Stability Tips',
        items: [
          'Prefer direct ports over unstable hubs where possible.',
          'Avoid hot-plugging multiple devices during one run.',
          'Log any reconnect events for evidential context.'
        ]
      }
    ]
  },
  {
    slug: 'results-reports-export',
    label: 'Results, Reports & Export',
    icon: '📊',
    summary:
      'How to review findings and export clean, readable outputs for investigators and case records.',
    sections: [
      {
        title: 'Result Structure',
        items: [
          'Raw artifacts are preserved separately from analyst outputs.',
          'Reports include run metadata and summary context.',
          'Exports should map clearly to case identifiers.'
        ]
      },
      {
        title: 'Report Outputs',
        items: [
          'Use generated spreadsheet/report files for review handover.',
          'Keep timestamps and source paths for evidential traceability.',
          'Document analyst notes in a dedicated summary section.'
        ]
      },
      {
        title: 'Export Discipline',
        items: [
          'Export only final validated results to external media.',
          'Do a quick file-open check after copying to USB.',
          'Retain logs alongside reports for auditability.'
        ]
      }
    ]
  },
  {
    slug: 'ai-analysis',
    label: 'AI Analysis',
    icon: '🧠',
    summary:
      'Using local LLM analysis to classify extracted content into safe, suspicious, and high-priority investigator review.',
    sections: [
      {
        title: 'Classification Goals',
        items: [
          'Score and triage content by investigation relevance.',
          'Highlight potential risk terms and suspicious context.',
          'Generate a short language summary for investigator review.'
        ]
      },
      {
        title: 'Workflow Pattern',
        items: [
          'Extract text artifacts from case data.',
          'Send chunks to local model with structured prompt.',
          'Parse output and map files into triage categories.'
        ]
      },
      {
        title: 'Good Practice',
        items: [
          'Treat model output as assisted triage, not final judgement.',
          'Keep prompts deterministic for repeatable outcomes.',
          'Store model version and config with each report.'
        ]
      }
    ]
  },
  {
    slug: 'updates',
    label: 'Updates',
    icon: '⬇️',
    summary:
      'Managing software updates safely so core workflows remain stable between releases.',
    sections: [
      {
        title: 'Before Updating',
        items: [
          'Record current version and backup critical configuration.',
          'Stop active workflows and close any open case run.',
          'Confirm network and storage conditions are stable.'
        ]
      },
      {
        title: 'Update Process',
        items: [
          'Apply updates in controlled sequence and verify startup.',
          'Run a smoke test of menu navigation and core extraction.',
          'Check report generation still completes successfully.'
        ]
      },
      {
        title: 'After Updating',
        items: [
          'Document version change in case notes/manual log.',
          'Reconfirm support pages and output routes are correct.',
          'Roll back only if a verified regression is found.'
        ]
      }
    ]
  },
  {
    slug: 'connectivity-add-on',
    label: 'Connectivity (Add On)',
    icon: '📡',
    summary:
      'Guidance for optional connectivity features and add-on modules that extend core ByteBite operations.',
    sections: [
      {
        title: 'Add-On Scope',
        items: [
          'Supplementary network/data transfer options.',
          'Optional integrations for remote or staged workflows.',
          'Not required for baseline local operation.'
        ]
      },
      {
        title: 'Setup Notes',
        items: [
          'Enable only required services for your case model.',
          'Validate security posture before exposing endpoints.',
          'Test add-on path separately before production use.'
        ]
      },
      {
        title: 'Control & Safety',
        items: [
          'Keep audit logs for remote or networked actions.',
          'Disable add-on services when not needed.',
          'Prefer offline operation for sensitive evidence handling.'
        ]
      }
    ]
  }
];

export function getSupportTopicBySlug(slug) {
  return supportTopics.find((topic) => topic.slug === slug) ?? null;
}
