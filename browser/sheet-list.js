(async function () {
  const fs_readFilePromise = require('util').promisify(require('fs').readFile);

  var fs = require('fs');

  var on = require('component-delegate').bind;

  var domify = require('domify');

  var dom = require('dom-tree');

  var Handlebars = require('handlebars');

  var templates = {
    modal: Handlebars.compile(await fs_readFilePromise(__dirname + '/views/modal.html', 'utf8')),
    newSheet: Handlebars.compile(await fs_readFilePromise(__dirname + '/views/new-blank-sheet.html', 'utf8')),
    newSheetFromCSV: Handlebars.compile(await fs_readFilePromise(__dirname + '/views/csv-import.html', 'utf8'))
  };
  on(document.body, '#new-blank-sheet', 'click', function (e) {
    var modal = templates.modal({
      content: templates.newSheet()
    });
    dom.add(document.body, domify(modal));
  });
  on(document.body, '#import-csv', 'click', function (e) {
    var modal = templates.modal({
      content: templates.newSheetFromCSV()
    });
    dom.add(document.body, domify(modal));
  });
  on(document.body, '#close-modal', 'click', function (e) {
    dom.remove('#modal');
  });
  on(document.body, '.destroy-sheet', 'click', function (e) {
    e.preventDefault();
    var form = e.target.parentNode;
    var msg = "Wait. Do you really want to completely destroy all data in this sheet?";
    if (window.confirm(msg)) form.submit();
  });
})();