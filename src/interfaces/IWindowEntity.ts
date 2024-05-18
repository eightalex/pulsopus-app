export interface IWindowEntity {
    state: boolean;

    isOpen: boolean;
    isClosed: boolean;

    onOpen(): void;
    onClose(): void;
    onToggle(): void;
}
