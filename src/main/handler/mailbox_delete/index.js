module.exports = async ({request: username}) => {
    let result = await GB.Model.delete("mailbox").where(GB.Model.Logic.statement("username", "=", username)).run();
    if (result == 0) {
        throw new Error(`${username} is not exist`);
    }
}
