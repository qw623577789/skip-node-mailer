module.exports = async ({request}) => {
    let mailboxs = await GB.Model.select("o_mailbox").run();
    if (mailboxs == undefined) mailboxs = [];
    return mailboxs.map(({o_mailbox: item})=>{
        return {
            username: item.username,
            password: item.password
        }
    })
}
