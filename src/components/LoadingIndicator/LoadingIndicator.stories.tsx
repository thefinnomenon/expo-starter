import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LoadingIndicator } from './LoadingIndicator';

export default {
  title: 'Example/LoadingIndicator',
  component: LoadingIndicator,
} as Meta;

type Args = {
  size: 'small' | 'large' | undefined;
};

const Template: Story<Args> = args => <LoadingIndicator {...args} />;

export const Default = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};
