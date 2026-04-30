'use client';

import { useState, useEffect } from 'react';

interface WaitlistFormProps {
    variant?: 'hero' | 'cta';
}

export function WaitlistForm({ variant = 'hero' }: WaitlistFormProps) {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const consentText =
        'I agree that my email address will be stored in order to receive news about PulseRelay. I have read the [Privacy Policy] and can revoke this consent at any time.';
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const verified = params.get('verified');
        if (verified === 'success') {
            setStatus('success');
            setMessage("You're confirmed! You're now on the waiting list.");
            window.history.replaceState({}, '', '/');
        } else if (verified === 'already') {
            setStatus('success');
            setMessage(
                'This email is already verified and on the waiting list.',
            );
            window.history.replaceState({}, '', '/');
        } else if (verified === 'invalid') {
            setStatus('error');
            setMessage('This verification link is invalid or has expired.');
            window.history.replaceState({}, '', '/');
        } else if (verified === 'error') {
            setStatus('error');
            setMessage(
                'Something went wrong during verification. Please try again.',
            );
            window.history.replaceState({}, '', '/');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    consentText: consent ? consentText : '',
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(data.message || 'Check your email!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-md mx-auto text-center">
                <div className="bg-primary-muted border border-primary text-primary p-4 rounded">
                    <span className="material-symbols-outlined text-2xl align-middle mr-2">
                        {message.includes('already')
                            ? 'info'
                            : 'mark_email_unread'}
                    </span>
                    {message}
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`max-w-md mx-auto flex flex-col gap-4 ${
                variant === 'hero' ? 'mb-16' : ''
            }`}
        >
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    className="flex-1 bg-surface-container-lowest border border-outline px-4 py-3 text-base leading-relaxed text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-on-surface-variant"
                    placeholder="Enter your email address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || !consent}
                    className="bg-primary text-on-primary px-6 py-3 text-base font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap active:scale-95 disabled:opacity-50"
                >
                    {status === 'loading'
                        ? 'Joining...'
                        : 'Join the Waiting List'}
                </button>
            </div>
            <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary shrink-0"
                />
                <span className="text-sm text-on-surface-variant">
                    {consentText}
                </span>
            </label>
            {status === 'error' && (
                <p className="text-destructive text-sm text-center">
                    {message}
                </p>
            )}
        </form>
    );
}
