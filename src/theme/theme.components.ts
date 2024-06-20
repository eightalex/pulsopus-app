import { buttonClasses } from '@mui/material/Button';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { extendPalette, typographyColors } from '@/theme/extendPalette';
import { typographyComponent } from '@/theme/theme.typography';

const theme = createTheme();

// TODO: refactor deprecated fields
export const components: ThemeOptions['components'] = {
	MuiCssBaseline: {
		styleOverrides: {
			backgroundColor: extendPalette.backgroundColorPrimary,
			body: {
				fontSize: '1rem',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				color: typographyColors.primary,
				boxSizing: 'border-box',
			},
			'#app': {
				width: '100%',
				height: '100%',
			},
			// "*": {
			// 	scrollbarGutter: 'stable',
			// },
			// '*::-webkit-scrollbar': {
			// 	width: '8px',
			// },
			// '*::-webkit-scrollbar-track': {
			// 	backgroundColor: 'darkgrey',
			// },
			// '*::-webkit-scrollbar-thumb': {
			// 	boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
			// },
		},
	},
	MuiTypography: typographyComponent,
	MuiSvgIcon: {
		defaultProps: {
			color: 'primary',
		},
		styleOverrides: {
			root: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			},
			colorPrimary: {
				color: extendPalette.iconColorPrimary,
			},
			colorSecondary: {
				color: extendPalette.iconColorSecondary,
			},
			colorAction: {
				color: extendPalette.iconColorAction,
			},
			colorInfo: {
				color: extendPalette.iconColorInfo,
			},
			colorCritical: {
				color: extendPalette.iconColorCritical,
			},
			colorAccent: {
				color: extendPalette.iconColorAccent,
			},
			colorAccentLight: {
				color: extendPalette.iconColorAccentLight,
			},
			colorSuccess: {
				color: extendPalette.iconColorSuccess,
			},
			colorWarning: {
				color: extendPalette.iconColorWarning,
			},
			colorDisabled: {
				color: extendPalette.iconColorDisabled,
			},
			colorHide: {
				color: extendPalette.iconColorHide,
			},
			fontSizeExtraSmall: {
				fontSize: 16,
			},
			fontSizeSmall: {
				fontSize: 18,
			},
			fontSizeLarge: {
				fontSize: 32,
			},
			fontSizeLargePlus: {
				fontSize: 42,
			},
			fontSizeExtraLarge: {
				fontSize: 50,
			},
			fontSizeExtraLargePlus: {
				fontSize: 60,
			},
		},
	},
	MuiAvatar: {
		styleOverrides: {
			root: {
				backgroundColor: extendPalette.avatarBackgroundColor,
				border: `1px solid ${extendPalette.avatarBorderColor}`,
				color: extendPalette.avatarBorderColor,
				width: 48,
				height: 48,
			},
		},
	},
	MuiMenu: {
		defaultProps: {
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'right',
			},
			transformOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
			PaperProps: {
				sx: {
					boxSizing: 'border-box',
					mt: 2,
					backgroundColor: extendPalette.menuListBackgroundDefault,
					borderColor: extendPalette.menuListBackgroundDefault,
				}
			},
		},
		styleOverrides: {
			list: {
				boxSizing: 'border-box',
				backgroundColor: extendPalette.menuListBackgroundDefault,
				borderColor: extendPalette.menuListBackgroundDefault,
				borderRadius: 4,
				minWidth: 240,
				maxWidth: 340,
				width: 'auto',
				padding: 0,
			},
		},
	},
	MuiMenuItem: {
		styleOverrides: {
			root: {},
		},
	},
	MuiButton: {
		defaultProps: {
			disableTouchRipple: true,
			disableElevation: true,
			disableFocusRipple: true,
			variant: 'outlined',
			color: 'primary',
			size: 'small',
		},
		styleOverrides: {
			root: {
				boxSizing: 'border-box',
				fontWeight: 400,
				flexShrink: 0,
				whiteSpace: 'nowrap',
				textTransform: 'none',
				minWidth: 'auto',
				position: 'relative',
				['&:focus']: {
					outline: `1px solid ${extendPalette.buttonOutlineDefault}`,
				},
				['&:active']: {
					['&:focus']: {
						outline: 'none',
					},
				},
				['&.MuiButton-onlyIcon']: {
					paddingInline: '8px',
				},
				['&.MuiButton-disablePointerEvents']: {
					pointerEvents: 'none',
				},
				['&.MuiButton-withText']: {
					[`& .${buttonClasses.startIcon}`]: {
						marginInlineEnd: '12px',
					},
				},
				['&:has(> .MuiButton-startIcon)']: {
					justifyContent: 'start',
				},
			},
			startIcon: {
				display: 'flex',
				alignItems: 'center',
				margin: 0,
				marginRight: 12,
				['&.MuiButton-withText']: {
					marginInlineEnd: '8px',
				},
				['&.MuiButton-contentFullWidth']: {
					position: 'absolute',
					left: '16px',
					margin: 0,
				},
				['&.MuiButton-loading']: {
					visibility: 'hidden',
				},
				['&>*:nth-of-type(1)']: {
					fontSize: '24px',
				},
			},
			endIcon: {
				margin: 0,
				marginLeft: 8,
				display: 'flex',
				alignItems: 'center',
				marginInlineStart: '6px',
				['&.MuiButton-contentFullWidth']: {
					position: 'absolute',
					right: '16px',
					margin: 0,
				},
				['&.MuiButton-loading']: {
					visibility: 'hidden',
				},
				['&>*:nth-of-type(1)']: {
					fontSize: '24px',
				},
			},
			containedPrimary: {
				color: extendPalette.buttonContainedPrimaryOnSurfaceDefault,
				backgroundColor: extendPalette.buttonContainedPrimaryDefault,
				['&:hover']: {
					backgroundColor: extendPalette.buttonContainedPrimaryHovered,
				},
				['&:active']: {
					backgroundColor: extendPalette.buttonContainedPrimaryPressed,
				},
				['&.MuiButton-active']: {
					backgroundColor: extendPalette.buttonContainedPrimaryPressed,
				},
				['&.Mui-disabled']: {
					color: extendPalette.buttonContainedPrimaryOnSurfaceDisabled,
					backgroundColor: extendPalette.buttonContainedPrimaryDisabled,
					borderColor: extendPalette.buttonContainedPrimaryDisabled,
				},
			},
			outlinedPrimary: {
				backgroundColor: extendPalette.buttonOutlinedPrimaryDefault,
				color: extendPalette.buttonOutlinedPrimaryOnSurfaceDefault,
				border: `1px solid ${extendPalette.buttonOutlinedPrimaryBorderDefault}`,
				['&:hover']: {
					backgroundColor: extendPalette.buttonOutlinedPrimaryHovered,
					borderColor: extendPalette.buttonOutlinedPrimaryBorderHover,
				},
				['&:active']: {
					backgroundColor: extendPalette.buttonOutlinedPrimaryPressed,
				},
				['&.MuiButton-active']: {
					backgroundColor: extendPalette.buttonOutlinedPrimaryPressed,
				},
				['&.Mui-disabled']: {
					backgroundColor: extendPalette.buttonOutlinedPrimaryDisabled,
					color: extendPalette.buttonOutlinedPrimaryOnSurfaceDisabled,
					borderColor: extendPalette.buttonOutlinedPrimaryBorderDisabled,
				},
			},
			outlinedSecondary: {
				backgroundColor: extendPalette.buttonOutlinedSecondaryDefault,
				color: extendPalette.buttonOutlinedSecondaryOnSurfaceDefault,
				border: `1px solid ${extendPalette.buttonOutlinedSecondaryBorderDefault}`,
				['&:hover']: {
					backgroundColor: extendPalette.buttonOutlinedSecondaryHovered,
					borderColor: extendPalette.buttonOutlinedSecondaryBorderHover,
				},
				['&:focus']: {
					outline: `1px solid ${extendPalette.buttonOutlinedSecondaryBorderHover}`,
				},
				['&:active']: {
					backgroundColor: extendPalette.buttonOutlinedSecondaryPressed,
				},
				['&.MuiButton-active']: {
					backgroundColor: extendPalette.buttonOutlinedSecondaryPressed,
				},
				['&.Mui-disabled']: {
					backgroundColor: extendPalette.buttonOutlinedSecondaryDisabled,
					color: extendPalette.buttonOutlinedSecondaryOnSurfaceDisabled,
					borderColor: extendPalette.buttonOutlinedSecondaryBorderDisabled,
				},
			},
			textPrimary: {
				padding: '0 8px',
				backgroundColor: 'transparent',
				color: extendPalette.buttonTextPrimaryOnSurfaceDefault,
				['&:hover']: {
					backgroundColor: 'transparent',
				},
				['&:active']: {
					backgroundColor: extendPalette.buttonTextPrimarySurfacePressed,
				},
				['&.MuiButton-active']: {
					backgroundColor: extendPalette.buttonTextPrimarySurfacePressed,
				},
				['&.Mui-disabled']: {
					color: extendPalette.buttonTextPrimaryOnSurfaceDisabled,
				},
			},
		},
		variants: [
			{
				props: { size: 'small' },
				style: {
					height: 36,
					fontSize: 16,
					padding: '8px 12px'
				},
			},
			{
				props: { size: 'medium' },
				style: {
					height: 40,
					fontSize: 18,
					padding: '10px 16px',
				},
			},
		],
	},
	MuiIconButton: {
		defaultProps: {
			disableRipple: true,
		},
		styleOverrides: {
			root: {
				width: 36,
				height: 36,
				padding: 4,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 4,
				backgroundColor: extendPalette.iconButtonDefaultSurfaceDefault,
				border: `1px solid ${extendPalette.iconButtonDefaultBorderDefault}`,
				outline: 'none',
				transition: 'opacity .2s ease',
				['&:hover']: {
					borderColor: extendPalette.iconButtonDefaultBorderHover,
				},
				['&:active']: {
					backgroundColor: extendPalette.iconButtonDefaultSurfaceHover,
					borderColor: extendPalette.iconButtonDefaultBorderHover,
				},
				['&:focus']: {
					outline: `1px solid ${extendPalette.iconButtonDefaultSurfacePressed}`,
				},
				'&.Mui-disabled': {
					opacity: 0.5,
				},
			},
		},
	},
	MuiFormControlLabel: {
		defaultProps: {
			labelPlacement: "start",
		},
		styleOverrides: {
			root: {
				margin: 0,
				gap: 18,
				color: `${typographyColors.primary}99`
			},
			label: {
				textTransform: 'uppercase',
				fontSize: 14,
			}
		},
	},
	MuiSlider: {
		defaultProps: {
			size: 'small',
			valueLabelDisplay: 'off',
		},
		styleOverrides: {
			root: {
				padding: '0 8px; !important',
			},
			mark: {
				width: 4,
				height: 4,
				borderRadius: 'unset',
				backgroundColor: '#000',
			},
			markActive: {
				backgroundColor: '#000',
			},
			thumb: {
				color: extendPalette.sliderThumbColorDefault
			},
			track: {
				color: extendPalette.sliderTrackColorDefault
			},
			rail: {
				color: extendPalette.sliderRailColorDefault
			},
		},
		variants: [
			{
				props: { size: 'small' },
				style: {
					width: 4,
					['& .MuiSlider-thumb']: {
						width: 16,
						height: 16,
					},
					['& .MuiSlider-rail']: {
						width: 4,
					},
					['& .MuiSlider-track']: {
						width: 4,
					},
				},
			}
		]
	},
	MuiDivider: {
		defaultProps: {
			variant: 'fullWidth',
		},
		styleOverrides: {
			root: {
				borderColor: extendPalette.borderColorDividerDefault,
				'&:before': {
					borderColor: extendPalette.borderColorDividerSecondary,
				},
				'&:after': {
					borderColor: extendPalette.borderColorDividerSecondary,
				},
			},
			wrapper: {
				padding: '0 16px',
			},
		},
	},
	MuiSwitch: {
		defaultProps: {
			disableRipple: true,
			focusVisibleClassName: '.Mui-focusVisible',
		},
		styleOverrides: {
			root: {
				width: 32,
				height: 16,
				padding: 0,
				boxSizing: 'border-box',
				transitionDuration: '300ms',
			},
			switchBase: {
				padding: 0,
				margin: 2,
				'&.Mui-checked': {
					transform: 'translateX(16px)',
					color: extendPalette.toggleIconDefault,
					'& + .MuiSwitch-track': {
						backgroundColor: extendPalette.toggleSurfaceSelected,
						opacity: 1,
						border: 0,
					},
					'&.Mui-disabled + .MuiSwitch-track': {
						backgroundColor: extendPalette.toggleSurfaceDisabled,
					},
				},
				'&.Mui-focusVisible .MuiSwitch-thumb': {
					color: extendPalette.toggleSurfaceSelected,
					border: '6px solid #fff',
				},
				'&.Mui-disabled .MuiSwitch-thumb': {
					backgroundColor: extendPalette.toggleIconDisabled,
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 1,
					backgroundColor: extendPalette.toggleSurfaceDisabled,
				},
			},
			thumb: {
				boxSizing: 'border-box',
				width: 12,
				height: 12,
				backgroundColor: extendPalette.toggleIconDefault,
			},
			track: {
				backgroundColor: extendPalette.toggleSurfaceDefault,
				borderRadius: 33,
				opacity: 1,
				transition: theme.transitions.create(['background-color'], {
					duration: 300,
				}),
			},
		},
	},
	MuiInput: {
		styleOverrides: {
			root: {
				fontSize: 17,
				fontWeight: 400,
				lineHeight: 22,
			},
		},
		defaultProps: {
			variant: 'outlined',
			disableUnderline: true,
		},
	},
	MuiFilledInput: {
		styleOverrides: {
			root: {
				fontSize: 17,
				height: '100%',
				padding: 0,
				minHeight: 44,
				minWidth: 80,
				borderRadius: 4,
				border: `1px solid ${extendPalette.inputFilledBorderDefault}`,
				backgroundColor: extendPalette.inputFilledSurfaceDefault,
				boxSizing: 'border-box',
				['&::before']: {
					display: 'none',
				},
				['&::after']: {
					display: 'none',
				},
				['&.MuiAutocomplete-input']: {
					padding: 0,
				},
				['&:hover']: {
					outline: 'unset',
					WebkitTextFillColor: extendPalette.inputFilledTextColorHover,
					backgroundColor: extendPalette.inputFilledSurfaceHover,
					['&::placeholder']: {
						WebkitTextFillColor: extendPalette.inputFilledTextColorHover,
						opacity: 1,
					},
				},
				['&.Mui-error']: {
					// TODO: create color extendPalette variable
					borderColor: '#f16868',
				},
				['& + .MuiFormHelperText-root']: {
					fontSize: 12,
					width: 'auto',
					margin: '0 14px',
					padding: 0,
					bottom: 0,
					left: 0,
					backgroundColor: 'transparent',
				},
			},
			input: {
				width: '100%',
				height: 'auto',
				padding: '8px 16px',
				background: 'transparent',
				borderRadius: 4,
				boxSizing: 'border-box',
				caretColor: extendPalette.inputFilledTextColorDefault,
				WebkitTextFillColor: extendPalette.inputFilledTextColorDefault,
				['&::placeholder']: {
					WebkitTextFillColor: extendPalette.inputFilledOnSurfacePlaceholder,
					opacity: 1,
				},
			},
		},
	},
	MuiOutlinedInput: {
		styleOverrides: {
			root: {
				fontSize: 17,
				height: '100%',
				padding: '8px 16px',
				backgroundColor: extendPalette.inputSurfaceDefault,
				minWidth: 80,
				boxSizing: 'border-box',
				['&.MuiAutocomplete-input']: {
					padding: 0,
				},
				['&.Mui-focused']: {
					['.MuiOutlinedInput-notchedOutline']: {
						borderWidth: 1,
						borderColor: extendPalette.inputBorderDefault,
					},
				},
				['&:hover']: {
					outline: 'unset',
					WebkitTextFillColor: extendPalette.inputTextColorHover,
					['&::placeholder']: {
						WebkitTextFillColor: extendPalette.inputTextColorHover,
						opacity: 1,
					},
					['.MuiOutlinedInput-notchedOutline']: {
						borderColor: extendPalette.inputBorderDefault,
					},
				},
			},
			input: {
				boxSizing: 'border-box',
				padding: 0,
				width: '100%',
				caretColor: extendPalette.inputTextColorDefault,
				WebkitTextFillColor: extendPalette.inputTextColorDefault,
				['&::placeholder']: {
					WebkitTextFillColor: extendPalette.inputOnSurfacePlaceholder,
					opacity: 1,
				},
				'&.Mui-disabled': {
					WebkitTextFillColor: extendPalette.inputOnSurfacePlaceholder,
				}
			},
			adornedEnd: {
				right: 10,
				'& .MuiIconButton-root': {
					border: 'unset',
					outline: 'unset',
					background: 'transparent',
					'& .MuiSvgIcon-root': {
						color: extendPalette.inputOnSurfacePlaceholder,
						fill: extendPalette.inputOnSurfacePlaceholder,
						backgroundColor: 'transparent',
					},
					'&:hover': {
						'& .MuiSvgIcon-root': {
							color: extendPalette.inputOnSurfacePlaceholder,
							fill: extendPalette.inputOnSurfacePlaceholder,
							backgroundColor: 'transparent',
						},
					},
					'&:focus': {
						'& .MuiSvgIcon-root': {
							color: extendPalette.inputOnSurfacePlaceholder,
							fill: extendPalette.inputOnSurfacePlaceholder,
							backgroundColor: 'transparent',
						},
					},
				},
			},
			adornedStart: {
				'& .MuiIconButton-root': {
					border: 'unset',
					outline: 'unset',
					background: 'transparent',
				},
			},
			notchedOutline: {
				border: `1px solid ${extendPalette.inputBorderDefault}`,
				top: 0,
				legend: {
					display: 'none',
				},
			},
		},
	},
	MuiAutocomplete: {
		styleOverrides: {
			root: {
				height: 36,
				boxSizing: 'border-box',
				padding: 0,
				'& .MuiOutlinedInput-root': {
					paddingLeft: 10,
				},
				'&:hover:not(.Mui-disabled))': {
					backgroundColor: extendPalette.inputSurfaceHover,
				},
			},
			endAdornment: {
				'& > button:last-child': {
					display: 'none',
				}
			},
			inputRoot: {
				padding: 0,
				width: 'auto',
				minWidth: 350,
				height: 36,
				right: 'unset',
				'&.Mui-disabled': {
					border: `1px solid ${extendPalette.inputBorderDefault}`,
					'&:hover': {
						background: 'transparent',
						border: 'none',
					}
				},
			},
			paper: {
				transform: 'translateY(6px)',
				borderRadius: 4,
				backgroundColor: extendPalette.inputPaperSurfaceDefault,
			},
			listbox: {
				padding: 0,
				borderRadius: 4,
				// TODO: create color extendPalette variable
				backgroundColor: '#1C1C1C',
				'& .MuiAutocomplete-option': {
					WebkitTextFillColor: extendPalette.autocompleteOptionTextDefault,
					padding: '8px 16px',

					'&:hover': {
						backgroundColor: extendPalette.autocompleteOptionHover,
					},

					'&[aria-selected="true"]': {
						backgroundColor: extendPalette.autocompleteOptionActive,
					},
					'&[aria-selected="true"].Mui-focused': {
						backgroundColor: extendPalette.autocompleteOptionPressed,
					}
				},
			},
		},
	},
	MuiTooltip: {
		defaultProps: {},
		styleOverrides: {
			tooltip: {
				maxWidth: 320,
				// TODO: create color extendPalette variable
				// backgroundColor: '#1C1C1C',
				backgroundColor: '#373737',
				color: typographyColors.primary,
				padding: '10px 14px',
				fontSize: 12,
				fontFamily: 'IBM Plex Mono',
			}
		}
	},
	MuiDialog: {
		defaultProps: {
			disablePortal: true,
		},
		styleOverrides: {
			backdrop: {
				// TODO: create color extendPalette variable
				backgroundColor: '#30313299',
			},
			paperWidthSm: {
				maxWidth: 336,
			},
			paperWidthMd: {
				maxWidth: 560,
			},
			root: {
				// TODO: create color extendPalette variable
				color: '#D0D0D0',
				'& .MuiDialogContent-root': {
					padding: '0 40px 40px',
				},
			},
			paper: {
				// TODO: create color extendPalette variable
				color: '#D0D0D0',
				boxShadow: '0 2px 6px rgba(34, 174, 103, 0.3)',
				borderRadius: 4,
				// TODO: create color extendPalette variable
				backgroundColor: '#050505',
				margin: 12,
				maxHeight: `calc(100% - 24px)`,
			},
		},
	},
	MuiCheckbox: {
		defaultProps: {
			color: 'primary',
		},
		styleOverrides: {
			root: {
				width: 24,
				height: 24,
				strokeWidth: '10px',
			},
			colorPrimary: {
				'&.Mui-checked': {
					'& > svg': {
						color: extendPalette.checkboxPrimarySurfaceChecked,
					}
				},
				'&.Mui-disabled': {
					'& > svg': {
						color: extendPalette.checkboxPrimarySurfaceDisabled,
					}
				}
			},
		},
	},
	MuiSelect: {
		styleOverrides: {
			root: {
				'& .MuiSelect-select': {
					'&[aria-expanded="true"] svg': {
						transform: 'rotate(-180deg)',
					}
				},
				'& svg': {
					transition: 'transform .1s ease',
					fill: '#D0D0D0',
				}
			},
		},
	}
} as ThemeOptions['components'];
