class ApiHelper {
    static postRequest(url, body = {}, headers = {}) {
        return cy.request({
            method: 'POST',
            url,
            headers,
            body
        });
    }

    static getRequest(url, headers = {}) {
        return cy.request({
            method: 'GET',
            url,
            headers
        });
    }

    static putRequest(url, body = {}, headers = {}) {
        return cy.request({
            method: 'PUT',
            url,
            headers,
            body
        });
    }

    static deleteRequest(url, headers = {}) {
        return cy.request({
            method: 'DELETE',
            url,
            headers
        });
    }
}

class ApiBridge {
    getToken() {
        const token = Cypress.env('SECURITY_TOKEN');
        if (!token) {
            throw new Error('SECURITY_TOKEN is not set');
        }
        return cy.wrap(token);
    }

    getAuthHeaders() {
        return this.getToken().then(token => ({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }));
    }

    login(email, password) {
        return ApiHelper.postRequest('/api/v1/auth/login', {
            email,
            password
        });
    }

    getDashboardData() {
        return this.getAuthHeaders().then(headers => {
            return ApiHelper.getRequest('/api/v1/dashboard', headers);
        });
    }
}

export default { ApiHelper, ApiBridge }; 