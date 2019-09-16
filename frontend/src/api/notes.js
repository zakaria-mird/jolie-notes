const API_URL = "http://localhost:8002";

export default {
  notes: async (token) => {
    let formData = new FormData();
    formData.append("token", token);

    let response = await fetch(`${API_URL}/list`, {
      method: "POST",
      body: formData
    });
    let data = await response.text();
    let parser = new DOMParser();
    try {
      let documentData = parser.parseFromString(data, "text/xml");
      let success = documentData.getElementsByTagName("success")[0].textContent === "true";
      let notes = Array.from(documentData.getElementsByTagName('notes')).map(element => {
        return {
          id: element.getElementsByTagName('noteId')[0].textContent,
          title: element.getElementsByTagName('title')[0].textContent,
          content: element.getElementsByTagName('content')[0].textContent
        };
      });
      return {
        success,
        notes
      }
    }
    catch (error) {
      return {
        success: false,
        notes: []
      }
    }
  },
  addNote: async (token, title, content) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("title", title);
    formData.append("content", content);

    let response = await fetch(`${API_URL}/add`, {
      method: "POST",
      body: formData
    });
    let data = await response.text();
    let parser = new DOMParser();
    try {
      let documentData = parser.parseFromString(data, "text/xml");
      let success = documentData.getElementsByTagName("success")[0].textContent === 'true';
      let message = documentData.getElementsByTagName("message")[0].textContent;
      return {
        success,
        message
      }
    }
    catch (error) {
      return {
        success: false,
        message: ""
      }
    }
  },
  deleteNote: async (token, id) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("noteId", id);

    let response = await fetch(`${API_URL}/delete`, {
      method: "POST",
      body: formData
    });
    let data = await response.text();
    let parser = new DOMParser();
    try {
      let documentData = parser.parseFromString(data, "text/xml");
      let success = documentData.getElementsByTagName("success")[0].textContent;
      let message = documentData.getElementsByTagName("message")[0].textContent;
      return {
        success,
        message
      }
    }
    catch (error) {
      return {
        success: false,
        message: ""
      }
    }
  }
}