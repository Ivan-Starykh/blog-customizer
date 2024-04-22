import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, ArrowButtonProps } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton onClick={() => {}} />
			</>
		);
	},
};
