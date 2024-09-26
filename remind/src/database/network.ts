export async function checkInternetConnection() {
    try {
      await fetch('https://www.google.com/', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return true;
    } catch (error) {
      return false;
    }
  }