import {expect} from '@playwright/test';

export class TablePage {
    constructor(page) {
        this.page = page;
        this.nameCheck = (value) => 
            page.locator('#tableCharacterName' + value);
        this.imgCheck = (value) => 
            page.getByRole('img', {name: value});
        this.houseCheck = (value) => 
            page.locator('#tableCharacterHouse' + value);
        this.birthDateCheck = (value) =>
            page.getByRole('cell', { name: value });
        
    }
    
    async navigateToTable() {
        await this.page.goto('/table');
    }

    async checkCharacterName (characterName) {
        const nameWithoutSpace = characterName.replace(' ','');
        await expect(this.nameCheck(nameWithoutSpace))
        .toBeVisible();
    }

    async checkCharacterImg(characterName) {
        await expect(this.imgCheck(characterName))
        .toBeVisible;
    }

    async checkCharacterHouse (characterName) {
        const nameWithoutSpace = characterName.replace(' ','');
        await expect(this.houseCheck(nameWithoutSpace))
        .toBeVisible();
    }

    async checkBirthDate (characterBirthDate) {
        const birth = characterBirthDate? characterBirthDate : 'Unknown';
        await expect(this.birthDateCheck(birth))
        .toBeVisible();
    }

    async checkTests(char) {
        await this.navigateToTable();
        await this.checkCharacterName(char.name);
        await this.checkCharacterImg(char.name);
        await this.checkCharacterHouse(char.name);
        await this.checkBirthDate(char.dateOfBirth);

    }
}