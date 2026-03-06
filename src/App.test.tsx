// @ts-nocheck
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./core', () => ({
  __esModule: true,
  default: () => 'mocked-local-source',
}));

describe('App demo source wiring', () => {
  it('renders using the local core module', () => {
    render(<App />);

    expect(screen.getByText('Demo source: local')).toBeInTheDocument();
    expect(screen.getByText('src/core.ts')).toBeInTheDocument();
    expect(screen.getAllByText(/mocked-local-source/)).not.toHaveLength(0);
  });
});