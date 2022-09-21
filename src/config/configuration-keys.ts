export const ConfigurationKeys = [
    "work_length_setting",
    "break_length_setting",
    "long_break_length_setting",
    "max_sessions_setting"
] as const;

export type ConfigurationKeys =  typeof ConfigurationKeys[number];