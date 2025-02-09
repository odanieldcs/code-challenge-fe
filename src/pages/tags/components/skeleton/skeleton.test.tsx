import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SkeletonPage } from './index';

vi.mock('react-loading-skeleton', () => {
  return {
    default: (props: any) => <div data-testid="mocked-skeleton" {...props} />,
  };
});

describe('Tag Skeleton', () => {

  it('renders the first skeleton with correct height and margin', () => {
    render(<SkeletonPage />);
    
    const firstSkeleton = screen.getAllByTestId('mocked-skeleton')[0];
    expect(firstSkeleton).toHaveClass('h-[60px]');
    expect(firstSkeleton).toHaveClass('mb-8');
  });

  it('renders the remaining skeletons with correct height', () => {
    render(<SkeletonPage />);
    
    const remainingSkeletons = screen.getAllByTestId('mocked-skeleton')[1];
    expect(remainingSkeletons).toHaveClass('h-[54px]');
  });
});
