import { IExtendPalette, ITypographyColors } from '@/theme/types';
import {
	allGray200,
	allGray300,
	allGray400,
	allGray500,
	allGray600,
	allGray700,
	allGray800,
	allGreen200,
	allGreen400,
	allGreen500,
	allGreen800,
	allRed200,
	allRed300,
	allRed400,
	allRed700,
	allStone400,
	allStone500,
	allStone600,
	AllStone750, allYellow100,
	black,
} from './palette';

// common
const backgroundColorPrimary = black;
const backgroundColorSecondary = allGray800;
const borderColorPrimary = allGray400;
const borderColorSecondary = allStone500;
const borderColorHide = `${allGray400}33`;

// icon
const iconColorPrimary = allStone400;
const iconColorSuccess = allGreen500;
const iconColorSecondary = allGray200;
const iconColorAction = allGray200;
const iconColorInfo = allGray200;
const iconColorCritical = allGray200;
const iconColorAccent = allGray200;
const iconColorAccentLight = allGray200;
const iconColorWarning = allYellow100;
const iconColorDisabled = allGray200;
const iconColorHide = allGray300;

// avatar
const avatarBackgroundColor = allGray200;
const avatarBorderColor = borderColorSecondary;

// typography
const typographyPrimary = allStone400;
const typographyPrimaryLight = allStone600;
const typographySuccess = allGreen500;
const typographyHide = allGray300;

// nav link
const navLinkColorDefault = allStone400;
const navLinkColorActive = allGreen500;
const navLinkColorHover = allGreen400;
const navLinkColorPressed = allGreen800;

// button - contained primary
const buttonContainedPrimaryDefault = allGreen500;
const buttonContainedPrimaryHovered = `${allGreen500}66`;
const buttonContainedPrimaryPressed = buttonContainedPrimaryHovered;
const buttonContainedPrimaryDisabled = allRed200;
const buttonContainedPrimaryOnSurfaceDefault = allStone400;
const buttonContainedPrimaryOnSurfaceDisabled = allStone600;
// button - contained error
const buttonContainedErrorDefault = allRed400;
const buttonContainedErrorHovered = allRed300;
const buttonContainedErrorPressed = allRed700;
const buttonContainedErrorDisabled = allRed200;
const buttonContainedErrorOnSurfaceDefault = allStone400;
const buttonContainedErrorOnSurfaceDisabled = allStone600;
// button - outlined primary
const buttonOutlineDefault = allGreen200;
const buttonOutlinedPrimaryDefault = 'transparent';
const buttonOutlinedPrimaryHovered = `${allGreen500}66`;
const buttonOutlinedPrimaryPressed = 'transparent';
const buttonOutlinedPrimaryDisabled = 'transparent';
const buttonOutlinedPrimaryOnSurfaceDefault = allStone400;
const buttonOutlinedPrimaryOnSurfaceDisabled = allStone500;
const buttonOutlinedPrimaryBorderDefault = allGreen500;
const buttonOutlinedPrimaryBorderHover = allGreen200;
const buttonOutlinedPrimaryBorderDisabled = allGreen200;
// button - outlined secondary
const buttonOutlinedSecondaryDefault = buttonOutlinedPrimaryDefault;
const buttonOutlinedSecondaryHovered = 'transparent';
const buttonOutlinedSecondaryPressed = `${allGray500}66`;
const buttonOutlinedSecondaryDisabled = buttonOutlinedSecondaryPressed;
const buttonOutlinedSecondaryOnSurfaceDefault = allStone400;
const buttonOutlinedSecondaryOnSurfaceDisabled = allStone400;
const buttonOutlinedSecondaryBorderDefault = allGray300;
const buttonOutlinedSecondaryBorderHover = allStone600;
const buttonOutlinedSecondaryBorderDisabled = allStone400;
// button - text
const buttonTextPrimarySurfaceHovered = allStone400;
const buttonTextPrimaryOnSurfaceDefault = allGreen500;
const buttonTextPrimarySurfacePressed = allStone400;
const buttonTextPrimaryOnSurfaceDisabled = allGray300;

// icon button
const iconButtonDefaultSurfaceDefault = buttonOutlinedPrimaryDefault;
const iconButtonDefaultBorderDefault = allGreen500;
const iconButtonDefaultSurfaceHover = buttonOutlinedPrimaryHovered;
const iconButtonDefaultBorderHover = allGreen200;
const iconButtonDefaultSurfacePressed = buttonOutlinedPrimaryPressed;

