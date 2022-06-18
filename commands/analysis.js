//jshint esversion:8
//Coded by Sumanjay (https://github.com/cyberboysumanjay)
const axios = require('axios');

async function getAnalysis(cryptoCode) {
    cryptoCode = cryptoCode.toLowerCase();
    let mainconfig = {
        method: 'get',
        url: 'https://crypto.deta.dev/analysis/' + cryptoCode
    };
    return axios(mainconfig)
        .then(async function (response) {
            let data = response.data;
            if (data.status == true) {
                cryptoAnalysis = data.analysis;
                let out = ({
                    name: cryptoCode,
                    analysis: data.analysis
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
    let data = await getAnalysis(args[0]);
    if (data == "error") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Error*\n\n` + "```Something unexpected happened while fetching Cryptocurrency Price```");
    }
    if (data == "unsupported") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Error*\n\n` + "```Support for this CryptoCurrency is not yet added```");
    } else {
        await client.sendMessage(msg.to, `${data.analysis}`);
    }
};

module.exports = {
    name: 'Crypto Currency Analysis',
    description: 'Gets live analysis info for requested crypto currency',
    command: '!analysis',
    commandType: 'plugin',
    isDependent: false,
    help: `*Crypto Currency Analysis*\n\nGet live analysis of cryptocurrency. \n\n*!analysis [crypto-code]*\n`,
    execute
};