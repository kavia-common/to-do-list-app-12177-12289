import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Unit tests for core App features (current app state):
describe('App Unit Tests (Theme, UI, Accessibility)', () => {
  test('renders Learn React link, logo, and initial theme display', () => {
    render(<App />);
    expect(screen.getByText(/learn react/i)).toBeInTheDocument();
    // The logo image (alt text: "logo"):
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    // Initial theme display:
    expect(screen.getByText(/current theme/i)).toHaveTextContent(/current theme:.*light/i);
  });

  test('theme toggle button changes theme from light to dark and updates aria-label and button', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle).toBeInTheDocument();
    // Document root should have light data-theme by default:
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    // Click to switch to dark:
    fireEvent.click(toggle);
    // Should now be dark:
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByText(/current theme/i)).toHaveTextContent(/current theme:.*dark/i);

    // Button label should indicate it will switch to light:
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();

    // Button visual should show the sun emoji (☀️) for light mode switch:
    expect(screen.getByRole('button').textContent).toMatch(/light/i);
    expect(screen.getByRole('button').textContent).toContain('☀️');
  });

  test('theme toggle button is accessible with correct aria-label', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle).toHaveAccessibleName(/switch to dark mode/i);
    // After click, aria-label should update:
    fireEvent.click(toggle);
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to light mode/i);
  });

  test('does not change theme if toggleTheme is not clicked', () => {
    render(<App />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(screen.getByText(/current theme/i)).toHaveTextContent(/current theme:.*light/i);
  });
});
