import path from 'path';

class UIController {
  static async getUI(req, res) {
    const UIFile = path.join(__dirname, '../UI_Public', 'calculator.html');
    res.sendFile(UIFile);
  }
}

export default UIController;
