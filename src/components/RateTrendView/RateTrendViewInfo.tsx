import Stack from "@mui/material/Stack";
import { FC } from "react";

import Typography from "@/components/Typography";

import { RateTrendViewInfoProps } from "./types.ts";

export const RateTrendViewInfo: FC<RateTrendViewInfoProps> = (props) => {
  const { label, value = 0, icon: Icon } = props;
  return (
    <Stack spacing={0.5}>
      <Typography
        variant="text"
        sx={{ fontSize: 10 }}
      >
        {label}
      </Typography>
      <Stack direction='row' alignItems='flex-end' spacing={0}>
        <Stack>
          {Boolean(Icon) && Icon}
        </Stack>

        <Stack direction='row' alignItems='flex-end' spacing={0.5}>
          <Typography
            variant="text"
            sx={{ fontSize: 24, lineHeight: 1 }}
          >
            {value}
          </Typography>
          <Typography
            variant="text"
            sx={{ lineHeight: 1 }}
          >
            %
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};