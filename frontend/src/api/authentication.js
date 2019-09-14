const API_URL = "http://localhost:8001";

export default {
  authenticate: async (username, password) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let response = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: formData
    });
    let data = await response.text();
    let parser = new DOMParser();
    let documentData = parser.parseFromString(data, "text/xml");
    let success = documentData.getElementsByTagName("success")[0].textContent === 'true';
    let token = documentData.getElementsByTagName("auth_token")[0].textContent;
    return {
      success,
      token
    }
  }
}