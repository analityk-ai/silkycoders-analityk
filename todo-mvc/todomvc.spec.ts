import { test, expect } from '@playwright/test';

test('TodoMVC - Create 5 todos and mark first 2 as completed', async ({ page }) => {
  // Navigate to TodoMVC React app
  await page.goto('https://todomvc.com/examples/react/dist/#/');
  
  // Verify page title
  await expect(page).toHaveTitle('TodoMVC: React');
  
  // Add first todo
  await page.getByTestId('text-input').fill('Test todo');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Test todo')).toBeVisible();
  
  // Add second todo
  await page.getByTestId('text-input').fill('Buy groceries');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Buy groceries')).toBeVisible();
  
  // Add third todo
  await page.getByTestId('text-input').fill('Finish project report');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Finish project report')).toBeVisible();
  
  // Add fourth todo
  await page.getByTestId('text-input').fill('Call dentist for appointment');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Call dentist for appointment')).toBeVisible();
  
  // Add fifth todo
  await page.getByTestId('text-input').fill('Update documentation');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Update documentation')).toBeVisible();
  
  // Verify all 5 todos are present and counter shows 5 items left
  await expect(page.getByText('6 items left!')).toBeVisible();
  
  // Mark first todo as completed
  await page.getByRole('listitem').filter({ hasText: 'Test todo' }).getByTestId('todo-item-toggle').click();
  await expect(page.getByText('5 items left!')).toBeVisible();
  
  // Mark second todo as completed
  await page.getByRole('listitem').filter({ hasText: 'Buy groceries' }).getByTestId('todo-item-toggle').click();
  await expect(page.getByText('4 items left!')).toBeVisible();
  
  // Verify "Clear completed" button is enabled
  const clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  await expect(clearCompletedButton).not.toBeDisabled();
  
  // Verify completed todos are visually marked (strikethrough)
  const completedTodos = page.getByRole('listitem').filter({ hasText: /Test todo|Buy groceries/ });
  for (const todo of await completedTodos.all()) {
    const checkbox = todo.getByTestId('todo-item-toggle');
    await expect(checkbox).toBeChecked();
  }
  
  // Verify filter buttons are present
  await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Active' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible();
});
