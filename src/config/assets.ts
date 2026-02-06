import type { AssetConfig, CustomAssetsConfig } from '../types';

/**
 * Default custom assets configuration
 * Users can override this to load custom CSS/JS files
 */
export const customAssetsConfig: CustomAssetsConfig = {
  assets: [],
};

/**
 * Create custom assets config with user overrides
 *
 * @example
 * // Load external CSS and JS
 * defineCustomAssets({
 *   assets: [
 *     { type: 'css', src: 'https://example.com/styles.css' },
 *     { type: 'js', src: 'https://example.com/script.js', defer: true },
 *     { type: 'js', src: '/custom.js', position: 'body', module: true },
 *   ]
 * })
 */
export function defineCustomAssets(config: Partial<CustomAssetsConfig>): CustomAssetsConfig {
  return {
    ...customAssetsConfig,
    ...config,
    assets: config.assets || customAssetsConfig.assets,
  };
}

// Backward compatible alias
export const defaultCustomAssetsConfig = customAssetsConfig;
