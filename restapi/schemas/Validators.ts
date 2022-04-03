export function validateEmail(email: string) {
    return (email.includes('@') && (email.endsWith('.com') || email.endsWith('.es')));
}

