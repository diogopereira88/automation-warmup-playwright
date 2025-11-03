export const USERS = {
    validUser:{
        username: 'test',
        password: 'password123',
        message: 'User successfully logged in!',
        messageLogout: 'You have been logged out. Please log in.',
    },
    authenticatedUser:{
        authenticatedMessage: (user) => `User ${user} authenticated`,
    },
    blockedUser:{
        username: 'testblock',
        password: 'password123',
        message: 'User blocked!',
    },
    invalidUser:{
        username: 'test3',
        password: 'password123',
        message: 'User not found!',
    },
    wrongPassword:{
        username: 'test',
        password: 'password',
        message: 'Incorrect username or password!',
    },
    temporaryBlocked:{
        message: 'User temporarily blocked!',
    }
};
