/* eslint-disable default-case */
import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: "0c27d032-42e9-4e0e-aae8-1fc46851796f",
        authority: "https://login.microsoft.com/0891528f-b789-41ef-9d10-895a44f5f624",
        redirectUri: "http://localhost:3000",
        postLogoutRedirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    },
    system: {
        loggerOptions: {
            logLevel: LogLevel.Verbose,
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
            piiLoggingEnabled: false
        },
    },
};

export const loginRequest = {
    scopes: ['user.read'],
};

