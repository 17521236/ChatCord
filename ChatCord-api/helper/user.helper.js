var users = [];

function userJoin(userId, username, room) {
    user = { userId, username, room };
    users.push(user);
}

function getUserById(userId) {
    return users.find(x => x.userId === userId);
}

function getUsers(room) {
    const list = users.filter(x => x.room === room);
    return list;
}

function deletePeopleById(userId) {
    users = users.filter(x => x.userId != userId);
}

module.exports = {
    userJoin,
    getUserById,
    getUsers,
    deletePeopleById
}