// slider
const sliderThumbColorDefault = allGreen800;
const sliderTrackColorDefault = allGreen800;
// const sliderRailColorDefault = `${allGray300}66`
const sliderRailColorDefault = allGray300;

// border
const borderColorDefault = allGray500;
const borderColorDividerDefault = `${borderColorDefault}33`;
const borderColorDividerSecondary = allGray300;

// menu
const menuListBackgroundDefault = allGray700;

// toggle | switch
const toggleSurfaceDefault = allGray300;
const toggleSurfaceSelected = allGreen500;
const toggleSurfaceDisabled = allStone600;
const toggleIconDefault = allStone400;
const toggleIconSelected = toggleIconDefault;
const toggleIconDisabled = allGray500;

// chart
const chartAxisLineDefault = allStone500;
const chartAxisTextDefault = allGray200;

// input outlined
const inputSurfaceDefault = 'transparent';
const inputPaperSurfaceDefault = allGray700;
const inputSurfaceHover = allGray700;
const inputOnSurfacePlaceholder = allGray400;
const inputBorderDefault = allGray300;
const inputBorderSecondary = `${allStone400}33`;
const inputBorderHover = allGreen500;
const inputBorderFocus = allGreen500;
const inputTextColorDefault = typographyPrimary;
const inputTextColorHover = allGreen500;
// input filled
const inputFilledSurfaceDefault = AllStone750;
const inputFilledSurfaceHover = AllStone750;
const inputFilledOnSurfacePlaceholder = allGray400;
const inputFilledBorderDefault = inputBorderDefault;
const inputFilledBorderSecondary = `${allStone400}33`;
const inputFilledBorderHover = allGreen500;
const inputFilledBorderFocus = allGreen500;
const inputFilledTextColorDefault = typographyPrimary;
const inputFilledTextColorHover = inputBorderDefault;

// autocomplete
const autocompleteOptionTextDefault = typographyPrimary;
const autocompleteOptionHover = `${allGray500}1A`;
const autocompleteOptionActive = `${allGray500}33`;
const autocompleteOptionPressed = allGray400;

// calendar
const calendarSurfaceDefault = allGray700;
const calendarSurfacePrimary = allGray500;
const calendarSurfaceSecondary = `${allGray500}33`;
const calendarSurfacePrimaryHover = autocompleteOptionHover;
const calendarSurfacePrimaryPressed = autocompleteOptionActive;
const calendarSurfaceBorderDefault = allGray300;

// loader
const loaderSurfaceDefault = allGreen500;
const loaderSurfaceSecondary = typographyPrimary;
const loaderSurfaceAlternative = allGray600;
const loaderSurfaceError = allGray400;

// table
const tableHeadBackgroundDefault = '#F2F4F833';
const tableBodyBackgroundDefault = 'transparent';
const tableBodyBackgroundHover = `${allGray500}33`;
const tableBodyBackgroundSelect = allGray300;
const tableBodyBorderDefault = `${allGray500}33`;
const tableBodyBorderHover = tableBodyBorderDefault;
const tableBodyBorderSelect = `${allGray500}33`;

// checkbox
const checkboxPrimarySurfaceChecked = allGreen500;
const checkboxPrimarySurfaceDisabled = allStone600;

// paper
const paperBackgroundDefault = allGray800;
const paperBorderColorDefault = allGray700;

