/**
 * BotManagementPage - Page Object Model for Bot Management functionality
 * This class encapsulates all bot management page elements and actions
 * Following the Page Object Model design pattern for maintainability
 */

const { By, until } = require('selenium-webdriver');

class BotManagementPage {
    constructor(driver) {
        this.driver = driver;
        
        // Page URL
        this.url = process.env.BASE_URL + '/bot-management' || 'https://admin.aichatbot.com/bot-management';
        
        // Element selectors - centralized for easy maintenance
        this.selectors = {
            // Page elements
            pageTitle: By.tagName('h1'),
            createBotButton: By.id('create-bot-btn'),
            botList: By.className('bot-list'),
            botItems: By.className('bot-item'),
            
            // Create/Edit Bot Form
            botNameField: By.id('bot-name'),
            botDescriptionField: By.id('bot-description'),
            botTypeDropdown: By.id('bot-type'),
            languageDropdown: By.id('bot-language'),
            avatarUpload: By.id('bot-avatar'),
            welcomeMessageField: By.id('welcome-message'),
            autoResponseCheckbox: By.id('auto-response'),
            responseTimeField: By.id('response-time'),
            saveBotButton: By.id('save-bot-btn'),
            updateBotButton: By.id('update-bot-btn'),
            cancelButton: By.id('cancel-btn'),
            
            // Bot Actions
            editBotButton: By.className('edit-bot-btn'),
            deleteBotButton: By.className('delete-bot-btn'),
            activateBotButton: By.className('activate-bot-btn'),
            deactivateBotButton: By.className('deactivate-bot-btn'),
            
            // Confirmation dialogs
            confirmDeleteButton: By.id('confirm-delete-btn'),
            cancelDeleteButton: By.id('cancel-delete-btn'),
            confirmDialog: By.className('confirm-dialog'),
            
            // Intent Assignment
            intentAssignmentButton: By.className('assign-intents-btn'),
            intentList: By.className('intent-list'),
            intentCheckboxes: By.className('intent-checkbox'),
            assignIntentsButton: By.id('assign-intents-btn'),
            updateIntentsButton: By.id('update-intents-btn'),
            
            // Search and Filter
            searchField: By.id('search-bots'),
            searchButton: By.id('search-btn'),
            typeFilter: By.id('type-filter'),
            statusFilter: By.id('status-filter'),
            applyFilterButton: By.id('apply-filter-btn'),
            clearFilterButton: By.id('clear-filter-btn'),
            
            // Bulk Operations
            selectAllCheckbox: By.id('select-all-bots'),
            bulkActivateButton: By.id('bulk-activate-btn'),
            bulkDeactivateButton: By.id('bulk-deactivate-btn'),
            bulkDeleteButton: By.id('bulk-delete-btn'),
            
            // Export/Import
            exportButton: By.id('export-bots-btn'),
            importButton: By.id('import-bots-btn'),
            importFileInput: By.id('import-file'),
            
            // Messages
            successMessage: By.className('success-message'),
            errorMessage: By.className('error-message'),
            validationMessage: By.className('validation-message'),
            
            // Bot Status
            botStatus: By.className('bot-status'),
            botType: By.className('bot-type'),
            botLanguage: By.className('bot-language')
        };
    }

    /**
     * Navigate to the bot management page
     * @returns {Promise<void>}
     */
    async navigateTo() {
        try {
            await this.driver.get(this.url);
            await this.waitForPageToLoad();
            console.log('Successfully navigated to bot management page');
        } catch (error) {
            console.error('Failed to navigate to bot management page:', error);
            throw error;
        }
    }

