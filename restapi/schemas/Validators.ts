export function validateEmail(email: String) {
    return (email.includes('@') && (email.endsWith('.com') || email.endsWith('.es')));
}

