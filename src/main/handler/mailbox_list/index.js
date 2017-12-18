module.exports = async ({request}) => {
    let mailboxs = await GB.Model.select("mailbox").run();
    if (mailboxs == undefined) mailboxs = [];
    return mailboxs.map(({mailbox: item})=>{
        return {
            username: item.username,
            password: item.password
        }
    })
}
