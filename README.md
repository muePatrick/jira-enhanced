# Jira Enhanced

My slowly growing collection of small changes to the Jira UI.

## 🔗 Installation

### As A Userscript (recommended)

These updates are originally written as a userscript. This is also the recommended way to use the them as runners like [Tampermonkey](https://www.tampermonkey.net/) or something similar (I have not tested this with other extensions yet) will handle the installation, updates and the correct injection into the site.

For the latest version open `jiraEnhanced.user.js` as a [raw file](https://github.com/muePatrick/jira-enhanced/raw/refs/heads/main/jiraEnhanced.user.js)
which should trigger the installation process of the extension.

### As A Chrome Extension

This repository now also contains a Chrome Manifest so *Mark* can install the script as a native Chrome extension.

To install the extension clone the repository or [download the Zip file](https://github.com/muePatrick/jira-enhanced/archive/refs/heads/main.zip). Go to the [extensions page in Chrome](chrome://extensions/), turn on *Developer mode*, click *Load unpacked* and select the folder where you downloaded/extracted the code to.

## ⚙️ Configuration

To change the configuration open the installed script through the extensions dashboard and update the `config` object at the top of the script however you like.

(Currently there is no support for changing settings when the extension is installed as a native Chrome extension).

## 🔩 Enhancements

### Unlock Dialog Width

Unlock the width of dialogs (e.g. ticket preview). Useful on widescreen monitors and tickets with a lot of content.

### Add Copy Link List Button

Add a new button above the "Completed Issues" table in the "Status Report"
section of the "Sprint Report" page. When clicked the links to all the
completed tickets are copied to the clipboard as a link list which can
be pasted into Confluence pages, etc. (Confluence might need an unformatted
paste Ctrl-Shift-V, to not automatically format the linklist)

![The added copy button](addCopyLinkListButton.png)
