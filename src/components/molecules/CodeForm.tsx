import { useState, type FormEvent } from 'react';
import { navigate } from 'astro:transitions/client';
import { useHydratedSessionStore, useSessionStore } from '@/stores/use-session-store';
import { Spinner } from '@/components/atoms/Spinner';

const CONSENT_VERSION = '1.0';

export function CodeForm() {
  const { code, isValidating, isValid, termsAccepted, consentAccepted, error, validateCodeAction } =
    useHydratedSessionStore();
  const [inputValue, setInputValue] = useState(code || '');
  const [checked, setChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isValidating || !checked || !consentChecked) return;
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    await validateCodeAction(trimmed);
    if (useSessionStore.getState().isValid) {
      useSessionStore.getState().setTermsAccepted(true);
      useSessionStore.getState().setConsentAccepted(true, CONSENT_VERSION);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (error) {
      useSessionStore.setState({ error: null });
    }
  };

  if (isValid && termsAccepted && consentAccepted) {
    navigate('/instructions', { history: 'replace' });
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <div>
        <label
          htmlFor="invite-code"
          className="block text-base text-on-surface-muted mb-2"
        >
          Enter your invitation code
        </label>
        <input
          id="invite-code"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={isValidating}
          className="h-tap w-full px-4 text-base text-on-surface bg-surface-alt border border-on-surface-muted/30 rounded-accessible focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent contrast-more:border-on-surface disabled:opacity-50"
          placeholder="Your code…"
          aria-describedby={error ? 'code-error' : undefined}
        />
      </div>

      {error && (
        <p id="code-error" className="text-danger-700 text-base" role="alert">
          {error}
        </p>
      )}

      <label className="flex items-start gap-3 cursor-pointer min-h-tap">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          disabled={isValidating}
          className="mt-1 shrink-0 h-5 w-5 rounded border-on-surface-muted/30 text-brand-500 focus:ring-brand-500 focus:outline-none disabled:opacity-50"
        />
        <span className="text-base text-on-surface-muted leading-relaxed select-none">
          By using Ourlens you confirm that you have read and agree to our{' '}
          <a
            href="https://ourlivesapp.com/our-lens-terms-and-conditions/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-on-surface underline hover:text-brand-500 focus-visible:shadow-focus rounded-accessible transition-[color]"
          >
            terms &amp; conditions
          </a>
        </span>
      </label>

      <label className="flex items-start gap-3 cursor-pointer min-h-tap">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          disabled={isValidating}
          className="mt-1 shrink-0 h-5 w-5 rounded border-on-surface-muted/30 text-brand-500 focus:ring-brand-500 focus:outline-none disabled:opacity-50"
        />
        <span className="text-base text-on-surface-muted leading-relaxed select-none">
          I consent to images of my home being sent to AI providers in the United
          States for hazard analysis, and I will not include other people in the
          frame. I have read the{' '}
          <a
            href="/privacy"
            className="font-semibold text-on-surface underline hover:text-brand-500 focus-visible:shadow-focus rounded-accessible transition-[color]"
          >
            privacy notice
          </a>
          .
        </span>
      </label>

      <p className="text-sm leading-relaxed text-on-surface-muted/80 px-1">
        You must be 18 or over to use OurLens. You can withdraw consent at any
        time by contacting us or by not using the service.
      </p>

      <p className="mt-2 text-sm leading-relaxed text-on-surface-muted/80 px-1">
        OurLens™ is an educational hazard-awareness tool and is not a substitute
        for professional advice, safety assessments, or regulatory compliance
        reviews. Images are sent for AI analysis and are not stored by OurLens
        after processing.
      </p>

      <button
        type="submit"
        disabled={isValidating || !inputValue.trim() || !checked || !consentChecked}
        className="min-h-tap min-w-tap w-full inline-flex items-center justify-center px-6 py-3 text-lg font-semibold bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-accessible hover:from-brand-600 hover:to-brand-700 active:from-brand-700 active:to-brand-800 focus-visible:shadow-focus contrast-more:ring-2 contrast-more:ring-offset-2 disabled:opacity-50 transition-[background]"
      >
        {isValidating ? (
          <Spinner size="base" />
        ) : (
          'Verify Code'
        )}
      </button>
    </form>
  );
}
