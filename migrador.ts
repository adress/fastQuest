import 'dotenv/config'

import { findItem, initBrowser, closeBrowser } from './services/roscraper';
import * as fs from 'fs';
import * as readline from 'readline';
import { Quest } from './models/Quest';
import { Item } from './models/Item';
import { ItemQuest } from './models/ItemQuest';
import { sequelize } from './database/sequelize';
const getEditDistance = require('./utils/levenshtein').getEditDistance;


const questEmpty = { name: '', npcName: '', npcMap: '' } as Quest;
const itemEmpty = { id: 0, name: '', readableName: '', isCustom: false, questId: 0 } as Item;

const selectBestMach = (lista: { id: number, readableName: string, name: string }[], readableName: string) => {
    //si solo es un item lo regresa
    let a = questEmpty;
    if (lista.length === 1) { return lista[0]; }

    //nombre coinside exacto
    const listFilter = lista.filter(i => i.readableName == readableName);
    if (listFilter.length > 0) { return listFilter[0]; }

    //nombre coincide sin slot
    const listFilter2 = lista.filter(i => i.name == readableName + ' [0]');
    if (listFilter.length > 0) { return listFilter[0]; }

    //el nombre que se se acerca mas
    const listDistance = lista.map(e => getEditDistance(e.readableName, readableName));
    const min = Math.min(...listDistance);
    const index = listDistance.indexOf(min);
    return lista[index];
}

const leerArchivo = (): Item[] => {
    const itemList: Item[] = [];
    const lineArray = fs.readFileSync('resources/sombreros.txt').toString().split("\n");

    let parentId = 0;
    lineArray.forEach(line => {
        line = line.trim();
        if (line == '') { return; }

        if (line.startsWith('-')) {
            const id = parseInt(line.substring(1, line.search(" ")));
            const readableName = line.replaceAll('-', '').substring(line.search(" ")).trim();
            const name = readableName.replaceAll(' ', '_');
            parentId = id;
            itemList.push({
                id,
                name,
                readableName,
                isCustom: true,
                questId: 0,
                parentId: 0
            } as Item);
        } else {
            const readableName = line.substring(line.search(" ") + 1);
            const cantidad = parseInt(line.substring(0, line.search(" ")));
            const name = readableName.replaceAll(' ', '_');
            itemList.push({
                id: 0,
                name,
                readableName,
                isCustom: false,
                questId: 0,
                quantity: cantidad,
                parentId
            } as Item);
        }
    });
    return itemList;
}

const consultarItem = async (item: Item) => {
    const listaPosibles = await findItem(item.readableName);
    let itemFound: { id: number, readableName: string, name: string } | null = null;
    if (listaPosibles.length > 0) {
        itemFound = selectBestMach(listaPosibles, item.readableName);
        return {
            id: itemFound.id,
            name: itemFound.name,
            readableName: itemFound.readableName,
            isCustom: false,
            questId: item.questId,
            quantity: item.quantity
        } as Item
    } else {
        console.log('no se econtro el item ', item.readableName);
        return null;
    }
}


const guardarQuest = async (quest: Quest, itemOptener: Item, itemsNecesarios: Item[]) => {


    const existeItemOpt = await Item.findByPk(itemOptener.id);
    if (existeItemOpt) {
        console.log(`El item ${itemOptener.readableName} ya se encuentra en la base de datos`);
        return;
    }

    const questBD = await Quest.create({ ...quest }) as Quest;


    //al item generado le asigna la quest
    itemOptener.questId = questBD.id!;
    await Item.create({ ...itemOptener }) as Item;

    for (let index = 0; index < itemsNecesarios.length; index++) {
        const item = itemsNecesarios[index];

        console.log('Consultando el item: ' + item.readableName);
        const foundItem = await consultarItem(item);
        console.log(foundItem);

        if (foundItem) {
            const existItem = await Item.findByPk(foundItem.id);
            if (existItem) {
                await ItemQuest.create({ itemId: foundItem.id, questId: questBD.id, quantity: item.quantity });
            } else {
                const asd = await Item.create({ ...foundItem }) as Item;
                await ItemQuest.create({ itemId: asd.id, questId: questBD.id, quantity: item.quantity });
            }
        }
    }
}

const main = async () => {

    await initBrowser();

    await sequelize.authenticate();
    console.log('Database online');

    // const allItemsList = leerArchivo();
    // const itemOptenerList = allItemsList.filter(i => i.parentId == 0);

    // for (let i = 0; i < itemOptenerList.length; i++) {
    //     const itemOptener = itemOptenerList[i];
    //     const quest = { name: itemOptener.readableName + ' quest', npcName: 'nose', npcMap: 'nose' } as Quest;
    //     const itemsList = allItemsList.filter(i => i.parentId == itemOptener.id);
    //     await guardarQuest(quest, itemOptener, itemsList);
    // }

    // await closeBrowser();
}

main();