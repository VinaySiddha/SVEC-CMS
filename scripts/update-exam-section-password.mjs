import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth/auth';

async function updateExamSectionPassword() {
    const newPassword = 'svec@exam2025'; // You can change this password
    try {
        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);
        
        // Update the password in the database
        await query(
            'UPDATE users SET password_hash = ? WHERE username = ?',
            [hashedPassword, 'examsection']
        );
        
        console.log('Password updated successfully!');
        console.log('New credentials:');
        console.log('Username: examsection');
        console.log('Password:', newPassword);
        
        process.exit(0);
    } catch (error) {
        console.error('Error updating password:', error);
        process.exit(1);
    }
}

updateExamSectionPassword();