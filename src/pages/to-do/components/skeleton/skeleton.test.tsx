import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SkeletonPage } from './index';

vi.mock('react-loading-skeleton', () => {
  return {
    default: (props: any) => <div data-testid="mocked-skeleton" {...props} />,
  };
});

describe('Task Skeleton', () => {

  it('renders the first skeleton with correct height', () => {
    render(<SkeletonPage />);
    
    const firstSkeleton = screen.getAllByTestId('mocked-skeleton')[0];
    expect(firstSkeleton).toHaveClass('h-[60px]');
  });

  it('renders the second skeleton with correct height and margin', () => {
    render(<SkeletonPage />);
    
    const secondSkeleton = screen.getAllByTestId('mocked-skeleton')[1];
    expect(secondSkeleton).toHaveClass('h-[15px]');
    expect(secondSkeleton).toHaveClass('h-[15px] mt-8');
  });
});
