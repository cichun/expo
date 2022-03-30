import { darkTheme, lightTheme, shadows } from '@expo/styleguide-native';
import { Text as RNText, TextInput as RNTextInput } from 'react-native';
import { create } from './create-primitive';
import { text, textDark, padding, rounded } from './theme';
export const Heading = create(RNText, {
    base: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        lineHeight: 20,
        color: lightTheme.text.default,
    },
    props: {
        accessibilityRole: 'header',
    },
    variants: {
        ...text,
        size: {
            large: {
                fontSize: 22,
                lineHeight: 28,
            },
            small: {
                fontSize: 13,
                lineHeight: 20,
            },
        },
    },
    selectors: {
        dark: textDark,
    },
});
export const Text = create(RNText, {
    base: {
        fontFamily: 'Inter-Regular',
        color: lightTheme.text.default,
        fontSize: 16,
        lineHeight: 18,
    },
    props: {
        accessibilityRole: 'text',
    },
    variants: {
        ...text,
    },
    selectors: {
        dark: textDark,
    },
});
export const TextInput = create(RNTextInput, {
    base: {
        fontFamily: 'Inter-Regular',
        color: lightTheme.text.default,
        fontSize: 16,
        lineHeight: 18,
    },
    variants: {
        ...text,
        border: {
            default: {
                borderWidth: 1,
                borderColor: lightTheme.border.default,
            },
        },
        ...rounded,
        ...padding,
        shadow: {
            input: shadows.input,
        },
    },
    selectors: {
        dark: {
            ...textDark,
            border: {
                default: {
                    borderColor: darkTheme.border.default,
                    borderWidth: 1,
                },
            },
        },
    },
});
//# sourceMappingURL=Text.js.map