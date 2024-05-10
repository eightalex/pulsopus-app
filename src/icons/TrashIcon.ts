/* eslint-disable */
// @ts-expect-error
import Trash from '@/assets/icons/trash.svg?react';
import { createSvgIcon } from './utils/createSvgIcon';

export const TrashIcon = createSvgIcon(Trash, { viewBox: '0 0 24 24'});
