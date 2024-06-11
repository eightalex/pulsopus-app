export const enum ETablePaginationButtonType {
    PREV = 'previous',
    NEXT = 'next',
    PAGE = 'page',
    END_ELLIPSIS = 'end-ellipsis',
    START_ELLIPSIS = 'start-ellipsis',
}

export const tablePaginationButtonByType = {
    [ETablePaginationButtonType.PAGE]: 'page',
    [ETablePaginationButtonType.PREV]: 'Previous',
    [ETablePaginationButtonType.NEXT]: 'Next',
    [ETablePaginationButtonType.END_ELLIPSIS]: '...',
    [ETablePaginationButtonType.START_ELLIPSIS]: '...',
};