export const extendPalette: IExtendPalette = {
	backgroundColorPrimary,
	backgroundColorSecondary,
	//
	borderColorPrimary,
	borderColorSecondary,
	borderColorHide,
	//
	iconColorPrimary,
	iconColorSuccess,
	iconColorSecondary,
	iconColorAction,
	iconColorInfo,
	iconColorCritical,
	iconColorAccent,
	iconColorAccentLight,
	iconColorWarning,
	iconColorDisabled,
	iconColorHide,
	//
	avatarBorderColor,
	avatarBackgroundColor,
	//
	navLinkColorDefault,
	navLinkColorActive,
	navLinkColorHover,
	navLinkColorPressed,
	//
	buttonContainedPrimaryDefault,
	buttonContainedPrimaryHovered,
	buttonContainedPrimaryPressed,
	buttonContainedPrimaryDisabled,
	buttonContainedPrimaryOnSurfaceDefault,
	buttonContainedPrimaryOnSurfaceDisabled,
	//
	buttonContainedErrorDefault,
	buttonContainedErrorHovered,
	buttonContainedErrorPressed,
	buttonContainedErrorDisabled,
	buttonContainedErrorOnSurfaceDefault,
	buttonContainedErrorOnSurfaceDisabled,
	//
	buttonOutlineDefault,
	buttonOutlinedPrimaryDefault,
	buttonOutlinedPrimaryHovered,
	buttonOutlinedPrimaryPressed,
	buttonOutlinedPrimaryDisabled,
	buttonOutlinedPrimaryOnSurfaceDefault,
	buttonOutlinedPrimaryOnSurfaceDisabled,
	buttonOutlinedPrimaryBorderDefault,
	buttonOutlinedPrimaryBorderHover,
	buttonOutlinedPrimaryBorderDisabled,
	//
	buttonOutlinedSecondaryDefault,
	buttonOutlinedSecondaryHovered,
	buttonOutlinedSecondaryPressed,
	buttonOutlinedSecondaryDisabled,
	buttonOutlinedSecondaryOnSurfaceDefault,
	buttonOutlinedSecondaryOnSurfaceDisabled,
	buttonOutlinedSecondaryBorderDefault,
	buttonOutlinedSecondaryBorderHover,
	buttonOutlinedSecondaryBorderDisabled,
	//
	buttonTextPrimaryOnSurfaceDefault,
	buttonTextPrimarySurfaceHovered,
	buttonTextPrimarySurfacePressed,
	buttonTextPrimaryOnSurfaceDisabled,
	//
	iconButtonDefaultSurfaceDefault,
	iconButtonDefaultBorderDefault,
	iconButtonDefaultSurfaceHover,
	iconButtonDefaultBorderHover,
	iconButtonDefaultSurfacePressed,
	//
	sliderThumbColorDefault,
	sliderTrackColorDefault,
	sliderRailColorDefault,
	//
	borderColorDefault,
	borderColorDividerDefault,
	borderColorDividerSecondary,
	//
	menuListBackgroundDefault,
	//
	toggleSurfaceDefault,
	toggleSurfaceSelected,
	toggleSurfaceDisabled,
	toggleIconDefault,
	toggleIconSelected,
	toggleIconDisabled,
	//
	chartAxisLineDefault,
	chartAxisTextDefault,
	//
	inputSurfaceDefault,
	inputPaperSurfaceDefault,
	inputSurfaceHover,
	inputOnSurfacePlaceholder,
	inputBorderDefault,
	inputBorderSecondary,
	inputBorderHover,
	inputBorderFocus,
	inputTextColorDefault,
	inputTextColorHover,
	//
	inputFilledSurfaceDefault,
	inputFilledSurfaceHover,
	inputFilledOnSurfacePlaceholder,
	inputFilledBorderDefault,
	inputFilledBorderSecondary,
	inputFilledBorderHover,
	inputFilledBorderFocus,
	inputFilledTextColorDefault,
	inputFilledTextColorHover,
	//
	autocompleteOptionTextDefault,
	autocompleteOptionHover,
	autocompleteOptionActive,
	autocompleteOptionPressed,
	//
	calendarSurfaceDefault,
	calendarSurfaceSecondary,
	calendarSurfacePrimary,
	calendarSurfacePrimaryHover,
	calendarSurfacePrimaryPressed,
	calendarSurfaceBorderDefault,
	//
	loaderSurfaceDefault,
	loaderSurfaceSecondary,
	loaderSurfaceAlternative,
	loaderSurfaceError,
	//
	tableHeadBackgroundDefault,
	tableBodyBackgroundDefault,
	tableBodyBackgroundHover,
	tableBodyBackgroundSelect,
	tableBodyBorderDefault,
	tableBodyBorderHover,
	tableBodyBorderSelect,
	//
	checkboxPrimarySurfaceChecked,
	checkboxPrimarySurfaceDisabled,
	//
	paperBackgroundDefault,
	paperBorderColorDefault,
};

export const typographyColors: ITypographyColors = {
	primary: typographyPrimary,
	primaryLight: typographyPrimaryLight,
	success: typographySuccess,
	hide: typographyHide,
};
