import { test, expect } from '@playwright/test';
import { Storages } from '../supporters/storage_handler';

const links = require('./urls_ind');
const lastElXpath = "//ul/li[@class='swatch'][last()]";
let i = 0;

links.forEach(link => {
  i += 1;
  test(`test for ${link} ${i}`, async ({ page }) => {
   

    
    setTimeout(async () => {

      await page.goto(link);
    }, 3000);
    let storage: Storages = new Storages(page);

    await page.mouse.wheel(0, 590);
    const button = page.getByRole('button', { name: 'Do koszyka' });
    await expect(button).toBeVisible({ timeout: 1000000 });

    const lastEl = page.locator(lastElXpath);

    let n = 0;
    while (n < await lastEl.count()) {
      const count = await lastEl.count();  // Sprawdzamy ile jest elementów
      if (count > 1) {
        await lastEl.nth(n).click({timeout: 6000});  
      } else {
        await lastEl.click({timeout: 6000});  // Klikamy ostatni element
      }
      n++;
    }

    await button.click();
    await expect(page.locator("//div[contains(text(),'do Twojego koszyka.')]")).toBeVisible({timeout: 6000});
  });
});

// Uruchamiamy: npx playwright test --workers=1
