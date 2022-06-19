import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Test 1",
        email: "test1@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "Kiet Vu",
        email: "kvu@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;
