'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CaseRoleSlot } from '@/lib/store/psStore';

export interface ProtocolRoleEditorState {
  slot: CaseRoleSlot;
  role: string;
  value: string;
}

const HANDOFF_IMPORT_DRAFT_STORAGE_KEY = 'darwin-ps-handoff-import-draft';

export function useProtocolPresentationState() {
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const [showHandoff, setShowHandoff] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [roleEditor, setRoleEditor] = useState<ProtocolRoleEditorState | null>(null);
  const [handoffImportDraft, setHandoffImportDraft] = useState('');
  const [handoffImportConfirmReplace, setHandoffImportConfirmReplace] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedDraft = window.sessionStorage.getItem(HANDOFF_IMPORT_DRAFT_STORAGE_KEY);
    if (savedDraft) {
      setHandoffImportDraft(savedDraft);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!handoffImportDraft.trim()) {
      window.sessionStorage.removeItem(HANDOFF_IMPORT_DRAFT_STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(HANDOFF_IMPORT_DRAFT_STORAGE_KEY, handoffImportDraft);
  }, [handoffImportDraft]);

  const openDrugSheet = useCallback((drugId: string) => {
    setSelectedDrugId(drugId);
  }, []);

  const closeDrugSheet = useCallback(() => {
    setSelectedDrugId(null);
  }, []);

  const openRoleEditor = useCallback((input: ProtocolRoleEditorState) => {
    setRoleEditor(input);
  }, []);

  const updateRoleEditorValue = useCallback((value: string) => {
    setRoleEditor((current) => (current ? { ...current, value } : current));
  }, []);

  const closeRoleEditor = useCallback(() => {
    setRoleEditor(null);
  }, []);

  return {
    selectedDrugId,
    showHandoff,
    showDebrief,
    roleEditor,
    handoffImportDraft,
    handoffImportConfirmReplace,
    setShowHandoff,
    setShowDebrief,
    setHandoffImportDraft,
    setHandoffImportConfirmReplace,
    openDrugSheet,
    closeDrugSheet,
    openRoleEditor,
    updateRoleEditorValue,
    closeRoleEditor,
  };
}
