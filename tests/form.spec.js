import { test, expect } from '@playwright/test';
import { USERS, FORM_MESSAGES } from './data/form';

test.describe('FORM', () => {

    test.beforeEach( async ({ page }) => {
        await page.goto('/form');
    });

    for (const user of USERS) {
        const title = `${user.scenario} | ${user.name} | ${user.countryLabel} | ${user.gender}`;
        
        test(title, async ({ page }) => {
            await test.step('Fill required fields', async () => {
                await page.getByRole('textbox', { name: 'Name *' })
                .fill(user.name);
                await page.getByRole('textbox', { name: 'Email *' })
                .fill(user.email);
                await page.getByRole('textbox', { name: 'Password *' })
                .fill(user.password);
                await page.getByLabel('Country *')
                .selectOption(user.countryValue);
                await page.getByRole('radio', { name: user.gender, exact: true }).check();

            });

            await test.step('Select Hobbies', async () => {
                if (user.hobbies != []) {
                    for (const hobby of user.hobbies) {
                        await page.getByRole('checkbox', { name: hobby }).check();
                    }
                }
            });

            await test.step ('Submit and validate success', async () => {
                await page.getByRole('button', {name: 'Send'}).click();
                await expect(page.getByText(FORM_MESSAGES.successTitle)).toBeVisible();
                await expect(page.getByText(FORM_MESSAGES.successBody)).toBeVisible();
            });
        });
    }
});

test.describe('FORM - ERROR', () => {

    test.beforeEach( async ({ page }) => {
        await page.goto('/form');
    });

    test('Required validation messages', async ({ page }) => {
        await test.step('Submit without filling anything', async () => {
            await page.getByRole('button', { name: 'Send' }).click();
        });
        await test.step('Validate required messages are visible', async () => {
            await expect(page.getByText('The name field is required.'))
            .toBeVisible();
            await expect(page.getByText('The email field is required.'))
            .toBeVisible();
            await expect(page.getByText('The password field is required.'))
            .toBeVisible();
            await expect(page.getByText('The country field is required.'))
            .toBeVisible();
            await expect(page.getByText('The gender field is required.'))
            .toBeVisible();
        });
    });
});
