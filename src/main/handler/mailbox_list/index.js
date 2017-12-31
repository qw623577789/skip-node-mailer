module.exports = async ({request}) => {
    let mailboxs = await GB.Model.select("o_mailbox").run();
    if (mailboxs == undefined) mailboxs = [];
    return mailboxs.map(({o_mailbox: item})=>{
        return {
            id: item.id,
            username: item.username,
            password: item.password
        }
    })
}
