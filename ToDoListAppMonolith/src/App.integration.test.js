import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Integration test for the full App, simulating user journey as features expand
describe('App Integration Test Suite', () => {
  it('fully renders the app with all core elements and allows theme toggling', () => {
    render(<App />);
    // All critical branding and navigation presents:
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/edit.*app\.js/i)).toBeInTheDocument();
    expect(screen.getByText(/learn react/i)).toHaveAttribute('href', expect.stringContaining('reactjs'));

    // Integration-style: actual user interaction flows
    let toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(screen.getByText(/current theme: */i)).toHaveTextContent('light');
    // Simulate toggle to dark and back to light
    fireEvent.click(toggle);
    expect(screen.getByText(/current theme: */i)).toHaveTextContent('dark');
    // Button swaps (sun emoji appears for returning to light mode)
    expect(screen.getByRole('button').textContent).toContain('☀️');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByRole('button').textContent).toContain('🌙');
  });

  it('theme toggle button remains accessible before and after toggling', () => {
    render(<App />);
    // Initially:
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAccessibleName(/switch to dark mode/i);
    fireEvent.click(toggle);
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to light mode/i);
  });
});
