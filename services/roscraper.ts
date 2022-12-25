const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

let browser: any = undefined;
let page = undefined;

export const initBrowser = async () => {
  //Abrimos una instancia del puppeteer y accedemos a la url de google
  browser = await puppeteer.launch();
}

export const closeBrowser = async () => {
  // Cerramos el puppeteer
  await browser.close();
}

export const findItem = async (item: string): Promise<{ id: number, readableName: string, name: string }[]> => {
  item = item.replace('[0]', '')
    .replace('[1]', '')
    .replace('[2]', '')
    .replace('[3]', '')
    .replace('[4]', '')
    .trim();

  page = await browser.newPage();
  const pageUrl = `https://ratemyserver.net/index.php?iname=${encodeURI(item)}&page=item_db&quick=1&isearch=Search`;
  // console.log(pageUrl);
  const responsePage = await page.goto(pageUrl);
  const body = await responsePage.text();

  // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
  const { window: { document } } = new jsdom.JSDOM(body);

  let responselist: { id: number, readableName: string, name: string }[] = [];
  document.querySelectorAll('[title="search item in renewal"]')
    .forEach((row: any) => {
      const nodo = row.parentElement.parentElement.childNodes[3].childNodes;
      const nombreParcial = (nodo[0].textContent).trim();

      let readableName = 'None';
      let texto = null;

      switch (nodo.length) {
        case 2:
          readableName = nombreParcial;
          texto = nodo[1].textContent;
          break;

        case 4:
          readableName = nombreParcial;
          texto = nodo[1].textContent;
          break;

        default:
          readableName = nombreParcial + ' ' + nodo[1].textContent + nodo[2].textContent + nodo[3].textContent;
          texto = nodo[nodo.length - 1].textContent;
      }

      const textoInterez = texto.substring(texto.search('ID#') + 4);
      responselist.push({
        id: textoInterez.split(' ')[0],
        name: textoInterez.split(' ')[1].slice(1, -1),
        readableName
      });
    });

  return responselist;
}