import Stack from "@mui/material/Stack";
import { FC, useMemo } from "react";

import Typography from "@/components/Typography";

import { RateTrendViewInfoProps } from "./types.ts";

export const RateTrendViewInfo: FC<RateTrendViewInfoProps> = (props) => {
  const { label = '', value = 0, icon: Icon } = props;

  const renderValue = useMemo(() => {
    const trunc = Math.trunc(Math.abs(value));
    return String(trunc).padStart(2, '0');
  }, [value]);

  return (
    <Stack spacing={0.5}>
      <Stack>
        {label.split(' ').map((t) => (
          <Typography
            key={t}
            variant="text"
            sx={{
              fontSize: 10,
              lineHeight: 1,
          }}
          >
            {t}
          </Typography>
        ))}
      </Stack>
      <Stack
        direction='row'
        alignItems='flex-end'
        spacing={1.5}
      >
        {Boolean(Icon) && Boolean(value) && (
          <Stack
            sx={({ spacing }) => ({
              padding: spacing(0, 0, 0.2, 0.5),
            })}
          >
            {Icon}
          </Stack>
        )}

        <Stack direction='row' alignItems='flex-end' spacing={0.5}>
          <Typography
            variant="text"
            sx={{ fontSize: 24, lineHeight: 0.9 }}
          >
            {renderValue}
          </Typography>
          <Typography
            variant="text"
            sx={{ lineHeight: 1.1 }}
          >
            %
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};