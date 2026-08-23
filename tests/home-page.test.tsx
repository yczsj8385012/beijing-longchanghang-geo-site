// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Home from '../app/page';

describe('homepage composition', () => {
  afterEach(cleanup);

  it('renders one H1 and does not duplicate category or core solution links', () => {
    render(<Home />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /临期食品/ })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /冷冻食品与海鲜/ })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /饮料与乳品/ })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /价格体系如何保护/ })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /如何降低窜货风险/ })).toHaveLength(1);
  });
});
