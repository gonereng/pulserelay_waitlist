import Image from 'next/image';
import { WaitlistForm } from '@/components/WaitlistForm';

export default function Home() {
    return (
        <>
            <section className="max-w-7xl mx-auto px-6 py-hero text-center">
                <h1 className="text-3xl font-bold leading-tight lg:text-5xl lg:leading-tight mb-6 max-w-4xl mx-auto text-on-surface">
                    The Last Notification API You&apos;ll Ever Need.
                </h1>
                <p className="text-lg font-medium leading-snug text-on-surface-variant max-w-2xl mx-auto mb-10">
                    High-precision delivery across Email, Webhooks, Telegram,
                    SMS, and Push. One unified interface for all your
                    transactional communication.
                </p>
                <WaitlistForm variant="hero" />
                <div className="relative w-[calc(100%+3rem)] -ml-6 mt-10 overflow-hidden">
                    <Image
                        src="/screenshot.png"
                        alt="PulseRelay dashboard screenshot"
                        width={1200}
                        height={600}
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </section>

            {/* <section className="max-w-7xl mx-auto px-6 py-section bg-surface-container-low border-y border-outline-variant">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Universal Connectivity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest border border-outline p-6 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
              mail
            </span>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-sm text-on-surface-variant">
              Reliable SMTP and API-based delivery with dedicated IP support and
              advanced analytics.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline p-6 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
              webhook
            </span>
            <h3 className="text-xl font-semibold mb-2">Webhooks</h3>
            <p className="text-sm text-on-surface-variant">
              Real-time HTTP callbacks with automatic retries and signature
              verification.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline p-6 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
              send
            </span>
            <h3 className="text-xl font-semibold mb-2">Telegram</h3>
            <p className="text-sm text-on-surface-variant">
              Direct bot integration for instant messaging to groups and
              individual users.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline p-6 hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
              chat
            </span>
            <h3 className="text-xl font-semibold mb-2">SMS & Push</h3>
            <p className="text-sm text-on-surface-variant">
              Global reach for critical alerts to mobile devices with fallback
              routing.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-hero">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Engineered for Precision
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary mt-1">
                  speed
                </span>
                <div>
                  <h4 className="text-lg font-medium mb-1">
                    Sub-second Latency
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Optimized routing ensures your critical messages arrive
                    instantly, every time.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary mt-1">
                  verified_user
                </span>
                <div>
                  <h4 className="text-lg font-medium mb-1">
                    Guaranteed Delivery
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Intelligent fallback mechanisms and exponential backoff for
                    unreachable endpoints.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary mt-1">
                  analytics
                </span>
                <div>
                  <h4 className="text-lg font-medium mb-1">
                    Granular Observability
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Track every message lifecycle from request to delivery
                    acknowledgment.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-card-dark text-on-primary p-6 border border-border-dark font-mono text-sm overflow-x-auto">
            <pre className="text-zinc-300">
{`const pulse = new PulseRelay('api_key');

await pulse.send({
  user_id: 'usr_123',
  event: 'payment_failed',
  channels: ['email', 'sms'],
  payload: {
    amount: '$49.00',
    reason: 'insufficient_funds'
  }
});`}
            </pre>
          </div>
        </div>
      </section> */}

            {/* <section
                id="cta-section"
                className="max-w-4xl mx-auto px-6 py-section text-center border-t border-outline-variant pt-16"
            >
                <h2 className="text-2xl font-semibold mb-4">
                    Ready to upgrade your infrastructure?
                </h2>
                <p className="text-base text-on-surface-variant mb-8">
                    Secure your spot in the early access program.
                </p>
                <WaitlistForm variant="cta" />
            </section> */}
        </>
    );
}
