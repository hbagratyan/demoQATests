import {test} from '../../fixtures/demoqa/demoqa.fixtures';
import {userInfo} from "../../constants/demoqa-constants";

test.describe('Проверка базовых сценариев с таблицей', () => {
    test.afterEach(async ({mainPage}) => {
        await mainPage.page.context().clearCookies();
    });

    test('Добавление записи в таблицу', async ({mainPage, webTablesPage}) => {
        await mainPage.goto()
        await mainPage.elementsButton.click()
        await mainPage.navigationMenu.webTablesButton.click()
        await webTablesPage.addRecordButton.click()
        await webTablesPage.firstNameInput.fill(userInfo.firsName)
        await webTablesPage.lastNameInput.fill(userInfo.lastName)
        await webTablesPage.emailInput.fill(userInfo.email)
        await webTablesPage.ageInput.fill(userInfo.age)
        await webTablesPage.salaryInput.fill(userInfo.salary)
        await webTablesPage.departmentInput.fill(userInfo.department)
        await webTablesPage.submitRegistrationButton.click()
    });
});
