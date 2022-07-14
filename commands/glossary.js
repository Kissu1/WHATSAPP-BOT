//jshint esversion:8
//Coded by Sumanjay (https://github.com/cyberboysumanjay)
const axios = require('axios');

async function getData(query) {
    let mainconfig = {
        method: 'get',
        url: `https://glossary.deta.dev/${query}`
    };
    return axios(mainconfig)
        .then(async function (response) {
            let data = response.data;
            if (data != undefined) {
                let out = ({
                    query: query,
                    result: data
                });
                return out;
            } else {
                return "unsupported";
            }
        })
        .catch(function (error) {
            return "error";
        });
}
const execute = async (client, msg, args) => {
    msg.delete(true);
    let data = await getData(args[0]);
    if (data == "error") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Error*\n\n` + "```Something unexpected happened while fetching the definition```");
    }
    if (data == "unsupported") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Error*\n\n` + "```Support for this query is not yet added```");
    } else {
        await client.sendMessage(msg.to, `Results from Glossary for Query *${data.query}* \n\n*${data.result}*`);
    }
};

module.exports = {
    name: 'Glossary',
    description: 'Gets results from Glossary',
    command: '!glossary',
    commandType: 'plugin',
    isDependent: false,
    help: `*Get Glossary Data*\n\nGet defs from Glossary. \n\n*!glossary [query]*\n`,
    execute
};