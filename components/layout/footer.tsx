export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Farhan Ahmed</h3>
            <p className="mt-2 text-sm text-muted-foreground">trying my best to try-catch.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Social</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <p className="mt-2 text-sm text-muted-foreground">hello@example.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2025 Farhan Ahmed. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
