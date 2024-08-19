import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { FC, memo, useCallback } from 'react';

import Typography from '@/components/Typography';
import { CalendarPlusIcon } from '@/icons';

import { dateFormatFull } from '../helpers.ts';
import { ICalendarRangePickerLabelProps } from '../types.ts';
import { RangeLabelContainerStyled } from './styled.tsx';

const RenderText: FC<{ text?: string | number }> = memo(({ text = '' }) => {
  return (
    <Typography variant="text" sx={{ userSelect: 'none' }}>
      {text}
    </Typography>
  );
});

export const CalendarRangePickerLabel: FC<ICalendarRangePickerLabelProps> = ({ onClick, from, to }) => {
  const isValidFrom = moment(from).isValid();
  const isValidTo = moment(to).isValid();
  const isValidRange = isValidFrom || isValidTo;

  const handleClick = useCallback(async () => {
    onClick?.();
  }, [onClick]);

  return (
    <RangeLabelContainerStyled
      onClick={handleClick}
      fullLine={isValidRange}
    >
      <CalendarPlusIcon sx={{ transform: 'translateY(-2px)' }}/>
      <Collapse in={isValidRange}>
        {isValidRange && (
          <Stack
            direction="row"
            spacing={1}
            marginLeft={3}
          >
            <Collapse
              in={isValidRange}
              orientation="horizontal"
            >
              <RenderText text={dateFormatFull(from)}/>
            </Collapse>
            {Boolean(to || from) && (
              <>
                <RenderText text={'-'}/>
                <RenderText text={dateFormatFull(to || from)}/>
              </>
            )}
          </Stack>
        )}
      </Collapse>
    </RangeLabelContainerStyled>
  );
};
