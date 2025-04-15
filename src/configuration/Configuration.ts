class Configuration {

    static getSiteName()
    {
        return this.get('ESTIM8_SITE_NAME', 'Estim8');
    }

    static getSessionSecret()
    {
        return this.get('ESTIM8_SESSION_SECRET','estim8-secret');
    }

    private static get(key: string, defaultValue: string) {
        const value = process.env[key] || defaultValue;
        return value;
    }
}

export default Configuration;