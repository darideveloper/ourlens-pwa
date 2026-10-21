import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { useEffect, useState } from 'react';
import { validateCode } from '@/lib/api/validate-code';

interface SessionState {
  code: string;
  isValidating: boolean;
  isValid: boolean | null;
  termsAccepted: boolean;
  consentAccepted: boolean;
  consentAt: string | null;
  consentVersion: string | null;
  error: string | null;
  validateCodeAction: (code: string) => Promise<void>;
  setTermsAccepted: (accepted: boolean) => void;
  setConsentAccepted: (accepted: boolean, version: string) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        code: '',
        isValidating: false,
        isValid: null,
        termsAccepted: false,
        consentAccepted: false,
        consentAt: null,
        consentVersion: null,
        error: null,
        validateCodeAction: async (code: string) => {
          set({ isValidating: true, error: null, code });
          try {
            const result = await validateCode(code);
            if (result.valid) {
              set({ isValid: true, isValidating: false });
            } else {
              set({
                isValid: false,
                isValidating: false,
                error: 'That invitation code is not recognized or expired. Please check and try again.',
              });
            }
          } catch (err) {
            set({
              isValid: false,
              error: err instanceof Error ? err.message : 'Unknown error',
              isValidating: false,
            });
          }
        },
        setTermsAccepted: (accepted: boolean) => set({ termsAccepted: accepted }),
        setConsentAccepted: (accepted: boolean, version: string) =>
          set({
            consentAccepted: accepted,
            consentAt: accepted ? new Date().toISOString() : null,
            consentVersion: accepted ? version : null,
          }),
        reset: () =>
          set({
            code: '',
            isValidating: false,
            isValid: null,
            termsAccepted: false,
            consentAccepted: false,
            consentAt: null,
            consentVersion: null,
            error: null,
          }),
      }),
      {
        name: 'ourlens-session',
        skipHydration: true,
        partialize: (state) => ({
          code: state.code,
          isValid: state.isValid,
          termsAccepted: state.termsAccepted,
          consentAccepted: state.consentAccepted,
          consentAt: state.consentAt,
          consentVersion: state.consentVersion,
        }),
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'SessionStore', enabled: import.meta.env.DEV },
  ),
);

export function useHydratedSessionStore() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    useSessionStore.persist.rehydrate();
    const unsub = useSessionStore.persist.onFinishHydration(() => {
      const state = useSessionStore.getState();
      if (state.isValid === null) {
        useSessionStore.setState({ isValid: false });
      }
      if (!state.termsAccepted) {
        useSessionStore.setState({ termsAccepted: false });
      }
      if (!state.consentAccepted) {
        useSessionStore.setState({ consentAccepted: false, consentAt: null, consentVersion: null });
      }
      setHydrated(true);
    });
    if (useSessionStore.persist.hasHydrated()) {
      const state = useSessionStore.getState();
      if (state.isValid === null) {
        useSessionStore.setState({ isValid: false });
      }
      if (!state.termsAccepted) {
        useSessionStore.setState({ termsAccepted: false });
      }
      if (!state.consentAccepted) {
        useSessionStore.setState({ consentAccepted: false, consentAt: null, consentVersion: null });
      }
      setHydrated(true);
    }
    return unsub;
  }, []);
  const store = useSessionStore();
  return hydrated ? store : { ...store, code: '', isValid: null };
}
