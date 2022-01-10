import {useEffect, useState} from "react";

class UserRepository {
    static #instance = null

    #user = null
    #observers = []

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new UserRepository()
        }
        return this.#instance
    }

    subscribe(observer) {
        this.#observers.push(observer)
        observer.onUserChange(this.#user)
    }

    unsubscribe(observer) {
        const index = this.#observers.findIndex((v, i) => v === observer)
        if (index) {
            this.#observers.splice(index, 1)
        }
    }

    setUser(user) {
        this.#user = user
        for (const observer of this.#observers) {
            observer.onUserChange(this.#user)
        }
    }

    getUser() {
        return this.#user
    }
}

const useUser = () => {
    const [user, setUser] = useState()

    const onUserChange = (user) => {
        setUser(user)
    }

    useEffect(() => {
        UserRepository.getInstance().subscribe(onUserChange)
        return () => UserRepository.getInstance().unsubscribe(onUserChange)
    })

    return user
}