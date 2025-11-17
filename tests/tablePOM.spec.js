import { test, expect } from '@playwright/test';
import hpCharacters from './data/json/hpCharacters.json';
import { TablePage } from './pages/table.page';


for (const char of hpCharacters){
    test('Character ' + char.name, async ({ page }) => {
        const table = new TablePage(page);
        await table.checkTests(char);
    });
}
