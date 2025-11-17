import { test, expect } from '@playwright/test';
import hpCharacters from './data/json/hpCharacters.json';

for (const c of hpCharacters) {
    test('Character ' + c.name, async ({ page }) => {
        await page
        .goto('/table');
        const nameWithoutSpace = c.name.replace(' ','');
        await expect(page.locator('#tableCharacterName' + nameWithoutSpace))
        .toBeVisible();
        await expect(page.getByRole('img', {name: c.name}))
        .toBeVisible();
        await expect(page.locator('#tableCharacterHouse' + nameWithoutSpace))
        .toBeVisible();

        // if (c.dateOfBirth){
        //     await expect(page.getByRole('cell', { name: c.dateOfBirth })).toBeVisible();
        // } else  {
        //     await expect(page.getByRole('cell', { name: 'Unknown' })).toBeVisible();
        // }

        const birth = c.dateOfBirth? c.dateOfBirth : 'Unknown';
        await expect(page.getByRole('cell', { name: birth }))
        .toBeVisible();
    
    });
}

