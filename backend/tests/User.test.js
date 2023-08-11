const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('express'); // Import your Express app instance here
const User = require('../models/User'); // Import your User model here

// Mock the User model before running the tests
jest.mock('../models/User', () => ({
    create: jest.fn(),
}));

describe('Registration API Endpoint', () => {
    it('should register a new user', async () => {
        // Mock User.create to return a sample user object
        User.create.mockResolvedValue({
            id: 1,
            name: 'Test User',
            password: 'hashedPassword', // Just for testing purposes
            cin: '123456789',
            address: 'Test Address',
            region: 'Test Region',
            email: 'test@example.com',
            role: 'user',
            shopId: null,
        });

        const newUser = {
            name: 'Test User',
            password: 'password123',
            cin: '123456789',
            address: 'Test Address',
            region: 'Test Region',
            email: 'test@example.com',
            role: 'user',
        };

        // Use supertest to send a POST request to the /register endpoint
        const response = await request(app)
            .post('/user/register')
            .send(newUser);

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Registration successful!');
        expect(response.body).toHaveProperty('id', 1);
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith({
            name: newUser.name,
            password: expect.any(String),
            cin: newUser.cin,
            address: newUser.address,
            region: newUser.region,
            email: newUser.email,
            role: newUser.role,
            shopId: null,
        });

        // Verify password encryption using bcrypt
        const { password } = User.create.mock.calls[0][0];
        const isPasswordCorrect = await bcrypt.compare(newUser.password, password);
        expect(isPasswordCorrect).toBe(true);
    },10000);

    it('should handle registration error', async () => {
        // Mock User.create to simulate an error
        User.create.mockRejectedValue(new Error('Database error'));

        const newUser = {
            name: 'Test User',
            password: 'password123',
            cin: '123456789',
            address: 'Test Address',
            region: 'Test Region',
            email: 'test@example.com',
            role: 'user',
        };

        // Use supertest to send a POST request to the /register endpoint
        const response = await request(app)
            .post('/user/register')
            .send(newUser);

        // Assertions
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'An error occurred during registration.');
        expect(User.create).toHaveBeenCalledTimes(1);
    });
});
