const checkEmail = (value) => {
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattern.check(value)
}

export default {
    checkEmail
}