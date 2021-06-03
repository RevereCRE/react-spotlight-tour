import React from 'react';
export interface TutorialConfig {
    el: HTMLElement | null;
    text: string;
    placement?: 'bottom' | 'left' | 'right' | 'top';
}
export interface TutorialProps {
    conf: TutorialConfig[];
    onClick?: () => void;
}
declare function Tutorial({ conf, onClick }: TutorialProps): JSX.Element | null;
declare const TutorialMemo: React.MemoExoticComponent<typeof Tutorial>;
export { TutorialMemo as Tutorial };
