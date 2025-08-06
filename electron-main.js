const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Create the main window
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: true,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'icon.png')
  });

  // Load the weather forecast app
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Optional: Hide cursor after 5 seconds of inactivity
    setTimeout(() => {
      mainWindow.webContents.insertCSS(`
        * { cursor: none !important; }
      `);
    }, 5000);
  });

  // Prevent window from being closed accidentally
  mainWindow.on('close', (event) => {
    // Uncomment to prevent accidental closing
    // event.preventDefault();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent navigation away from the weather app
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    // Allow navigation to the same origin only
    if (parsedUrl.origin !== `file://`) {
      event.preventDefault();
    }
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Prevent opening new windows
    return { action: 'deny' };
  });

  // Auto-refresh every hour to keep data fresh
  setInterval(() => {
    mainWindow.webContents.reload();
  }, 60 * 60 * 1000); // 1 hour
}

// App event handlers
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

// Disable hardware acceleration if having display issues
// app.disableHardwareAcceleration();
