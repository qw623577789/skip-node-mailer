let imap = new GB.Module.Imap({
    user: request.username,
    password: request.password,
    host: request.address,
    port: request.port,
    secure: request.useSSL == 1 ? true:false
});