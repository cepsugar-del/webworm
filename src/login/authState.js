export class AuthStatus {
    static Unknown = new AuthStatus('unknown');
    static Authenticated = new AuthStatus('authenticated');
    static Unauthenticated = new AuthStatus('unauthenticated');

    constructor(name) {
        this.name = name;
    }
}

