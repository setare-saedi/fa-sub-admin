import React , {useState} from "react";

import { useAuth } from "../../hooks/AuthProvider";


export default function Login() {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const auth = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("please provide a valid input");
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            login
            <div>
                <form onSubmit={handleSubmitEvent}>
                    <div>
                        <input onChange={handleInput}  name="username" type="text" placeholder="" />
                    </div>
                    <div>
                        <input onChange={handleInput}  name="password" type="text" placeholder="" />
                    </div>
                    <div>
                        <button>
                            ورود
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}