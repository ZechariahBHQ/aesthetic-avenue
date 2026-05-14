import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Aesthetic Avenue render error", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          className="min-h-screen flex items-center justify-center px-6"
          style={{ background: "var(--aa-parchment)", color: "var(--aa-espresso)" }}
        >
          <section className="max-w-xl text-center">
            <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>
              Aesthetic Avenue
            </p>
            <div className="aa-rule mx-auto mb-8 w-12" style={{ opacity: 1, background: "var(--aa-bronze)" }} />
            <h1 className="aa-display text-4xl md:text-5xl mb-6" style={{ color: "var(--aa-espresso)" }}>
              Something didn’t load
              <br />
              <em>quite right</em>
            </h1>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}
            >
              Please refresh the page. If the issue continues, you can still book directly through our online booking system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button type="button" className="aa-btn-filled" onClick={() => window.location.reload()}>
                Refresh Page
              </button>
              <a
                className="aa-btn"
                href="https://bookings.gettimely.com/aestheticavenuensw/bb/book"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Book Online</span>
              </a>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
