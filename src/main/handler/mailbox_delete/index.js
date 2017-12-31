module.exports = async ({request: mailboxId}) => {
    let result = await GB.Model.delete("o_mailbox").where(GB.Model.Logic.statement("id", "=", mailboxId)).run();
    if (result == 0) {
        throw new Error(`${mailboxId} is not exist`);
    }
}
