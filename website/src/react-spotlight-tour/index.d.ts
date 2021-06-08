import React, { ComponentType, PropsWithChildren } from 'react';
import type { SpotlightProps } from './spotlight';
export declare function useSpotlight(text: string, placement?: 'bottom' | 'left' | 'right' | 'top'): React.Dispatch<React.SetStateAction<HTMLElement | null>>;
interface SpotlightTourProps {
    open: boolean;
    onClose: () => void;
    Spotlight?: ComponentType<SpotlightProps>;
}
export declare function SpotlightTour({ open, onClose, Spotlight, children, }: PropsWithChildren<SpotlightTourProps>): JSX.Element;
export {};
