export class ApiService {
  async getResource(url) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }
  async sendPostRequest(url) {
    fetch(`${url}`, {
      method: 'POST'
    });
  }
  async getData() {
    return await this.getResource(`/Data`);
  }
  generateFlight() {
    this.sendPostRequest(`/GenerateFlight`);
  }
}
