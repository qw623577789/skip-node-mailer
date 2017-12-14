export default async ({request: username, constant}) => {
    let result = await GB.Model.delete("mailbox").where(GB.Model.Logic.statement("username", "=", username));
    if (result == 0) {
        throw new Error(`${username} is not exist`);
    }
    return constant.ResponseState.SUCCESS;
}
