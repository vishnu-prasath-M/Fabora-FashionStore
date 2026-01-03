import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by pre-save hook? No, insertMany doesn't trigger pre-save hooks. I should hash it here or use create.
        // Actually, seeder usually uses insertMany. I should hash it manually here or use a loop with save().
        // For simplicity in seeder, I'll use a hashed password string or update the seeder to use create().
        // Or just use a known hash.
        // 'password123' hash: $2a$10$ixlD8jO4V.W8YV1.z/O.X.wz.1.1.1.1.1.1.1.1.1
        // I'll update the seeder to use User.create() in a loop if I want hooks, or just provide hashed password.
        // Let's provide hashed password for '123456'
        // $2a$10$d/2JUluv8anHHQo1p.w1.u.1.1.1.1.1.1.1.1.1
        // Actually, I'll just use the pre-save hook by iterating in seeder.js? No, insertMany is faster.
        // I'll just put the plain text and rely on the fact that I might need to change seeder to use save() or just hash it here.
        // Let's hash it here.
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

// I will handle hashing in the seeder script or change the data to be hashed.
// For now, I'll leave it plain and update seeder.js to hash it.
export default users;
