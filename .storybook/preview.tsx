import type { Preview } from '@storybook/react';

import '../src/styles/global.css';
import React from 'react';
import { MantineProvider } from '@mantine/core';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      return (
        <MantineProvider>
          <Story />
        </MantineProvider>
      );
    },
  ],
};

export default preview;
