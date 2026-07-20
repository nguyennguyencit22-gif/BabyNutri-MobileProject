export function isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}

export function validatePassword(password: string): string | null {
    if (!password.trim()) {
        return 'Password is required.'
    }
    if (password.length < 6) {
        return 'Password must contain at least 6 characters.'
    }
    return null;
}