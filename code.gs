// prints the Path, URL, Name and Owner of Google Drive folders to an open-active Google Sheet using Google Apps Script

function listFolders(folder) {
     var sheet = SpreadsheetApp.getActiveSheet();
     sheet.clear();
     sheet.appendRow(["Path", "URL", "Name", "Owner"]); //writes the headers

     var folder = DriveApp.getFolders()
     var n = 0
     //while (folder.hasNext() & n < 50) {
     while (folder.hasNext()) {
        var name = folder.next();
        var folds = []
        var path = name.getName();
        var parentFolder = name.getParents();
        while (parentFolder.hasNext()) {
          var _folder = parentFolder.next();
          path = _folder + '/' + path //console.log(_folder.getName());
          parentFolder = _folder.getParents()
        }
        try {
          var owner = name.getOwner().getUsername();
        } catch (error) {
          var owner = 'not found';
        }
        //console.log(name)
        //console.log(path)
        sheet.appendRow([path, name.getUrl(), name.getName(), owner])
        //console.log(path, '|', name.getUrl(), '|', name.getName(), '|', owner);
        n += 1
    };
}
