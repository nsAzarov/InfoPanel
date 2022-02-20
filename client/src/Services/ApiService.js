export class ApiService {
  async getResource(url) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }
  async sendPostRequest(url, body) {
    const res = await fetch(`${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }
  async getData() {
    return await this.getResource('/Data');
  }
  async generateFlight() {
    await this.sendPostRequest('/GenerateFlight');
  }
  async getLandingFlightData(flight) {
    await this.sendPostRequest(
      '/LandingFlightData',
      JSON.stringify({ flight })
    );
  }
  async getTakingOffFlightData(flight) {
    await this.sendPostRequest(
      '/TakingOffFlightData',
      JSON.stringify({ flight })
    );
  }
}
