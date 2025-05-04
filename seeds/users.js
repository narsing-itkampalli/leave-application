require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createDummyUsers = async () => {
    try {
        await connectDB();

        // Delete existing users
        await User.deleteMany();

        // Hash passwords first
        const hashPassword = async (password) => {
            return await bcrypt.hash(password, await bcrypt.genSalt(10));
        };

        // Create users array with hashed passwords
        const users = [
            // Higher authorities
            {
                name: 'Admin One',
                email: 'admin1@test.com',
                password: await hashPassword('admin123'),
                role: 'higherAuthority',
                pendingLeaves: 0
            },
            {
                name: 'Admin Two',
                email: 'admin2@test.com',
                password: await hashPassword('admin123'),
                role: 'higherAuthority',
                pendingLeaves: 0
            },
            // Staff members
            {
                name: 'John Doe',
                email: 'staff1@test.com',
                password: await hashPassword('staff123'),
                role: 'staff',
                pendingLeaves: 1
            },
            {
                name: 'Jane Smith',
                email: 'staff2@test.com',
                password: await hashPassword('staff123'),
                role: 'staff',
                pendingLeaves: 3
            },
            {
                name: 'Bob Wilson',
                email: 'staff3@test.com',
                password: await hashPassword('staff123'),
                role: 'staff',
                pendingLeaves: 2
            },
            {
                name: 'Alice Johnson',
                email: 'staff4@test.com',
                password: await hashPassword('staff123'),
                role: 'staff',
                pendingLeaves: 0
            }
        ];

        const createdUsers = await User.insertMany(users);

        console.log('Database seeded successfully!');
        console.log(`Created ${createdUsers.length} users`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

createDummyUsers();