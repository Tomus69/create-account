export class User {
    
    #id;

    #username;

    #password;

    #roles;

    get id () {
        return this.#id;
    }
    
    get username () {
        return this.#username;
    }

    set username (username) {
        this.#username = username;
    }

    get password () {
        return this.#password;
    }

    set password (password) {
        this.#password = password;
    }

    get roles () {
        return this.#roles;
    }

    set roles (roles) {
        this.#roles = roles;
    }

}