    /**
     * Wait for the bot management page to fully load
     * @returns {Promise<void>}
     */
    async waitForPageToLoad() {
        try {
            await this.driver.wait(until.elementLocated(this.selectors.botList), 10000);
            await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.selectors.botList)), 5000);
        } catch (error) {
            console.error('Bot management page failed to load:', error);
            throw error;
        }
    }

    /**
     * Click Create New Bot button
     * @returns {Promise<void>}
     */
    async clickCreateNewBotButton() {
        try {
            const createBotButton = await this.driver.findElement(this.selectors.createBotButton);
            await createBotButton.click();
            console.log('Create New Bot button clicked');
        } catch (error) {
            console.error('Failed to click Create New Bot button:', error);
            throw error;
        }
    }

    /**
     * Enter bot name
     * @param {string} botName - The bot name
     * @returns {Promise<void>}
     */
    async enterBotName(botName) {
        try {
            const botNameField = await this.driver.findElement(this.selectors.botNameField);
            await botNameField.clear();
            await botNameField.sendKeys(botName);
            console.log(`Entered bot name: ${botName}`);
        } catch (error) {
            console.error('Failed to enter bot name:', error);
            throw error;
        }
    }

    /**
     * Enter bot description
     * @param {string} description - The bot description
     * @returns {Promise<void>}
     */
    async enterBotDescription(description) {
        try {
            const botDescriptionField = await this.driver.findElement(this.selectors.botDescriptionField);
            await botDescriptionField.clear();
            await botDescriptionField.sendKeys(description);
            console.log(`Entered bot description: ${description}`);
        } catch (error) {
            console.error('Failed to enter bot description:', error);
            throw error;
        }
    }

    /**
     * Select bot type
     * @param {string} botType - The bot type to select
     * @returns {Promise<void>}
     */
    async selectBotType(botType) {
        try {
            const botTypeDropdown = await this.driver.findElement(this.selectors.botTypeDropdown);
            await botTypeDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${botType}']`));
            await option.click();
            console.log(`Selected bot type: ${botType}`);
        } catch (error) {
            console.error('Failed to select bot type:', error);
            throw error;
        }
    }

    /**
     * Select bot language
     * @param {string} language - The language to select
     * @returns {Promise<void>}
     */
    async selectBotLanguage(language) {
        try {
            const languageDropdown = await this.driver.findElement(this.selectors.languageDropdown);
            await languageDropdown.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${language}']`));
            await option.click();
            console.log(`Selected bot language: ${language}`);
        } catch (error) {
            console.error('Failed to select bot language:', error);
            throw error;
        }
    }

    /**
     * Upload bot avatar
     * @param {string} filePath - The path to the avatar file
     * @returns {Promise<void>}
     */
    async uploadBotAvatar(filePath) {
        try {
            const avatarUpload = await this.driver.findElement(this.selectors.avatarUpload);
            await avatarUpload.sendKeys(filePath);
            console.log(`Uploaded bot avatar: ${filePath}`);
        } catch (error) {
            console.error('Failed to upload bot avatar:', error);
            throw error;
        }
    }

    /**
     * Set welcome message
     * @param {string} welcomeMessage - The welcome message
     * @returns {Promise<void>}
     */
    async setWelcomeMessage(welcomeMessage) {
        try {
            const welcomeMessageField = await this.driver.findElement(this.selectors.welcomeMessageField);
            await welcomeMessageField.clear();
            await welcomeMessageField.sendKeys(welcomeMessage);
            console.log(`Set welcome message: ${welcomeMessage}`);
        } catch (error) {
            console.error('Failed to set welcome message:', error);
            throw error;
        }
    }

    /**
     * Enable auto-response feature
     * @returns {Promise<void>}
     */
    async enableAutoResponse() {
        try {
            const autoResponseCheckbox = await this.driver.findElement(this.selectors.autoResponseCheckbox);
            if (!await autoResponseCheckbox.isSelected()) {
                await autoResponseCheckbox.click();
                console.log('Auto-response feature enabled');
            }
        } catch (error) {
            console.error('Failed to enable auto-response:', error);
            throw error;
        }
    }

    /**
     * Set response time
     * @param {string} responseTime - The response time in seconds
     * @returns {Promise<void>}
     */
    async setResponseTime(responseTime) {
        try {
            const responseTimeField = await this.driver.findElement(this.selectors.responseTimeField);
            await responseTimeField.clear();
            await responseTimeField.sendKeys(responseTime);
            console.log(`Set response time: ${responseTime} seconds`);
        } catch (error) {
            console.error('Failed to set response time:', error);
            throw error;
        }
    }

    /**
     * Click Save Bot button
     * @returns {Promise<void>}
     */
    async clickSaveBotButton() {
        try {
            const saveBotButton = await this.driver.findElement(this.selectors.saveBotButton);
            await saveBotButton.click();
            console.log('Save Bot button clicked');
        } catch (error) {
            console.error('Failed to click Save Bot button:', error);
            throw error;
        }
    }

    /**
     * Click Update Bot button
     * @returns {Promise<void>}
     */
    async clickUpdateBotButton() {
        try {
            const updateBotButton = await this.driver.findElement(this.selectors.updateBotButton);
            await updateBotButton.click();
            console.log('Update Bot button clicked');
        } catch (error) {
            console.error('Failed to click Update Bot button:', error);
            throw error;
        }
    }

    /**
     * Create a new bot with basic information
     * @param {string} botName - The bot name
     * @param {string} description - The bot description
     * @param {string} botType - The bot type
     * @param {string} language - The bot language
     * @returns {Promise<void>}
     */
    async createBot(botName, description, botType, language) {
        try {
            await this.clickCreateNewBotButton();
            await this.enterBotName(botName);
            await this.enterBotDescription(description);
            await this.selectBotType(botType);
            await this.selectBotLanguage(language);
            await this.clickSaveBotButton();
            console.log(`Bot created successfully: ${botName}`);
        } catch (error) {
            console.error('Failed to create bot:', error);
            throw error;
        }
    }

    /**
     * Create a bot with all optional fields
     * @param {Object} botData - The complete bot data
     * @returns {Promise<void>}
     */
    async createBotWithAllFields(botData) {
        try {
            await this.clickCreateNewBotButton();
            await this.enterBotName(botData.name);
            await this.enterBotDescription(botData.description);
            await this.selectBotType(botData.type);
            await this.selectBotLanguage(botData.language);
            
            if (botData.avatar) {
                await this.uploadBotAvatar(botData.avatar);
            }
            
            if (botData.welcomeMessage) {
                await this.setWelcomeMessage(botData.welcomeMessage);
            }
            
            if (botData.autoResponse) {
                await this.enableAutoResponse();
            }
            
            if (botData.responseTime) {
                await this.setResponseTime(botData.responseTime);
            }
            
            await this.clickSaveBotButton();
            console.log(`Bot created with all fields: ${botData.name}`);
        } catch (error) {
            console.error('Failed to create bot with all fields:', error);
            throw error;
        }
    }

    /**
     * Click Edit button for a specific bot
     * @param {string} botName - The name of the bot to edit
     * @returns {Promise<void>}
     */
    async clickEditButtonForBot(botName) {
        try {
            const botRow = await this.findBotRow(botName);
            const editButton = await botRow.findElement(this.selectors.editBotButton);
            await editButton.click();
            console.log(`Edit button clicked for bot: ${botName}`);
        } catch (error) {
            console.error(`Failed to click edit button for bot ${botName}:`, error);
            throw error;
        }
    }

    /**
     * Click Delete button for a specific bot
     * @param {string} botName - The name of the bot to delete
     * @returns {Promise<void>}
     */
    async clickDeleteButtonForBot(botName) {
        try {
            const botRow = await this.findBotRow(botName);
            const deleteButton = await botRow.findElement(this.selectors.deleteBotButton);
            await deleteButton.click();
            console.log(`Delete button clicked for bot: ${botName}`);
        } catch (error) {
            console.error(`Failed to click delete button for bot ${botName}:`, error);
            throw error;
        }
    }

    /**
     * Confirm bot deletion
     * @returns {Promise<void>}
     */
    async confirmBotDeletion() {
        try {
            const confirmDeleteButton = await this.driver.findElement(this.selectors.confirmDeleteButton);
            await confirmDeleteButton.click();
            console.log('Bot deletion confirmed');
        } catch (error) {
            console.error('Failed to confirm bot deletion:', error);
            throw error;
        }
    }

    /**
     * Cancel bot deletion
     * @returns {Promise<void>}
     */
    async cancelBotDeletion() {
        try {
            const cancelDeleteButton = await this.driver.findElement(this.selectors.cancelDeleteButton);
            await cancelDeleteButton.click();
            console.log('Bot deletion cancelled');
        } catch (error) {
            console.error('Failed to cancel bot deletion:', error);
            throw error;
        }
    }

    /**
     * Find bot row by bot name
     * @param {string} botName - The name of the bot to find
     * @returns {Promise<WebElement>} The bot row element
     */
    async findBotRow(botName) {
        try {
            const botItems = await this.driver.findElements(this.selectors.botItems);
            
            for (const botItem of botItems) {
                const nameElement = await botItem.findElement(By.className('bot-name'));
                const name = await nameElement.getText();
                
                if (name === botName) {
                    return botItem;
                }
            }
            
            throw new Error(`Bot with name '${botName}' not found`);
        } catch (error) {
            console.error(`Failed to find bot row for ${botName}:`, error);
            throw error;
        }
    }

    /**
     * Check if bot exists in the list
     * @param {string} botName - The name of the bot to check
     * @returns {Promise<boolean>}
     */
    async isBotInList(botName) {
        try {
            await this.findBotRow(botName);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get bot status
     * @param {string} botName - The name of the bot
     * @returns {Promise<string>}
     */
    async getBotStatus(botName) {
        try {
            const botRow = await this.findBotRow(botName);
            const statusElement = await botRow.findElement(this.selectors.botStatus);
            return await statusElement.getText();
        } catch (error) {
            console.error(`Failed to get status for bot ${botName}:`, error);
            return '';
        }
    }

    /**
     * Get success message
     * @returns {Promise<string>}
     */
    async getSuccessMessage() {
        try {
            const successElement = await this.driver.findElement(this.selectors.successMessage);
            return await successElement.getText();
        } catch (error) {
            console.error('Failed to get success message:', error);
            return '';
        }
    }

    /**
     * Get error message
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        try {
            const errorElement = await this.driver.findElement(this.selectors.errorMessage);
            return await errorElement.getText();
        } catch (error) {
            console.error('Failed to get error message:', error);
            return '';
        }
    }

    /**
     * Search for bots
     * @param {string} searchTerm - The search term
     * @returns {Promise<void>}
     */
    async searchBots(searchTerm) {
        try {
            const searchField = await this.driver.findElement(this.selectors.searchField);
            await searchField.clear();
            await searchField.sendKeys(searchTerm);
            
            const searchButton = await this.driver.findElement(this.selectors.searchButton);
            await searchButton.click();
            console.log(`Searched for bots: ${searchTerm}`);
        } catch (error) {
            console.error('Failed to search bots:', error);
            throw error;
        }
    }

    /**
     * Filter bots by type
     * @param {string} botType - The bot type to filter by
     * @returns {Promise<void>}
     */
    async filterBotsByType(botType) {
        try {
            const typeFilter = await this.driver.findElement(this.selectors.typeFilter);
            await typeFilter.click();
            
            const option = await this.driver.findElement(By.xpath(`//option[text()='${botType}']`));
            await option.click();
            
            const applyFilterButton = await this.driver.findElement(this.selectors.applyFilterButton);
            await applyFilterButton.click();
            console.log(`Filtered bots by type: ${botType}`);
        } catch (error) {
            console.error('Failed to filter bots by type:', error);
            throw error;
        }
    }

    /**
     * Select multiple bots for bulk operations
     * @param {Array<string>} botNames - Array of bot names to select
     * @returns {Promise<void>}
     */
    async selectBotsForBulkOperation(botNames) {
        try {
            for (const botName of botNames) {
                const botRow = await this.findBotRow(botName);
                const checkbox = await botRow.findElement(By.className('bot-checkbox'));
                await checkbox.click();
            }
            console.log(`Selected ${botNames.length} bots for bulk operation`);
        } catch (error) {
            console.error('Failed to select bots for bulk operation:', error);
            throw error;
        }
    }

    /**
     * Click bulk activate button
     * @returns {Promise<void>}
     */
    async clickBulkActivateButton() {
        try {
            const bulkActivateButton = await this.driver.findElement(this.selectors.bulkActivateButton);
            await bulkActivateButton.click();
            console.log('Bulk activate button clicked');
        } catch (error) {
            console.error('Failed to click bulk activate button:', error);
            throw error;
        }
    }

    /**
     * Export bot list
     * @param {string} format - The export format (CSV, PDF, etc.)
     * @returns {Promise<void>}
     */
    async exportBotList(format = 'CSV') {
        try {
            const exportButton = await this.driver.findElement(this.selectors.exportButton);
            await exportButton.click();
            
            const formatOption = await this.driver.findElement(By.xpath(`//option[text()='${format}']`));
            await formatOption.click();
            
            console.log(`Exported bot list in ${format} format`);
        } catch (error) {
            console.error('Failed to export bot list:', error);
            throw error;
        }
    }

    /**
     * Import bots from file
     * @param {string} filePath - The path to the import file
     * @returns {Promise<void>}
     */
    async importBotsFromFile(filePath) {
        try {
            const importButton = await this.driver.findElement(this.selectors.importButton);
            await importButton.click();
            
            const importFileInput = await this.driver.findElement(this.selectors.importFileInput);
            await importFileInput.sendKeys(filePath);
            
            console.log(`Imported bots from file: ${filePath}`);
        } catch (error) {
            console.error('Failed to import bots from file:', error);
            throw error;
        }
    }
}

module.exports = BotManagementPage; 