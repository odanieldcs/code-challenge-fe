import React from 'react';

export const CheckLogo: React.FC<{ className?: string; color?: string }> = ({ className, color = '#578F5D' }) => {
    return (
        <svg data-testid="check-logo" className={className} width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
                data-testid="check-logo-path-1"
                d="M33 16.62V18C32.9981 21.2346 31.9507 24.382 30.014 26.9727C28.0772 29.5635 25.3549 31.4587 22.253 32.3758C19.1511 33.293 15.8359 33.1828 12.8017 32.0619C9.76751 30.9409 7.17697 28.8691 5.41643 26.1556C3.65588 23.442 2.81967 20.2321 3.0325 17.0045C3.24533 13.7768 4.4958 10.7045 6.5974 8.2456C8.69901 5.78672 11.5392 4.07307 14.6943 3.36021C17.8494 2.64736 21.1504 2.9735 24.105 4.29"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                data-testid="check-logo-path-2"
                d="M33 6L18 21.015L13.5 16.515"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
