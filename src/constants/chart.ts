import { extendPalette } from '@/theme';
import { allGreen500, allStone600 } from '@/theme/palette';

const { chartAxisLineDefault, chartAxisTextDefault } = extendPalette;

export const HEX_CHART_RADIUS_DEFAULT = 20;
export const HEX_CHART_STROKE_WIDTH_DEFAULT = 2;

export const AXIS_LINE_STROKE = chartAxisLineDefault;
export const AXIS_LINE_STROKE_WIDTH = 0.5;
export const AXIS_LINE_STROKE_OPACITY = 0.6;
export const AXIS_TEXT_FILL = chartAxisTextDefault;
export const AXIS_TEXT_OPACITY = 0.8;
export const AXIS_TEXT_FONT_SIZE = '12px';

export const CHART_POINT_RADIUS = 0.1;
export const CHART_POINT_OFFSET = (CHART_POINT_RADIUS ** 2) + 1;
export const CHART_TOOLTIP_POINT_RADIUS = CHART_POINT_RADIUS + 2;

export const AXIS_LEFT_PIX_PER_TICK = 28;
export const AXIS_LEFT_OFFSET = 30;

export const AXIS_BOTTOM_PIX_PER_TICK = 50;
export const AXIS_BOTTOM_OFFSET = 25;
export const AXIS_BOTTOM_RENDER_LIMIT = 10;
export const AXIS_BOTTOM_RENDER_LIMIT_COEFICIENT = 0.4;
export const AXIS_BOTTOM_RENDER_LIMIT_MIN =
    Math.floor(AXIS_BOTTOM_RENDER_LIMIT * (1 - AXIS_BOTTOM_RENDER_LIMIT_COEFICIENT));
export const AXIS_BOTTOM_RENDER_LIMIT_MAX =
    Math.floor(AXIS_BOTTOM_RENDER_LIMIT * (1 + AXIS_BOTTOM_RENDER_LIMIT_COEFICIENT));

export const CHART_SELECT_MIN_LENGTH = 7;

export const MARGIN_TOP = 0;
export const MARGIN_BOTTOM = AXIS_BOTTOM_OFFSET;
export const MARGIN_LEFT = AXIS_LEFT_OFFSET + CHART_POINT_OFFSET;
export const MARGIN_RIGHT = CHART_POINT_OFFSET;

export const CHART_COLORS = [allStone600, allGreen500];
