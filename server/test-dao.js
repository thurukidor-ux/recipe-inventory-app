// server/test-dao.js
const ingredientDao = require('./dao/ingredient-dao');
async function runTest(){
    console.log('1. vytvarim surovinu: Mouka...');
    const mouka = await ingredientDao.create({name: 'Mouka hladka', stock: 1000, unit: 'g'});
    console.log('Vytvoreno:', mouka);
    console.log('\n2. ctu surovinu podle ID...');
    const loaded = await ingredientDao.get(mouka.id);
    console.log('Nacteno', loaded);
    console.log('\n3.Aktualizuji stav skladu na 800g...');
    const updated = await ingredientDao.update({ id: mouka.id, stock: 800});
    console.log('aktualizovano:', updated);
    console.log('\n4. vypisuji vsechny suroviny...');
    const all = await ingredientDao.list();
    console.log (`pocet surovin na discu: ${all.length}`);
    console.log(`\n5. mazani suroviny...`);
        await ingredientDao.delete(mouka.id);
        console.log('smazano.');

    
}
runTest().catch(console.error);