import {test, expect, Locator, FrameLocator} from '@playwright/test'

test('Drag and drop withing iframe', async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    const iframe: FrameLocator = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await iframe.locator('li', {hasText: 'High Tatras 2'}).dragTo(iframe.locator('#trash'))
    await expect(iframe.locator('#trash li h5')).toHaveText('High Tatras 2')
})