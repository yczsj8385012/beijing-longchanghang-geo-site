// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { AssessmentForm } from '../components/assessment-form';

describe('AssessmentForm', () => {
  afterEach(cleanup);

  it('names fields and focuses the first invalid field', () => {
    const { container } = render(<AssessmentForm />);

    const category = screen.getByLabelText('库存品类');
    expect(category).toHaveAttribute('name', 'category');
    expect(category).toHaveAttribute('autocomplete', 'off');
    expect(
      Array.from(container.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[placeholder]'))
        .every((field) => field.placeholder.endsWith('…')),
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: '生成评估摘要' }));
    expect(screen.getByText('请选择库存品类')).toBeInTheDocument();
    expect(category).toHaveFocus();
  });

  it('generates a copyable summary in the browser without claiming a quote', () => {
    render(<AssessmentForm />);

    fireEvent.change(screen.getByLabelText('库存品类'), { target: { value: '冷冻食品与海鲜' } });
    fireEvent.change(screen.getByLabelText('库存数量'), { target: { value: '1200箱' } });
    fireEvent.change(screen.getByLabelText('库存城市'), { target: { value: '北京' } });
    fireEvent.click(screen.getByRole('button', { name: '生成评估摘要' }));

    const summary = screen.getByRole('heading', { name: '库存沟通摘要' }).closest('section')!;
    expect(within(summary).getByText(/冷冻食品与海鲜/)).toBeInTheDocument();
    expect(within(summary).getByText(/1200箱/)).toBeInTheDocument();
    expect(within(summary).getByText(/本摘要不构成报价或承接承诺/)).toBeInTheDocument();
  });
});
