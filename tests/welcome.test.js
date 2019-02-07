describe('on welcome page', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080/welcome');
  });

  it('should navigate to the import page', async () => {
    let url = await page.url();
    expect(url).toMatch('http://localhost:8080/welcome');

    await expect(page).toClick('a')
    await page.waitForNavigation();

    url = await page.url();
    expect(url).toMatch('http://localhost:8080/import');
  });

  it('should navigate to the import page again', async () => {
    let url = await page.url();
    expect(url).toMatch('http://localhost:8080/welcome');

    await expect(page).toClick('a')
    await page.waitForNavigation();

    url = await page.url();
    expect(url).toMatch('http://localhost:8080/import');
  });
});
