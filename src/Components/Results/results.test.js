'use strict';
import { render, screen } from '@testing-library/react';
import Results from './index';
import '@testing-library/jest-dom';

describe('Testing that results display', () => {
  test('Results display JSON data properly', () => {
    render(<Results data={{body: {id: 1}}}/>);
    expect(screen.getByRole('code')).toBeTruthy();
  });

  test('If nothing is passed, results displays nothing', () => {
    render(<Results />);
    expect(screen.getByRole('code')).toBeEmptyDOMElement();
  });
});