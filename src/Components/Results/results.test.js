'use strict';
import { render, screen } from '@testing-library/react';
import Results from './index';
import '@testing-library/jest-dom';

describe('Testing that results display', () => {
  test('Results display JSON data properly', () => {
    render(<Results data={{id: 1}}/>);
    let text = screen.getByText(/"id"/i);
    expect(text).toBeVisible();
  });

  test('If nothing is passed, results displays nothing', () => {
    render(<Results />);
    expect(screen.getByRole('results')).toBeEmptyDOMElement();
  });
});