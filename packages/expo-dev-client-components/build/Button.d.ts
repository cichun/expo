import * as React from 'react';
import { Animated } from 'react-native';
declare const Container: React.ForwardRefExoticComponent<Pick<Animated.AnimatedProps<import("react-native").PressableProps & React.RefAttributes<import("react-native").View>> & {
    children?: React.ReactNode;
} & {
    margin?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    mx?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    my?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    mb?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    mt?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    padding?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    px?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    py?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    pb?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    pt?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
    rounded?: "small" | "medium" | "large" | "none" | "full" | undefined;
    roundedTop?: "small" | "medium" | "large" | "none" | "full" | undefined;
    roundedBottom?: "small" | "medium" | "large" | "none" | "full" | undefined;
    bg?: "primary" | "secondary" | "tertiary" | "ghost" | "transparent" | "default" | "disabled" | undefined;
    border?: "ghost" | undefined;
    shadow?: "button" | undefined;
} & {
    selectors?: {
        light?: (import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle) | undefined;
        dark?: (import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle) | undefined;
    } | undefined;
}, "selectors" | keyof import("react-native").PressableProps | "key" | "bg" | "border" | "shadow" | "padding" | "margin" | "mx" | "my" | "mb" | "mt" | "px" | "py" | "pb" | "pt" | "rounded" | "roundedTop" | "roundedBottom"> & React.RefAttributes<Animated.AnimatedProps<import("react-native").PressableProps & React.RefAttributes<import("react-native").View>>>>;
export declare const Button: {
    Container: React.ForwardRefExoticComponent<Pick<Animated.AnimatedProps<import("react-native").PressableProps & React.RefAttributes<import("react-native").View>> & {
        children?: React.ReactNode;
    } & {
        margin?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        mx?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        my?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        mb?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        mt?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        padding?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        px?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        py?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        pb?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        pt?: "0" | "1" | "2" | "3" | "4" | "0.5" | "1.5" | "2.5" | "3.5" | "16" | "12" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "14" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | ("small" | "medium" | "large" | "micro" | "tiny" | "xl") | undefined;
        rounded?: "small" | "medium" | "large" | "none" | "full" | undefined;
        roundedTop?: "small" | "medium" | "large" | "none" | "full" | undefined;
        roundedBottom?: "small" | "medium" | "large" | "none" | "full" | undefined;
        bg?: "primary" | "secondary" | "tertiary" | "ghost" | "transparent" | "default" | "disabled" | undefined;
        border?: "ghost" | undefined;
        shadow?: "button" | undefined;
    } & {
        selectors?: {
            light?: (import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle) | undefined;
            dark?: (import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle) | undefined;
        } | undefined;
    }, "selectors" | keyof import("react-native").PressableProps | "key" | "bg" | "border" | "shadow" | "padding" | "margin" | "mx" | "my" | "mb" | "mt" | "px" | "py" | "pb" | "pt" | "rounded" | "roundedTop" | "roundedBottom"> & React.RefAttributes<Animated.AnimatedProps<import("react-native").PressableProps & React.RefAttributes<import("react-native").View>>>>;
    ScaleOnPressContainer: typeof ScaleOnPressContainer;
    Text: React.ForwardRefExoticComponent<import("react-native").TextProps & {
        children?: React.ReactNode;
    } & {
        color?: "primary" | "secondary" | "tertiary" | "ghost" | "transparent" | "default" | undefined;
        align?: "center" | undefined;
        size?: "small" | "medium" | "large" | undefined;
        leading?: "large" | undefined;
        type?: "mono" | "InterBlack" | "InterBlackItalic" | "InterBold" | "InterBoldItalic" | "InterExtraBold" | "InterExtraBoldItalic" | "InterExtraLight" | "InterExtraLightItalic" | "InterRegular" | "InterItalic" | "InterLight" | "InterLightItalic" | "InterMedium" | "InterMediumItalic" | "InterSemiBold" | "InterSemiBoldItalic" | "InterThin" | "InterThinItalic" | undefined;
        weight?: "bold" | "medium" | "thin" | "extralight" | "light" | "normal" | "semibold" | "extrabold" | "black" | undefined;
    } & {
        selectors?: {
            light?: (import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle) | undefined;
            dark?: (import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle) | undefined;
        } | undefined;
    } & React.RefAttributes<import("react-native").TextProps>>;
};
declare type ScalingPressableProps = {
    minScale?: number;
};
declare function ScaleOnPressContainer({ minScale, ...props }: React.ComponentProps<typeof Container> & ScalingPressableProps): JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map