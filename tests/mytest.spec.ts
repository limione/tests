import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://client.sana-commerce.dev/');
});

test.describe('New veterinarian', () => {
  test('should be added to the list', async ({ page }) => {
    
    await page.locator('.vetsTab').click();
    await page.locator('a[href="/petclinic/vets/add"]').click();

    await page.locator('#firstName').fill('Bruce');
    await page.locator('#lastName').fill('Banner');
    await page.locator('#specialties').selectOption("3: Object");
    await page.locator('.saveVet').click();

    await expect(page.locator('tr:last-child .vetFullName')).toHaveText('Bruce Banner');


  });
});

test.describe('New edited veterinarian', () => {
  test('should be added to the list and then edited', async ({ page }) => {
    
    await page.locator('.vetsTab').click();
    await page.locator('a[href="/petclinic/vets/add"]').click();

    await page.locator('#firstName').fill('Bruce');
    await page.locator('#lastName').fill('Banner');
    await page.locator('#specialties').selectOption("2: Object");
    await page.locator('.saveVet').click();

    await expect(page.locator('tr:last-child .vetFullName')).toHaveText('Bruce Banner');
    await page.locator('tr:last-child .editVet').click();
    await page.locator('#lastName').fill('Wayne');
    await page.locator('.saveVet').click();
    await expect(page.locator('tr:last-child .vetFullName')).toHaveText('Bruce Wayne');
  });
});


test.describe('New pet type', () => {
  test('should be added to the list', async ({ page }) => {
    
    await page.locator('a[href="/petclinic/pettypes"]').click();
    
    await page.locator('.addPet').click();
    await page.locator('#name').fill('cat');
    await page.locator('.saveType').click();

    await expect(page.locator('tr:last-child .form-control')).toHaveValue('cat');
  });
});

test.describe('Edit specialty', () => {
  test('should be edited first specialty', async ({ page }) => {
    
    await page.locator('a[href="/petclinic/specialties"]').click();  


    var oldValue = await page.locator('tr:last-child .form-control').inputValue();

    await page.locator('tr:last-child .deleteSpecialty').click();

    await expect(page.locator('tr:last-child .form-control')).not.toHaveValue(oldValue);

  });
});
