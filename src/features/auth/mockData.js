const users = [
    {
        "id": "1",
        "username": "john_doe",
        "email": "john.doe@example.com",
        "password": "$2b$12$s.wmm5InjVoSq8RehXZTd.3Dcpha1WJcEfB1Hl2CYfxgwrEIhsLSm", // securePass123
        "role": "admin",
        "isVerified": true,
        "createdAt": "2024-12-01T10:00:00Z",
        "updatedAt": "2024-12-15T15:30:00Z"
    },
    {
        "id": "2",
        "username": "jane_smith",
        "email": "jane.smith@example.com",
        "password": "$2b$12$u8MxzBJRFi4O20E1ftx1v.u7y4i2oBQW2AACKlRD5MsMD9TRI8QVG", // mySecret456
        "role": "user",
        "isVerified": false,
        "createdAt": "2024-11-10T08:20:00Z",
        "updatedAt": "2024-12-10T12:45:00Z"
    },
    {
        "id": "3",
        "username": "mike_ross",
        "email": "mike.ross@example.com",
        "password": "$2b$12$KkHbJONaxtJYzyEUyGoSlewXLq9vMWaeYyoQfmuONrudMheM6.1By", // adminPass789
        "role": "user",
        "isVerified": true,
        "createdAt": "2024-10-15T09:50:00Z",
        "updatedAt": "2024-12-12T18:00:00Z"
    },
    {
        "id": "4",
        "username": "emma_brown",
        "email": "emma.brown@example.com",
        "password": "$2b$12$AjThm3KZ6Mq1iqqBH1GN.uY57irLmSoTlPDDMaBwv8H3frhvzBYgy", // userSafePass101
        "role": "moderator",
        "isVerified": true,
        "createdAt": "2024-09-20T13:10:00Z",
        "updatedAt": "2024-12-05T14:15:00Z"
    },
    {
        "id": "5",
        "username": "lisa_white",
        "email": "lisa.white@example.com",
        "password": "$2b$12$ADfyX1KzB8ZHFByK/G.Dz.IEX9isNQ6G86b4XNJfAXdVroxaCI9kG", // modSpecial202
        "role": "user",
        "isVerified": false,
        "createdAt": "2024-08-30T11:30:00Z",
        "updatedAt": "2024-12-09T16:25:00Z"
    }
]

export default users