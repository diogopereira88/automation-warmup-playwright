// @ts-check

import test, { expect } from '@playwright/test';
import { USERS } from './data/login';


test.describe('Login Scenarios', () => {

    test.beforeEach( async ({ page }) => {
        await page.goto('/login');
    });

    test('Login Successful', async ({ page }) => {
        await test.step('Fill valid credentials and submit', async () => {
            
            await page
                .getByRole('textbox', { name: 'Type your username' })
                .fill(USERS.validUser.username);
            
            await page   
                .getByRole('textbox', { name: 'Type your password' })
                .fill(USERS.validUser.password);
            
            await page
                .getByRole('button', { name: 'Login' })
                .click();
            
        });

        await test.step('Validate successful login messages', async () => {

            await expect(page.getByText(USERS.validUser.message))
                .toBeVisible();
            await expect(page.getByText(USERS.authenticatedUser.authenticatedMessage(USERS.validUser.username)))
                .toBeVisible();
        });

        await test.step('Logout validation and logout message', async () => {

            await page
                .getByRole('button', { name: 'Logout' })
                .click();
            await expect(page.getByText(USERS.validUser.messageLogout))
                .toBeVisible();
        });
    });
    
    test('Login Blocked', async ({ page }) => {
        await test.step('Fill blocked credentials and submit', async () => {
            
            await page
                .getByRole('textbox', { name: 'Type your username' })
                .fill(USERS.blockedUser.username);
            
            await page   
                .getByRole('textbox', { name: 'Type your password' })
                .fill(USERS.blockedUser.password);
            
            await page
                .getByRole('button', { name: 'Login' })
                .click();
            
        });

        await test.step('Validate blocked login message', async () => {

            await expect(page.getByText(USERS.blockedUser.message))
                .toBeVisible();
        });
    });

    test('Login Invalid', async ({ page }) => {
        await test.step('Fill invalid credentials and submit', async () => {
            
            await page
                .getByRole('textbox', { name: 'Type your username' })
                .fill(USERS.invalidUser.username);
            
            await page   
                .getByRole('textbox', { name: 'Type your password' })
                .fill(USERS.invalidUser.password);
            
            await page
                .getByRole('button', { name: 'Login' })
                .click();
            
        });

        await test.step('Validate invalid login message', async () => {

            await expect(page.getByText(USERS.invalidUser.message))
                .toBeVisible();
        });
    });

    test('Login Wrong Password', async ({ page }) => {
        await test.step('Fill wrong password and submit', async () => {
            
            await page
                .getByRole('textbox', { name: 'Type your username' })
                .fill(USERS.wrongPassword.username);
            
            await page   
                .getByRole('textbox', { name: 'Type your password' })
                .fill(USERS.wrongPassword.password);
            
            await page
                .getByRole('button', { name: 'Login' })
                .click();
            
        });

        await test.step('Validate wrong password message', async () => {

            await expect(page.getByText(USERS.wrongPassword.message))
                .toBeVisible();
        });
    });

    test('Login Temporary Block', async ({ page }) => {
        await test.step('Fill wrong password and submit 3 times', async () => {
            
            await page
                .getByRole('textbox', { name: 'Type your username' })
                .fill(USERS.wrongPassword.username);
            
            await page   
                .getByRole('textbox', { name: 'Type your password' })
                .fill(USERS.wrongPassword.password);
            
            await page
                .getByRole('button', { name: 'Login' })
                .click( {clickCount: 3} );
            
        });

        await test.step('Validate temporary blocked message', async () => {

            await expect(page.getByText(USERS.temporaryBlocked.message))
                .toBeVisible();
        });
    });

});