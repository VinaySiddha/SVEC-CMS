import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function updateExamSectionPassword() {
    const newPassword = 'svec@exam2025'; // You can change this password
    
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);
        
        // Update the password in the database
        await connection.execute(
            'UPDATE users SET password_hash = ? WHERE username = ?',
            [hashedPassword, 'examsection']
        );
        
        console.log('Password updated successfully!');
        console.log('New credentials:');
        console.log('Username: examsection');
        console.log('Password:', newPassword);
    } catch (error) {
        console.error('Error updating password:', error);
    } finally {
        await connection.end();
    }
}

updateExamSectionPassword();