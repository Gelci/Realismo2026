import React from 'react';

export const SketchUnderline = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2.00026 6.99996C25.5393 4.22853 91.5435 -0.62725 198.001 2.99996" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: "10 5" }} opacity="0.6" />
    </svg>
);

export const SketchCircle = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M95 50C95 74.8528 74.8528 95 50 95C25.1472 95 5 74.8528 5 50C5 25.1472 25.1472 5 50 5C74.8528 5 95 25.1472 95 50Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
    </svg>
);

export const SketchHighlight = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 25C20 10 80 5 95 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
);
