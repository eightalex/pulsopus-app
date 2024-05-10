/* eslint-disable */
// @ts-expect-error
import Lighthouse from '@/assets/icons/lighthouse.svg?react';
import { createSvgIcon } from './utils/createSvgIcon';

export const LighthouseIcon = createSvgIcon(Lighthouse, { viewBox: '0 0 90 80'});
