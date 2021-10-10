import React from 'react';
import { ActivityIndicator } from 'react-native';

type Props = {
  size?: 'small' | 'large';
} & typeof defaultProps;

const defaultProps = Object.freeze({});
const initialState = Object.freeze({});

export const LoadingIndicator = ({ size }: Props) => <ActivityIndicator size={size} />;

LoadingIndicator.defaultProps = defaultProps;
