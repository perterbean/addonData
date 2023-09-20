const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises');


console.log('companyList.js loaded')
const URL = 'https://www.cophieu68.vn/market/markets.php';
const getData = async () => {
    const response = await axios.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);

    // console.log($('table.table_content tbody tr'))
    const data = [];
    $('table.table_content tbody tr').each((i, element) => {
        const tds = $(element).find('td')[0];
        const divs = $(tds).find('div');
        let name = '';
        let code = '';
        if (divs.length > 0) {
            name = $(divs[1]).text();
            code = $(divs[0]).text();

            data.push({
                name,
                code,
                codeFull: code.toUpperCase()
            })
        }
    })
    await fs.writeFile('data/addonData/companyList.json', JSON.stringify(data, null, 2));
    console.log(`You are save dataa companyList.json`);
}
getData()
