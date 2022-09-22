import { ConfigurationTarget, WorkspaceConfiguration } from "vscode";
import { ConfigurationKeys } from "./configuration-keys";

export const CSS_LEFT = "margin-left";
export const CSS_TOP = "top";

export interface ThemeConfig {}

export interface ExtensionConfig extends ThemeConfig {
  enabled?: boolean;
  comboThreshold?: number;
  comboTimeout?: number;
}

export function getConfigValue(
  key: ConfigurationKeys,
  vscodeConfig: WorkspaceConfiguration,
  themeConfig: any = {}
): any {
  return getConfigValueCore(key, vscodeConfig, themeConfig);
}

function getConfigValueCore(
  key: ConfigurationKeys,
  vscodeConfig: WorkspaceConfiguration,
  themeConfig: any = {}
): any {
  // If the config is explicitly set, use that value
  if (isConfigSet(key, vscodeConfig)) {
    return vscodeConfig.get(key);
  }

  // Use the themeConfig value if set,
  const themeValue = themeConfig[key];
  if (!isNullOrUndefined(themeValue)) {
    return themeValue;
  }

  // Fall back to the package.json default value
  // as a last resort
  return vscodeConfig.get(key);
}

export type InspectConfigData = ConfigurationTarget | false;

export function isConfigSet(
  key: ConfigurationKeys,
  config: WorkspaceConfiguration
): ConfigurationTarget | false {
  return false;
}

export function updateConfig(
  key: ConfigurationKeys,
  value: any,
  config: WorkspaceConfiguration
) {
  const target = isConfigSet(key, config) || ConfigurationTarget.Global;
  config.update(key, value, target);
}

function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}
