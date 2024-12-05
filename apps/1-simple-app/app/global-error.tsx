'use client';

import ErrorModal from '@/components/ErrorModal';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <html lang="en">
            <body>
                <ErrorModal error={error} reset={reset} />
                <div id="portal"></div>
            </body>
        </html>
    );
}
