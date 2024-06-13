export const shouldPreventForwardProps = <T = NonNullable<unknown>>(...preventProps: Array<keyof T>) => ({
    shouldForwardProp: (prop: keyof T) => !preventProps.includes(prop),
});
