/**
 * Vue Composable for i18n
 *
 * Provides i18n support for Vue components in the blog.
 */

import { inject, computed, type ComputedRef } from 'vue';
import type { UITranslations, I18nConfig } from '../config/i18n';
import { getUITranslations } from '../config/i18n';

/**
 * i18n injection keys
 */
export const I18N_LOCALE_KEY = Symbol('i18n-locale');
export const I18N_CONFIG_KEY = Symbol('i18n-config');
export const I18N_TRANSLATIONS_KEY = Symbol('i18n-translations');

/**
 * i18n context provided to Vue components
 */
export interface I18nContext {
  locale: string;
  translations: UITranslations;
  config?: I18nConfig;
}

/**
 * Return type of useI18n composable
 */
export interface UseI18nReturn {
  /** Current locale code */
  locale: ComputedRef<string>;
  /** Translation function */
  t: (key: keyof UITranslations) => string;
  /** Format date according to locale */
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  /** Format date in short format */
  formatDateShort: (date: Date | string) => string;
  /** All translations for current locale */
  translations: ComputedRef<UITranslations>;
}

/**
 * Vue composable for i18n support
 *
 * @example
 * ```vue
 * <script setup>
 * import { useI18n } from '@jet-w/astro-blog/utils/useI18n';
 *
 * const { t, formatDate, locale } = useI18n();
 * </script>
 *
 * <template>
 *   <h1>{{ t('postList') }}</h1>
 *   <span>{{ formatDate(post.pubDate) }}</span>
 * </template>
 * ```
 */
export function useI18n(): UseI18nReturn {
  // Inject locale from parent (provided by Astro layout)
  const injectedLocale = inject<string>(I18N_LOCALE_KEY, 'zh-CN');
  const injectedTranslations = inject<UITranslations | undefined>(
    I18N_TRANSLATIONS_KEY,
    undefined
  );
  const injectedConfig = inject<I18nConfig | undefined>(I18N_CONFIG_KEY, undefined);

  // Computed locale
  const locale = computed(() => injectedLocale);

  // Computed translations
  const translations = computed<UITranslations>(() => {
    if (injectedTranslations) {
      return injectedTranslations;
    }
    // Fallback to getting translations by locale
    return getUITranslations(injectedLocale, injectedConfig);
  });

  /**
   * Get translation for a key
   */
  function t(key: keyof UITranslations): string {
    return translations.value[key] || key;
  }

  /**
   * Format date according to current locale
   */
  function formatDate(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat(
      locale.value,
      options || defaultOptions
    ).format(dateObj);
  }

  /**
   * Format date in short format
   */
  function formatDateShort(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(dateObj);
  }

  return {
    locale,
    t,
    formatDate,
    formatDateShort,
    translations,
  };
}

/**
 * Create i18n context for providing to Vue components
 *
 * @example
 * ```astro
 * ---
 * import { createI18nContext } from '@jet-w/astro-blog/utils/useI18n';
 * const i18nContext = createI18nContext('en', i18nConfig);
 * ---
 * <Component client:load {...i18nContext} />
 * ```
 */
export function createI18nContext(
  locale: string,
  config?: I18nConfig
): I18nContext {
  return {
    locale,
    translations: getUITranslations(locale, config),
    config,
  };
}

// Re-export types
export type { UITranslations, Locale, I18nConfig } from '../config/i18n';
