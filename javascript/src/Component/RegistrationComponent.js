import { User } from "../Model/User";

export class RegistrationComponent {

    #user = new User;

    #submit;

    #status;

    display () {

        document.querySelector("div").innerHTML = `
        <form>
            <span>
                ${ 400 === this.#status ? 'Account already exists'
                : (500 === this.#status ? 'An error occurs': '') }
            </span><br>
            <input required minlength="3" type="text" class="username" value="${ this.#user.username === undefined ? "" : this.#user.username }" ${ this.#submit === 1 ? "disabled" : "" }>
            <input required minlength="4" type="password" class="password" value="${ this.#user.password === undefined ? "" : this.#user.password }" ${ this.#submit === 1 ? "disabled" : "" }>
            <button type="submit" ${ this.#submit === 1 ? "disabled" : "" }>Envoyer</button>
        </form>
        `;

        document.querySelector("form").onsubmit = (e) => {

            e.preventDefault();

            this.#submit = 1;

            this.register(
                document.querySelector(".username").value, 
                document.querySelector(".password").value
            );
            
        }

    }

    async register (username, password) {

        this.#user.username = username;
        this.#user.password = password;

        this.display();
            
        try {

            const response = await fetch('https://127.0.0.1:8000/register', {
                method: 'post',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (201 === response.status) {
                this.#status = 201;
                return alert("Account created");
            }

            this.#status = 400;

        } catch (error) {

            this.#status = 500;

        }

        this.#submit = 0;
        
        this.display();
              
    }

}