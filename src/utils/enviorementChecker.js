const environmentChecker = {
    isProduction: () => process.env.NODE_ENV === 'production',

    isDevelopment: () => process.env.NODE_ENV === 'development',

    getCurrentEnvironment: () => process.env.NODE_ENV || 'development'
}

export default environmentChecker